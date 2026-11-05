"""Build deterministic Montserrat web subsets from the existing local fonts.

Regeneration only: pip install -r scripts/font-tools-requirements.txt
Then: python scripts/subset-fonts.py [--check]
No Python dependency is needed to build or run the website.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path

import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "public/fonts"
TARGET = FONTS / "subsets"
CSS = ROOT / "src/app/font-subsets.css"
CORE_RANGES = [
    (0x0000, 0x00FF), (0x0300, 0x036F), (0x0401, 0x0401),
    (0x0410, 0x044F), (0x0451, 0x0451), (0x2000, 0x206F),
    (0x20A0, 0x20CF), (0x2100, 0x214F), (0x2190, 0x21FF),
    (0x2212, 0x2212), (0xFEFF, 0xFEFF), (0xFFFD, 0xFFFD),
]


def unicode_range(points):
    intervals = []
    for point in sorted(points):
        if intervals and point == intervals[-1][1] + 1:
            intervals[-1][1] = point
        else:
            intervals.append([point, point])
    return ", ".join(
        f"U+{a:04X}" if a == b else f"U+{a:04X}-{b:04X}"
        for a, b in intervals
    )


def verify_metrics(original, optimized, core):
    cmap = original.getBestCmap()
    optimized_cmap = optimized.getBestCmap()
    assert set(optimized_cmap) == core, "Subset lost a requested character"
    original_glyphs = original.getGlyphSet()
    optimized_glyphs = optimized.getGlyphSet()
    for code in core:
        assert original["hmtx"][cmap[code]] == optimized["hmtx"][optimized_cmap[code]], hex(code)
        before = DecomposingRecordingPen(original_glyphs)
        after = DecomposingRecordingPen(optimized_glyphs)
        original_glyphs[cmap[code]].draw(before)
        optimized_glyphs[optimized_cmap[code]].draw(after)
        assert before.value == after.value, ("glyph outline", hex(code))
    for table, keys in {
        "head": ["unitsPerEm"],
        "hhea": ["ascent", "descent", "lineGap"],
        "OS/2": ["sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent"],
    }.items():
        for key in keys:
            assert getattr(original[table], key) == getattr(optimized[table], key), (table, key)
    # Copyright and licence metadata survive subsetting.
    for name_id in [0, 13, 14]:
        before = {n.toUnicode() for n in original["name"].names if n.nameID == name_id}
        after = {n.toUnicode() for n in optimized["name"].names if n.nameID == name_id}
        assert before == after, ("name", name_id)


def main():
    check = argparse.ArgumentParser()
    check.add_argument("--check", action="store_true")
    args = check.parse_args()
    faces, manifest = [], {"fontToolsVersion": fontTools.__version__, "fonts": []}
    if not args.check:
        TARGET.mkdir(parents=True, exist_ok=True)
    for weight in [400, 500, 600, 700]:
        source = FONTS / f"montserrat-{weight}.woff2"
        original = TTFont(source, recalcTimestamp=False)
        all_codes = set(original.getBestCmap())
        core = {c for c in all_codes if any(a <= c <= b for a, b in CORE_RANGES)}
        extended = all_codes - core
        assert core.isdisjoint(extended) and core | extended == all_codes
        font = TTFont(source, recalcTimestamp=False)
        options = subset.Options()
        options.flavor = "woff2"
        options.name_IDs = ["*"]
        options.name_languages = ["*"]
        options.layout_features = ["*"]
        options.glyph_names = True
        options.drop_tables += ["FFTM"]
        # Keep TrueType hinting, kerning and original font metrics.
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=core)
        subsetter.subset(font)
        buffer = io.BytesIO()
        font.save(buffer)
        payload = buffer.getvalue()
        verify_metrics(original, TTFont(io.BytesIO(payload)), core)
        digest = hashlib.sha256(payload).hexdigest()[:12]
        filename = f"montserrat-{weight}-ru-latin.{digest}.woff2"
        target = TARGET / filename
        if args.check:
            assert target.read_bytes() == payload, f"Regenerate {target}"
        else:
            target.write_bytes(payload)
        for src, points in [(f"/fonts/{source.name}", extended), (f"/fonts/subsets/{filename}", core)]:
            faces.append(f'''@font-face {{
  font-family: "Montserrat";
  font-weight: {weight};
  font-style: normal;
  font-display: swap;
  src: url("{src}") format("woff2");
  unicode-range: {unicode_range(points)};
}}''')
        manifest["fonts"].append({
            "weight": weight, "source": source.name, "subset": filename,
            "sourceBytes": source.stat().st_size, "subsetBytes": len(payload),
            "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
            "subsetSha256": hashlib.sha256(payload).hexdigest(),
            "sourceCodepoints": len(all_codes), "subsetCodepoints": len(core),
            "coreRange": unicode_range(core), "fallbackRange": unicode_range(extended),
        })
    css = "/* Generated by scripts/subset-fonts.py; keep the full-font fallback ranges. */\n" + "\n".join(faces) + "\n"
    manifest_text = json.dumps(manifest, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        assert CSS.read_text() == css, "Regenerate font-subsets.css"
        assert (TARGET / "manifest.json").read_text() == manifest_text, "Regenerate manifest"
    else:
        CSS.write_text(css)
        (TARGET / "manifest.json").write_text(manifest_text)
    before = sum(f["sourceBytes"] for f in manifest["fonts"])
    after = sum(f["subsetBytes"] for f in manifest["fonts"])
    print(f"Fonts {'verified' if args.check else 'generated'}: {before} → {after} bytes; full character coverage retained.")


if __name__ == "__main__":
    main()
