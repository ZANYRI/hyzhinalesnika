"use client";

import React, { useEffect, useRef } from "react";
import { AUTUMN_ATMOSPHERE } from "@/data/atmosphere";

type LeafSpecies = "beech" | "birch" | "willow";

interface LeafParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeedY: number;
  baseDriftX: number;
  size: number;
  depth: number;
  opacity: number;
  color: string;
  veinColor: string;
  species: LeafSpecies;
  angle: number;
  angularVel: number;
  tilt: number;
  tiltSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
}

const LEAF_PALETTE = [
  { fill: "#d49a5a", vein: "#8f5e2a" }, // Тёплый кедровый янтарь
  { fill: "#c4773b", vein: "#7c4218" }, // Осенний буковый бронзовый
  { fill: "#dfb16b", vein: "#9c7032" }, // Светлая берёзовая охра
  { fill: "#a4572d", vein: "#642f12" }, // Медная терракота
  { fill: "#8f9662", vein: "#575d36" }, // Приглушённый лесной шалфей
] as const;

const SPECIES_LIST: LeafSpecies[] = ["beech", "birch", "willow"];

function createLeaf(
  width: number,
  height: number,
  randomY = false
): LeafParticle {
  const depth = 0.45 + Math.random() * 0.75; // 0.45 (дальний план) .. 1.2 (ближний план)
  const palette =
    LEAF_PALETTE[Math.floor(Math.random() * LEAF_PALETTE.length)];
  const species =
    SPECIES_LIST[Math.floor(Math.random() * SPECIES_LIST.length)];

  const baseSpeedY = (0.45 + Math.random() * 0.65) * depth;
  const baseDriftX = (Math.random() - 0.38) * 0.35 * depth;

  return {
    x: Math.random() * (width + 120) - 60,
    y: randomY ? Math.random() * height : -30 - Math.random() * 140,
    vx: baseDriftX,
    vy: baseSpeedY,
    baseSpeedY,
    baseDriftX,
    size: (9 + Math.random() * 7) * depth,
    depth,
    opacity: Math.min(0.76, 0.24 + depth * 0.42),
    color: palette.fill,
    veinColor: palette.vein,
    species,
    angle: Math.random() * Math.PI * 2,
    angularVel: (Math.random() - 0.5) * 0.018,
    tilt: Math.random() * Math.PI * 2,
    tiltSpeed: 0.016 + Math.random() * 0.024,
    swayPhase: Math.random() * Math.PI * 2,
    swaySpeed: 0.012 + Math.random() * 0.016,
    swayAmp: (0.35 + Math.random() * 0.55) * depth,
  };
}

function drawLeafShape(
  ctx: CanvasRenderingContext2D,
  leaf: LeafParticle
) {
  const s = leaf.size;
  const flipScale = 0.28 + 0.72 * Math.abs(Math.cos(leaf.tilt));

  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.angle);
  ctx.scale(1, flipScale);
  ctx.globalAlpha = leaf.opacity;

  ctx.fillStyle = leaf.color;
  ctx.strokeStyle = leaf.veinColor;
  ctx.lineWidth = Math.max(0.7, s * 0.055);
  ctx.lineCap = "round";

  ctx.beginPath();
  if (leaf.species === "beech") {
    // Овально-заострённый лист кавказского бука
    ctx.moveTo(-s * 0.95, 0);
    ctx.bezierCurveTo(-s * 0.45, -s * 0.62, s * 0.38, -s * 0.56, s * 1.0, 0);
    ctx.bezierCurveTo(s * 0.38, s * 0.56, -s * 0.45, s * 0.62, -s * 0.95, 0);
  } else if (leaf.species === "birch") {
    // Ромбовидно-сердцевидный лист берёзы
    ctx.moveTo(-s * 0.8, 0);
    ctx.bezierCurveTo(-s * 0.55, -s * 0.74, s * 0.15, -s * 0.55, s * 1.05, 0);
    ctx.bezierCurveTo(s * 0.15, s * 0.55, -s * 0.55, s * 0.74, -s * 0.8, 0);
  } else {
    // Узкий изящный лист ивы
    ctx.moveTo(-s * 1.15, 0);
    ctx.quadraticCurveTo(-s * 0.1, -s * 0.34, s * 1.2, 0);
    ctx.quadraticCurveTo(-s * 0.1, s * 0.34, -s * 1.15, 0);
  }
  ctx.closePath();
  ctx.fill();

  // Черешок и центральная прожилка
  ctx.beginPath();
  ctx.moveTo(-s * 1.18, 0);
  ctx.lineTo(s * 0.78, 0);
  ctx.stroke();

  ctx.restore();
}

