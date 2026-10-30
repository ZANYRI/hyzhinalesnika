"use client";

import React, { useEffect, useRef } from "react";
import { AUTUMN_ATMOSPHERE } from "@/data/atmosphere";

type LeafSpecies = "maple" | "oak" | "beech" | "birch";

interface ColorTheme {
  center: string;
  mid: string;
  edge: string;
  vein: string;
  stem: string;
  spot: string;
}

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
  sprite: HTMLCanvasElement;
  angle: number;
  angularVel: number;
  tilt: number;
  tiltSpeed: number;
  roll: number;
  rollSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
}

const AUTUMN_THEMES: ColorTheme[] = [
  // Янтарно-золотой клён/берёза
  {
    center: "#e8be6b",
    mid: "#d49244",
    edge: "#9e4d22",
    vein: "rgba(96, 46, 16, 0.55)",
    stem: "#6b3a19",
    spot: "rgba(110, 45, 18, 0.28)",
  },
  // Багряно-медный осенний бук
  {
    center: "#cf7a3c",
    mid: "#ad4f28",
    edge: "#6e2617",
    vein: "rgba(68, 22, 10, 0.55)",
    stem: "#542614",
    spot: "rgba(72, 20, 12, 0.3)",
  },
  // Тёплая охра с оливковой сердцевиной
  {
    center: "#c8b35a",
    mid: "#c98b3e",
    edge: "#8c4a23",
    vein: "rgba(82, 48, 18, 0.5)",
    stem: "#5e3b1b",
    spot: "rgba(95, 52, 20, 0.25)",
  },
  // Бронзово-рыжий горный дуб
  {
    center: "#d89c52",
    mid: "#b3652e",
    edge: "#753618",
    vein: "rgba(74, 34, 14, 0.55)",
    stem: "#572c14",
    spot: "rgba(80, 32, 12, 0.28)",
  },
];

const SPECIES_LIST: LeafSpecies[] = ["maple", "beech", "oak", "birch"];

function buildMapleOutline(ctx: CanvasRenderingContext2D) {
  const pts: [number, number][] = [
    [0, 46],
    [12, 52],
    [26, 59],
    [46, 51],
    [38, 37],
    [25, 29],
    [50, 27],
    [65, 21],
    [58, 13],
    [85, -4],
    [63, -12],
    [67, -24],
    [29, -21],
    [38, -45],
    [27, -49],
    [24, -70],
    [13, -67],
    [0, -93],
    [-12, -66],
    [-25, -71],
    [-26, -48],
    [-39, -44],
    [-28, -20],
    [-65, -25],
    [-61, -12],
    [-84, -2],
    [-57, 14],
    [-63, 23],
    [-49, 28],
    [-24, 30],
    [-37, 38],
    [-44, 53],
    [-25, 60],
    [-12, 52],
  ];

  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    ctx.lineTo(pts[i][0], pts[i][1]);
  }
  ctx.closePath();
}

function drawMapleVeins(ctx: CanvasRenderingContext2D) {
  const mainVeins: [number, number, number, number][] = [
    [0, 46, 0, -88],
    [0, 44, 79, -3],
    [0, 44, -78, -1],
    [0, 46, 42, 49],
    [0, 46, -40, 51],
  ];

  ctx.beginPath();
  for (const [x1, y1, x2, y2] of mainVeins) {
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo((x1 + x2) * 0.48 + 2, (y1 + y2) * 0.5, x2, y2);
  }
  // Боковые прожилки центрального и боковых лучей
  const subVeins: [number, number, number, number][] = [
    [0, -18, 22, -64],
    [0, -16, -23, -65],
    [0, 2, 34, -41],
    [0, 4, -35, -40],
    [36, 20, 62, -21],
    [-35, 21, -60, -22],
    [32, 24, 60, 19],
    [-31, 25, -58, 21],
  ];
  for (const [x1, y1, x2, y2] of subVeins) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
}

