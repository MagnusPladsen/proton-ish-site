#!/usr/bin/env python3
"""Writes public/app-icon.svg: the Proton-ish app icon, from the geometry in Proton-ish's helpers/icon.swift.

Two crossed orbits around a wine drop, with one electron on the front of an orbit, in white on the teal
gradient. Coordinates are icon.swift's own (1024 canvas, y up); the SVG flips them.
Usage: python3 scripts/app-icon.py
"""
import math
import pathlib

CANVAS = 1024
CX = CY = CANVAS / 2
COVERAGE = 0.90
ORBIT_RX, ORBIT_RY = 470, 150
ORBIT_ANGLES = [35, -35]
STROKE = 40
GAP = 22
DROP_R = 104
DROP_SHIFT_Y = -40
ELECTRON_R = 40
ELECTRON_ORBIT, ELECTRON_ANGLE = 0, -40
TOP, BOTTOM = "#1a8787", "#0c454d"  # icon.json's linear-gradient, srgb


def drop_path(grow=0):
    r = DROP_R + grow
    cx, cy = CX, CY + DROP_SHIFT_Y
    tip = (cx, cy + r * 2.1)
    f = lambda v: f"{v:.2f}"
    return (
        f"M{f(tip[0])} {f(tip[1])}"
        f"C{f(cx + r * .35)} {f(cy + r * 1.4)} {f(cx + r)} {f(cy + r * .75)} {f(cx + r)} {f(cy)}"
        # icon.swift's arc runs clockwise through the bottom; y is up here, so that is sweep 0
        f"A{r} {r} 0 0 0 {f(cx - r)} {f(cy)}"
        f"C{f(cx - r)} {f(cy + r * .75)} {f(cx - r * .35)} {f(cy + r * 1.4)} {f(tip[0])} {f(tip[1])}Z"
    )


def electron_center():
    t = math.radians(ELECTRON_ANGLE)
    x, y = ORBIT_RX * math.cos(t), ORBIT_RY * math.sin(t)
    a = math.radians(ORBIT_ANGLES[ELECTRON_ORBIT])
    return CX + x * math.cos(a) - y * math.sin(a), CY + x * math.sin(a) + y * math.cos(a)


def ink_extent():
    # The rotated orbits are the widest and tallest ink; the glyph is centred on the canvas
    a = math.radians(ORBIT_ANGLES[0])
    half_w = math.hypot(ORBIT_RX * math.cos(a), ORBIT_RY * math.sin(a)) + STROKE / 2
    half_h = math.hypot(ORBIT_RX * math.sin(a), ORBIT_RY * math.cos(a)) + STROKE / 2
    return 2 * max(half_w, half_h)


def orbits(half, width, color="#fff"):
    return "".join(
        f'<g transform="translate({CX} {CY}) rotate({angle})">'
        f'<ellipse rx="{ORBIT_RX}" ry="{ORBIT_RY}" fill="none" stroke="{color}" stroke-width="{width}" clip-path="url(#{half})"/></g>'
        for angle in ORBIT_ANGLES
    )


def svg():
    scale = CANVAS * COVERAGE / ink_extent()
    ex, ey = electron_center()
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
    <clipPath id="front"><rect x="-{big}" y="-{big}" width="{big * 2}" height="{big + 6}"/></clipPath>
    <clipPath id="back"><rect x="-{big}" y="-6" width="{big * 2}" height="{big + 6}"/></clipPath>
    <mask id="behind-drop" maskUnits="userSpaceOnUse">{knock}<path d="{drop_path(GAP)}" fill="#000"/></mask>
    <mask id="drop-cut" maskUnits="userSpaceOnUse">{knock}{orbits("front", STROKE + GAP * 2, "#000")}</mask>
    <mask id="electron-cut" maskUnits="userSpaceOnUse">{knock}<circle cx="{ex:.2f}" cy="{ey:.2f}" r="{ELECTRON_R + GAP}" fill="#000"/></mask>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="-10" stdDeviation="14" flood-color="#00242a" flood-opacity=".45"/>
    </filter>
  </defs>
  <rect width="{CANVAS}" height="{CANVAS}" rx="229" fill="url(#bg)"/>
  <rect width="{CANVAS}" height="{CANVAS}" rx="229" fill="url(#sheen)"/>
  <g transform="translate({CX} {CY}) scale({scale:.5f} -{scale:.5f}) translate(-{CX} -{CY})" fill="#fff" filter="url(#shadow)" opacity=".96">
    <g mask="url(#behind-drop)">{orbits("back", STROKE)}</g>
    <path d="{drop_path()}" mask="url(#drop-cut)"/>
    <g mask="url(#electron-cut)">{orbits("front", STROKE)}</g>
    <circle cx="{ex:.2f}" cy="{ey:.2f}" r="{ELECTRON_R}"/>
  </g>
</svg>
"""


root = pathlib.Path(__file__).resolve().parent.parent
(root / "public/app-icon.svg").write_text(svg())
print("wrote public/app-icon.svg")