export function AutumnAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isEnabled =
    AUTUMN_ATMOSPHERE.enabled &&
    process.env.NEXT_PUBLIC_AUTUMN_ATMOSPHERE !== "false";

  useEffect(() => {
    if (!isEnabled || !AUTUMN_ATMOSPHERE.leaves) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const targetCount = width < 768 ? 12 : 26;
    const leaves: LeafParticle[] = Array.from({ length: targetCount }, () =>
      createLeaf(width, height, true)
    );

    const pointer = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      active: false,
    };

    function onPointerMove(e: PointerEvent) {
      if (pointer.lastX > -9000) {
        pointer.vx = Math.max(-28, Math.min(28, e.clientX - pointer.lastX));
        pointer.vy = Math.max(-28, Math.min(28, e.clientY - pointer.lastY));
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.lastX = -9999;
      pointer.lastY = -9999;
      pointer.vx = 0;
      pointer.vy = 0;
    }

    let rafId = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 16.667, 2.2);
      lastTime = now;

      ctx!.clearRect(0, 0, width, height);

      // Затухание импульса ветра от курсора
      pointer.vx *= 0.88;
      pointer.vy *= 0.88;

      const interactionRadius = 165;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        leaf.swayPhase += leaf.swaySpeed * dt;
        leaf.tilt += leaf.tiltSpeed * dt;

        // Реакция на курсор: мягкое обтекание + подхватывание потоком воздуха
        if (pointer.active) {
          const dx = leaf.x - pointer.x;
          const dy = leaf.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const influence = Math.pow(1 - dist / interactionRadius, 1.65);
            const nx = dx / dist;
            const ny = dy / dist;

            // Отталкивающая воздушная подушка вокруг курсора
            leaf.vx += nx * influence * 0.52 * dt;
            leaf.vy += ny * influence * 0.38 * dt;

            // Попутный вихрь от движения мыши
            leaf.vx += pointer.vx * influence * 0.075 * dt;
            leaf.vy += pointer.vy * influence * 0.055 * dt;

            // Закручивание листа в потоке воздуха
            leaf.angularVel +=
              (pointer.vx * 0.0014 + nx * 0.006) * influence * dt;
            leaf.tiltSpeed = Math.min(0.085, leaf.tiltSpeed + 0.002 * influence);
          }
        }

        // Плавное возвращение к естественному падению в лесном воздухе
        const naturalVx =
          leaf.baseDriftX + Math.sin(leaf.swayPhase) * leaf.swayAmp;
        leaf.vx += (naturalVx - leaf.vx) * 0.035 * dt;
        leaf.vy += (leaf.baseSpeedY - leaf.vy) * 0.035 * dt;
        leaf.angularVel *= Math.pow(0.97, dt);
        leaf.tiltSpeed += (0.022 - leaf.tiltSpeed) * 0.02 * dt;

        leaf.x += leaf.vx * dt;
        leaf.y += leaf.vy * dt;
        leaf.angle +=
          (leaf.angularVel + Math.cos(leaf.swayPhase) * 0.006) * dt;

        // Перезапуск листа сверху после выхода за границы экрана
        if (
          leaf.y > height + 45 ||
          leaf.x < -120 ||
          leaf.x > width + 120
        ) {
          leaves[i] = createLeaf(width, height, false);
        }

        drawLeafShape(ctx!, leaf);
      }

      if (!document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onVisibilityChange() {
      if (!document.hidden) {
        lastTime = performance.now();
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
      }
    }

    window.addEventListener("resize", setCanvasSize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* Осенний горный туман (2 плавных полупрозрачных слоя в противофазе) */}
      {AUTUMN_ATMOSPHERE.fog && (
        <>
          <div className="autumn-fog-upper absolute -inset-x-[18%] top-0 h-[58vh]" />
          <div className="autumn-fog-lower absolute -inset-x-[18%] bottom-0 h-[44vh]" />
        </>
      )}

      {/* Интерактивный листопад */}
      {AUTUMN_ATMOSPHERE.leaves && (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}
    </div>
  );
}