function buildSerratedLeaf(
  ctx: CanvasRenderingContext2D,
  mode: "beech" | "birch"
) {
  const steps = 46;
  const rightPts: [number, number][] = [];
  const leftPts: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 = основание (y=58), 1 = кончик (y=-88)
    const y = 58 - t * 146;
    const midBend = Math.sin(t * Math.PI) * 3.5;

    let halfW: number;
    let tooth: number;

    if (mode === "beech") {
      halfW = Math.sin(Math.pow(t, 0.82) * Math.PI) * 48;
      // Характерные пилообразные зубчики бука
      const saw = ((t * 10) % 1) - 0.5;
      tooth = t > 0.07 && t < 0.95 ? saw * 5.2 : 0;
    } else {
      // Ромбовидно-сердцевидный профиль берёзы с двойными зубчиками
      const birchEnv =
        Math.pow(Math.sin(t * Math.PI), 0.72) * (1.18 - 0.52 * t) * 52;
      halfW = Math.max(0, birchEnv);
      const saw1 = Math.sin(t * Math.PI * 22) * 3.2;
      const saw2 = Math.sin(t * Math.PI * 44) * 1.4;
      tooth = t > 0.06 && t < 0.96 ? saw1 + saw2 : 0;
    }

    rightPts.push([midBend + halfW + tooth, y]);
    leftPts.push([midBend - halfW - tooth * 0.92, y]);
  }

  ctx.beginPath();
  ctx.moveTo(rightPts[0][0], rightPts[0][1]);
  for (let i = 1; i < rightPts.length; i++) {
    ctx.lineTo(rightPts[i][0], rightPts[i][1]);
  }
  for (let i = leftPts.length - 1; i >= 0; i--) {
    ctx.lineTo(leftPts[i][0], leftPts[i][1]);
  }
  ctx.closePath();
}

function drawHerringboneVeins(
  ctx: CanvasRenderingContext2D,
  mode: "beech" | "birch"
) {
  ctx.beginPath();
  // Изогнутая центральная жилка
  ctx.moveTo(0, 58);
  ctx.quadraticCurveTo(6, -12, 0, -86);

  const pairs = mode === "beech" ? 9 : 7;
  for (let i = 1; i <= pairs; i++) {
    const t = i / (pairs + 1);
    const yStart = 52 - t * 124;
    const midX = Math.sin(t * Math.PI) * 3.5;
    const reach =
      mode === "beech"
        ? Math.sin(Math.pow(t, 0.82) * Math.PI) * 44
        : Math.pow(Math.sin(t * Math.PI), 0.72) * (1.18 - 0.52 * t) * 45;
    const yEnd = yStart - 13 - (1 - t) * 5;

    ctx.moveTo(midX, yStart);
    ctx.quadraticCurveTo(midX + reach * 0.55, yStart - 4, midX + reach, yEnd);

    ctx.moveTo(midX, yStart + 2);
    ctx.quadraticCurveTo(
      midX - reach * 0.55,
      yStart - 2,
      midX - reach * 0.96,
      yEnd + 2
    );
  }
  ctx.stroke();
}

function buildOakLeaf(ctx: CanvasRenderingContext2D) {
  const steps = 64;
  const rightPts: [number, number][] = [];
  const leftPts: [number, number][] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = 60 - t * 146;
    const midBend = Math.sin(t * Math.PI) * 3;

    // Волнистые округлые лопасти дубового листа
    const baseEnv = Math.sin(Math.pow(t, 0.68) * Math.PI) * (0.68 + 0.5 * t);
    const lobes =
      t > 0.08 && t < 0.93 ? 0.74 + 0.28 * Math.cos(t * Math.PI * 8.5) : 0.88;
    const halfW = baseEnv * lobes * 48;

    rightPts.push([midBend + halfW, y]);
    leftPts.push([midBend - halfW * 0.95, y]);
  }

  ctx.beginPath();
  ctx.moveTo(rightPts[0][0], rightPts[0][1]);
  for (let i = 1; i < rightPts.length; i++) {
    ctx.lineTo(rightPts[i][0], rightPts[i][1]);
  }
  for (let i = leftPts.length - 1; i >= 0; i--) {
    ctx.lineTo(leftPts[i][0], leftPts[i][1]);
  }
  ctx.closePath();
}

function drawOakVeins(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(0, 60);
  ctx.quadraticCurveTo(5, -14, 0, -84);

  const lobeTs = [0.22, 0.45, 0.68, 0.88];
  for (const t of lobeTs) {
    const yStart = 56 - t * 136;
    const midX = Math.sin(t * Math.PI) * 3;
    const reach = Math.sin(Math.pow(t, 0.68) * Math.PI) * (0.68 + 0.5 * t) * 42;

    ctx.moveTo(midX, yStart + 6);
    ctx.quadraticCurveTo(midX + reach * 0.5, yStart - 2, midX + reach, yStart - 9);

    ctx.moveTo(midX, yStart + 8);
    ctx.quadraticCurveTo(
      midX - reach * 0.5,
      yStart,
      midX - reach * 0.94,
      yStart - 7
    );
  }
  ctx.stroke();
}

