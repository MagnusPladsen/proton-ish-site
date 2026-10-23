#!/usr/bin/env python3
"""Writes public/app-icon.svg: the Proton-ish app icon, from the geometry in Proton-ish's helpers/icon.swift.

A wine glass inside two crossed orbits, sky and lavender, on the night-blue gradient. Coordinates are
icon.swift's own (1024 canvas, y up); the SVG flips them.
Usage: python3 scripts/app-icon.py
"""
import math
import pathlib

CANVAS = 1024
CX = CANVAS / 2
COVERAGE = 0.76
ORBIT_CY = 556
ORBIT_RX, ORBIT_RY = 380, 118
ORBIT_STROKE = 32
ORBITS = [(-24, "#7dd3fc"), (24, "#c4b5fd")]  # angle, colour (icon.json's layer fills)
GAP = 16
RIM_Y = 756
BOWL_HALF = 180
BOWL_DEPTH = 330
GLASS_STROKE = 34
STEM = 190
BASE_HALF = 130
WINE_LEVEL = 0.42
TOP, BOTTOM = "#2a2f6b", "#120f2e"  # icon.json's linear-gradient, srgb

f = lambda v: f"{v:.2f}"
BOWL_BOTTOM = RIM_Y - BOWL_DEPTH
STEM_BOTTOM = BOWL_BOTTOM - STEM


def bowl_path():
    l, r, t, b = CX - BOWL_HALF, CX + BOWL_HALF, RIM_Y, BOWL_BOTTOM
    return (
        f"M{f(l)} {f(t)}H{f(r)}"
        f"C{f(r + 6)} {f(t - BOWL_DEPTH * .62)} {f(CX + BOWL_HALF * .62)} {f(b)} {f(CX)} {f(b)}"
        f"C{f(CX - BOWL_HALF * .62)} {f(b)} {f(l - 6)} {f(t - BOWL_DEPTH * .62)} {f(l)} {f(t)}Z"
    )


def wine_path():
    y = RIM_Y - BOWL_DEPTH * WINE_LEVEL
    hw = BOWL_HALF * (1 - WINE_LEVEL ** 2.2 * .18)
    b = BOWL_BOTTOM + 4
    k = y - (y - b) * .55
    return (
        f"M{f(CX - hw)} {f(y)}H{f(CX + hw)}"
        f"C{f(CX + hw)} {f(k)} {f(CX + BOWL_HALF * .6)} {f(b)} {f(CX)} {f(b)}"
        f"C{f(CX - BOWL_HALF * .6)} {f(b)} {f(CX - hw)} {f(k)} {f(CX - hw)} {f(y)}Z"
    )


def glass(grow, color):
    s = GLASS_STROKE + grow
    return (
        f'<path d="{bowl_path()}" fill="none" stroke="{color}" stroke-width="{s}" stroke-linejoin="round"/>'
        f'<rect x="{f(CX - s / 2)}" y="{f(STEM_BOTTOM)}" width="{f(s)}" height="{f(STEM)}" fill="{color}"/>'
        f'<rect x="{f(CX - BASE_HALF - grow / 2)}" y="{f(STEM_BOTTOM - s / 2)}" width="{f(BASE_HALF * 2 + grow)}" '
        f'height="{f(s)}" rx="{f(s / 2)}" fill="{color}"/>'
    )


def ink_bounds():
    a = math.radians(ORBITS[0][0])
    half_w = math.hypot(ORBIT_RX * math.cos(a), ORBIT_RY * math.sin(a)) + ORBIT_STROKE / 2
    half_h = math.hypot(ORBIT_RX * math.sin(a), ORBIT_RY * math.cos(a)) + ORBIT_STROKE / 2
    top = max(ORBIT_CY + half_h, RIM_Y + GLASS_STROKE / 2)
    bottom = min(ORBIT_CY - half_h, STEM_BOTTOM - GLASS_STROKE / 2)
    return CX - half_w, bottom, 2 * half_w, top - bottom


def orbits(half, width, colored=True):
    return "".join(
        f'<g clip-path="url(#{half})"><ellipse cx="{CX}" cy="{ORBIT_CY}" rx="{ORBIT_RX}" ry="{ORBIT_RY}" '
        f'transform="rotate({angle} {CX} {ORBIT_CY})" fill="none" stroke="{color if colored else "#000"}" '
        f'stroke-width="{width}"/></g>'
        for angle, color in ORBITS
    )


def svg():
    x, y, w, h = ink_bounds()
    scale = CANVAS * COVERAGE / max(w, h)
    mx, my = x + w / 2, y + h / 2
    big = CANVAS * 2
    knock = f'<rect x="-{big}" y="-{big}" width="{big * 2}" height="{big * 2}" fill="#fff"/>'
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CANVAS} {CANVAS}" role="img" aria-label="Proton-ish">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{TOP}"/>
      <stop offset="1" stop-color="{BOTTOM}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
      <stop offset=".5" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="wine" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#ff4d6d"/>
      <stop offset="1" stop-color="#a3001f"/>
    </linearGradient>
    <clipPath id="front"><rect x="-{big}" y="-{big}" width="{big * 2}" height="{big + ORBIT_CY + 6}"/></clipPath>
    <clipPath id="back"><rect x="-{big}" y="{ORBIT_CY - 6}" width="{big * 2}" height="{big}"/></clipPath>
    <mask id="behind-glass" maskUnits="userSpaceOnUse">{knock}{glass(GAP * 2, "#000")}<path d="{bowl_path()}" fill="#000"/></mask>
    <mask id="front-cut" maskUnits="userSpaceOnUse">{knock}{orbits("front", ORBIT_STROKE + GAP * 2, False)}</mask>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="-10" stdDeviation="14" flood-color="#05041a" flood-opacity=".5"/>
    </filter>
  </defs>
  <rect width="{CANVAS}" height="{CANVAS}" rx="229" fill="url(#bg)"/>
  <rect width="{CANVAS}" height="{CANVAS}" rx="229" fill="url(#sheen)"/>
  <g transform="translate({CX} {CANVAS / 2}) scale({scale:.5f} -{scale:.5f}) translate({-mx:.2f} {-my:.2f})" filter="url(#shadow)">
    <g mask="url(#behind-glass)">{orbits("back", ORBIT_STROKE)}</g>
    <g mask="url(#front-cut)"><path d="{wine_path()}" fill="url(#wine)"/>{glass(0, "#fff")}</g>
    {orbits("front", ORBIT_STROKE)}
  </g>
</svg>
"""


root = pathlib.Path(__file__).resolve().parent.parent
(root / "public/app-icon.svg").write_text(svg())
print("wrote public/app-icon.svg")