function createLeafSprite(
  species: LeafSpecies,
  theme: ColorTheme
): HTMLCanvasElement {
  const size = 220;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (!sctx) return sprite;

  sctx.translate(size / 2, size / 2);

  // 1. Черешок листа (изогнутая веточка у основания)
  const stemStartY = species === "maple" ? 45 : 57;
  sctx.save();
  sctx.strokeStyle = theme.stem;
  sctx.lineWidth = 3.4;
  sctx.lineCap = "round";
  sctx.beginPath();
  sctx.moveTo(0, stemStartY);
  sctx.quadraticCurveTo(3, stemStartY + 18, -5, stemStartY + 36);
  sctx.stroke();
  sctx.restore();

  // 2. Силуэт листовой пластины с мягкой объёмной тенью
  sctx.save();
  sctx.shadowColor = "rgba(0, 0, 0, 0.34)";
  sctx.shadowBlur = 8;
  sctx.shadowOffsetY = 3;

  if (species === "maple") {
    buildMapleOutline(sctx);
  } else if (species === "oak") {
    buildOakLeaf(sctx);
  } else {
    buildSerratedLeaf(sctx, species);
  }

  // Многослойный живой осенний градиент от золотистой середины к подпаленным краям
  const grad = sctx.createRadialGradient(-8, -6, 10, 0, -10, 96);
  grad.addColorStop(0, theme.center);
  grad.addColorStop(0.58, theme.mid);
  grad.addColorStop(1, theme.edge);
  sctx.fillStyle = grad;
  sctx.fill();
  sctx.restore();

  // 3. Естественные осенние пятнышки и лёгкий контур края внутри маски листа
  sctx.save();
  if (species === "maple") {
    buildMapleOutline(sctx);
  } else if (species === "oak") {
    buildOakLeaf(sctx);
  } else {
    buildSerratedLeaf(sctx, species);
  }
  sctx.clip();

  // Тёплый солнечный блик на одной половине пластины
  const sheen = sctx.createLinearGradient(-70, -60, 65, 55);
  sheen.addColorStop(0, "rgba(255, 238, 195, 0.22)");
  sheen.addColorStop(0.45, "rgba(255, 238, 195, 0)");
  sheen.addColorStop(1, "rgba(40, 14, 4, 0.2)");
  sctx.fillStyle = sheen;
  sctx.fillRect(-105, -105, 210, 210);

  // Несколько органических осенних крапинок
  sctx.fillStyle = theme.spot;
  const spots: [number, number, number][] = [
    [18, -24, 6],
    [-22, 12, 4.5],
    [14, 22, 3.5],
    [-12, -46, 4],
  ];
  for (const [sx, sy, sr] of spots) {
    sctx.beginPath();
    sctx.arc(sx, sy, sr, 0, Math.PI * 2);
    sctx.fill();
  }

  // 4. Прожилки листа
  sctx.strokeStyle = theme.vein;
  sctx.lineWidth = 1.65;
  sctx.lineCap = "round";
  if (species === "maple") {
    drawMapleVeins(sctx);
  } else if (species === "oak") {
    drawOakVeins(sctx);
  } else {
    drawHerringboneVeins(sctx, species);
  }

  // Тонкая тёмная кайма по зубчатому краю
  sctx.strokeStyle = "rgba(58, 24, 10, 0.35)";
  sctx.lineWidth = 1.4;
  if (species === "maple") {
    buildMapleOutline(sctx);
  } else if (species === "oak") {
    buildOakLeaf(sctx);
  } else {
    buildSerratedLeaf(sctx, species);
  }
  sctx.stroke();

  sctx.restore();
  return sprite;
}

function createLeafParticle(
  width: number,
  height: number,
  sprites: HTMLCanvasElement[],
  randomY = false
): LeafParticle {
  const depth = 0.55 + Math.random() * 0.65; // 0.55 .. 1.2
  const sprite = sprites[Math.floor(Math.random() * sprites.length)];

  const baseSpeedY = (0.48 + Math.random() * 0.58) * depth;
  const baseDriftX = (Math.random() - 0.42) * 0.36 * depth;

  return {
    x: Math.random() * (width + 140) - 70,
    y: randomY ? Math.random() * height : -55 - Math.random() * 160,
    vx: baseDriftX,
    vy: baseSpeedY,
    baseSpeedY,
    baseDriftX,
    size: (24 + Math.random() * 16) * depth, // Чёткий читаемый размер 18..48px
    depth,
    opacity: Math.min(0.88, 0.38 + depth * 0.42),
    sprite,
    angle: Math.random() * Math.PI * 2,
    angularVel: (Math.random() - 0.5) * 0.012,
    tilt: Math.random() * Math.PI * 2,
    tiltSpeed: 0.014 + Math.random() * 0.018,
    roll: Math.random() * Math.PI * 2,
    rollSpeed: 0.01 + Math.random() * 0.015,
    swayPhase: Math.random() * Math.PI * 2,
    swaySpeed: 0.013 + Math.random() * 0.014,
    swayAmp: (0.48 + Math.random() * 0.65) * depth,
  };
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

    // Предварительно генерируем 16 детальных ботанических текстур листьев (4 дерева × 4 осенних оттенка)
    const sprites: HTMLCanvasElement[] = [];
    for (const species of SPECIES_LIST) {
      for (const theme of AUTUMN_THEMES) {
        sprites.push(createLeafSprite(species, theme));
      }
    }

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

    const targetCount = width < 768 ? 11 : 22;
    const leaves: LeafParticle[] = Array.from({ length: targetCount }, () =>
      createLeafParticle(width, height, sprites, true)
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

      pointer.vx *= 0.88;
      pointer.vy *= 0.88;

      const interactionRadius = 175;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        leaf.swayPhase += leaf.swaySpeed * dt;
        leaf.tilt += leaf.tiltSpeed * dt;
        leaf.roll += leaf.rollSpeed * dt;

        // Реакция на курсор: обтекание воздушной подушкой + подхватывание потоком
        if (pointer.active) {
          const dx = leaf.x - pointer.x;
          const dy = leaf.y - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const influence = Math.pow(1 - dist / interactionRadius, 1.6);
            const nx = dx / dist;
            const ny = dy / dist;

            leaf.vx += nx * influence * 0.55 * dt;
            leaf.vy += ny * influence * 0.4 * dt;

            leaf.vx += pointer.vx * influence * 0.08 * dt;
            leaf.vy += pointer.vy * influence * 0.06 * dt;

            leaf.angularVel +=
              (pointer.vx * 0.0012 + nx * 0.005) * influence * dt;
            leaf.tiltSpeed = Math.min(
              0.075,
              leaf.tiltSpeed + 0.0018 * influence
            );
          }
        }

        // Планирующее маятниковое скольжение (как у настоящего сухого листа в воздухе)
        const swaySin = Math.sin(leaf.swayPhase);
        const naturalVx = leaf.baseDriftX + swaySin * leaf.swayAmp;
        // При боковом планировании вертикальное падение слегка замедляется за счёт подъёмной силы
        const glideLift = Math.abs(swaySin) * 0.14 * leaf.depth;
        const targetVy = Math.max(0.22, leaf.baseSpeedY - glideLift);

        leaf.vx += (naturalVx - leaf.vx) * 0.036 * dt;
        leaf.vy += (targetVy - leaf.vy) * 0.036 * dt;
        leaf.angularVel *= Math.pow(0.97, dt);
        leaf.tiltSpeed += (0.018 - leaf.tiltSpeed) * 0.02 * dt;

        leaf.x += leaf.vx * dt;
        leaf.y += leaf.vy * dt;
        leaf.angle +=
          (leaf.angularVel + Math.cos(leaf.swayPhase) * 0.0075) * dt;

        if (
          leaf.y > height + 65 ||
          leaf.x < -140 ||
          leaf.x > width + 140
        ) {
          leaves[i] = createLeafParticle(width, height, sprites, false);
        }

        // 3D-перспективная отрисовка текстуры листа
        const flipY = 0.34 + 0.66 * Math.abs(Math.cos(leaf.tilt));
        const flipX = 0.78 + 0.22 * Math.cos(leaf.roll);
        const shear = Math.sin(leaf.tilt) * 0.18;

        ctx!.save();
        ctx!.translate(leaf.x, leaf.y);
        ctx!.rotate(leaf.angle);
        ctx!.transform(flipX, shear * 0.4, shear, flipY, 0, 0);
        ctx!.globalAlpha = leaf.opacity;
        ctx!.drawImage(
          leaf.sprite,
          -leaf.size / 2,
          -leaf.size / 2,
          leaf.size,
          leaf.size
        );
        ctx!.restore();
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
      {AUTUMN_ATMOSPHERE.fog && (
        <>
          <div className="autumn-fog-upper absolute -inset-x-[18%] top-0 h-[58vh]" />
          <div className="autumn-fog-lower absolute -inset-x-[18%] bottom-0 h-[44vh]" />
        </>
      )}

      {AUTUMN_ATMOSPHERE.leaves && (
        <canvas ref={canvasRef} className="block h-full w-full" />
      )}
    </div>
  );
}
