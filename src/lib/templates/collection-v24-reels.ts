// ─────────────────────────────────────────────────────────────
// collection-v24/reels — 8 premium product & ad reels (v0.24).
//
// The first templates in the library that ship ANIMATED: every page
// carries staggered element animations, a page transition and a few
// sound cues from the offline SFX pack, so Preview / Present / video
// export play a finished reel straight from the dashboard. Vertical
// 1080 × 1920 (Instagram Reels, TikTok, Shorts, Stories).
//
// Photo slots are drawn as labelled frames — drop a product photo over
// one, or let the Photos rail fill it. Original designs, nothing copied.
// ─────────────────────────────────────────────────────────────

import type { AnimationKind, ElementAnimation, PageTransition } from '../types'
import { tx, sh, st, gr, type TemplateDef } from './helpers'

const W = 1080
const H = 1920

/** entry animation: kind, delay (s), duration (s) */
const an = (kind: AnimationKind, delay = 0, duration = 0.6, extra: Partial<ElementAnimation> = {}): ElementAnimation =>
  ({ kind, delay, duration, easing: 'easeOut', ...extra })
const up = (delay = 0, duration = 0.6) => an('rise', delay, duration, { direction: 'up' })
const pop = (delay = 0, sfxId?: string) => an('pop', delay, 0.45, { easing: 'spring', ...(sfxId ? { sfxId } : {}) })
const wipe = (delay = 0, direction: 'left' | 'right' = 'left') => an('wipe', delay, 0.55, { direction })
const breathe = (delay = 0) => an('breathe', delay, 2.4, { easing: 'easeInOut' })

const slide = (direction: 'left' | 'up' = 'left'): PageTransition => ({ kind: 'slide', duration: 0.45, direction, sfxId: 'whoosh-soft' })
const fade: PageTransition = { kind: 'fade', duration: 0.5 }
const morph: PageTransition = { kind: 'morph', duration: 0.6 }

/** labelled photo slot (a frame the user drops a product photo onto) */
const photoSlot = (x: number, y: number, width: number, height: number, tint: string, label: string, radius = 40, delay = 0.1) => [
  sh('rect', { x, y, width, height, fill: tint, cornerRadius: radius, animation: an('zoom', delay, 0.7) }),
  gr('frame', { x: x + width / 2 - 60, y: y + height / 2 - 90, width: 120, height: 120, fill: 'transparent', stroke: '#FFFFFF', strokeWidth: 3, opacity: 0.7, animation: an('fade', delay + 0.3, 0.5) }),
  tx({ x, y: y + height / 2 + 50, width, height: 40, text: label, fontFamily: 'Inter', fontSize: 26, letterSpacing: 2, fill: '#FFFFFF', opacity: 0.75, align: 'center', animation: an('fade', delay + 0.3, 0.5) }),
]

/** rounded CTA pill with its label */
const cta = (y: number, text: string, bg: string, fg: string, delay: number, font = 'Outfit') => [
  sh('rect', { x: 190, y, width: 700, height: 120, fill: bg, cornerRadius: 60, animation: pop(delay, 'chime') }),
  tx({ x: 190, y: y + 36, width: 700, height: 60, text, fontFamily: font, bold: true, fontSize: 40, letterSpacing: 2, fill: fg, align: 'center', animation: an('fade', delay + 0.15, 0.4) }),
]

export const COLLECTION_V24_REELS: TemplateDef[] = [
  // 1 ── Sneaker drop · streetwear, acid green on black
  {
    slug: 'sneaker-drop-reel',
    name: 'Sneaker Drop Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#C6FF3D',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#0A0A0A' },
        elements: [
          sh('ellipse', { x: 140, y: 420, width: 800, height: 800, fill: '#C6FF3D', opacity: 0.16, animation: an('zoom', 0, 1.2) }),
          ...photoSlot(165, 520, 750, 750, '#1C1C1C', 'PRODUCT PHOTO', 375, 0.2),
          tx({ x: 60, y: 160, width: 960, height: 110, text: 'THE DROP', fontFamily: 'Bebas Neue', fontSize: 150, fill: '#FFFFFF', align: 'center', animation: wipe(0.3) }),
          tx({ x: 60, y: 290, width: 960, height: 110, text: 'IS HERE', fontFamily: 'Bebas Neue', fontSize: 150, fill: '#C6FF3D', align: 'center', animation: wipe(0.5, 'right') }),
          tx({ x: 90, y: 1380, width: 900, height: 60, text: 'AIRFLOW 02 · LIMITED RUN', fontFamily: 'Space Grotesk', bold: true, fontSize: 34, letterSpacing: 6, fill: '#C6FF3D', align: 'center', animation: up(0.9) }),
          tx({ x: 140, y: 1460, width: 800, height: 120, text: 'Only 500 pairs. When they’re gone, they’re gone.', fontFamily: 'Inter', fontSize: 36, lineHeight: 1.35, fill: '#A3A3A3', align: 'center', animation: up(1.05) }),
          st('🔥', { x: 860, y: 1560, width: 130, height: 130, fontSize: 100, animation: pop(1.3, 'pop') }),
        ],
      },
      {
        id: 'p2',
        transition: slide(),
        background: { type: 'solid', color: '#C6FF3D' },
        elements: [
          tx({ x: 80, y: 150, width: 920, height: 100, text: 'BUILT FOR', fontFamily: 'Bebas Neue', fontSize: 120, fill: '#0A0A0A', animation: wipe(0) }),
          tx({ x: 80, y: 260, width: 920, height: 100, text: 'THE STREET', fontFamily: 'Bebas Neue', fontSize: 120, fill: '#0A0A0A', animation: wipe(0.15) }),
          ...[['01', 'Recycled knit upper'], ['02', 'Cloud-foam midsole'], ['03', 'Grip that laughs at rain']].flatMap(([n, t], i) => [
            sh('rect', { x: 80, y: 560 + i * 300, width: 920, height: 220, fill: '#0A0A0A', cornerRadius: 32, animation: an('pan', 0.4 + i * 0.25, 0.6, { direction: 'left' }) }),
            tx({ x: 120, y: 600 + i * 300, width: 160, height: 140, text: n, fontFamily: 'Bebas Neue', fontSize: 120, fill: '#C6FF3D', animation: an('fade', 0.6 + i * 0.25, 0.4) }),
            tx({ x: 300, y: 640 + i * 300, width: 660, height: 70, text: t, fontFamily: 'Space Grotesk', bold: true, fontSize: 46, fill: '#FFFFFF', animation: an('fade', 0.7 + i * 0.25, 0.4) }),
          ]),
          tx({ x: 80, y: 1640, width: 920, height: 60, text: 'SWIPE → FOR THE PRICE', fontFamily: 'Space Grotesk', bold: true, fontSize: 32, letterSpacing: 6, fill: '#0A0A0A', align: 'center', animation: breathe(1.4) }),
        ],
      },
      {
        id: 'p3',
        transition: slide(),
        background: { type: 'solid', color: '#0A0A0A' },
        elements: [
          gr('burst', { x: 90, y: 340, width: 900, height: 900, fill: '#C6FF3D', animation: an('rotate', 0, 1.0, { easing: 'spring' }) }),
          tx({ x: 140, y: 600, width: 800, height: 100, text: 'DROPPING AT', fontFamily: 'Space Grotesk', bold: true, fontSize: 40, letterSpacing: 8, fill: '#0A0A0A', align: 'center', animation: up(0.5) }),
          tx({ x: 140, y: 690, width: 800, height: 220, text: '€149', fontFamily: 'Bebas Neue', fontSize: 240, fill: '#0A0A0A', align: 'center', animation: pop(0.7, 'impact-hit') }),
          tx({ x: 140, y: 920, width: 800, height: 60, text: 'FRIDAY · 10:00 CET', fontFamily: 'Space Grotesk', bold: true, fontSize: 36, letterSpacing: 4, fill: '#0A0A0A', align: 'center', animation: up(0.9) }),
          ...cta(1420, 'SET A REMINDER', '#C6FF3D', '#0A0A0A', 1.2, 'Space Grotesk'),
          tx({ x: 90, y: 1600, width: 900, height: 50, text: '@yourbrand · link in bio', fontFamily: 'Inter', fontSize: 30, fill: '#737373', align: 'center', animation: an('fade', 1.5, 0.5) }),
        ],
      },
    ],
  },

  // 2 ── Skincare glow · soft blush, serif, 4 beats
  {
    slug: 'skincare-glow-reel',
    name: 'Skincare Glow Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#E8A598',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'gradient', from: '#FBEDE8', to: '#F6D5CC', angle: 170 },
        elements: [
          sh('ellipse', { x: 240, y: 300, width: 600, height: 600, fill: '#FFFFFF', opacity: 0.6, animation: an('zoom', 0, 1.0) }),
          ...photoSlot(290, 350, 500, 500, '#E8A598', 'YOUR PRODUCT', 250, 0.2),
          tx({ x: 90, y: 1000, width: 900, height: 60, text: 'INTRODUCING', fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 10, fill: '#A65D4E', align: 'center', animation: an('fade', 0.6, 0.6) }),
          tx({ x: 90, y: 1070, width: 900, height: 260, text: 'Your new\nmorning ritual', fontFamily: 'Playfair Display', fontSize: 100, lineHeight: 1.1, fill: '#3F1D16', align: 'center', animation: up(0.8, 0.8) }),
          tx({ x: 170, y: 1380, width: 740, height: 100, text: 'Vitamin C · Niacinamide · Nothing you don’t need', fontFamily: 'Inter', fontSize: 32, lineHeight: 1.4, fill: '#7C4A3E', align: 'center', animation: up(1.1) }),
          st('✨', { x: 780, y: 280, width: 120, height: 120, fontSize: 90, animation: pop(1.3, 'chime-sparkle') }),
        ],
      },
      {
        id: 'p2',
        transition: fade,
        background: { type: 'solid', color: '#3F1D16' },
        elements: [
          tx({ x: 90, y: 180, width: 900, height: 120, text: 'Three steps.', fontFamily: 'Playfair Display', fontSize: 96, fill: '#FBEDE8', align: 'center', animation: up(0) }),
          tx({ x: 90, y: 300, width: 900, height: 120, text: 'Thirty seconds.', fontFamily: 'Playfair Display', italic: true, fontSize: 96, fill: '#E8A598', align: 'center', animation: up(0.2) }),
          ...[['Cleanse', 'Wake the skin, not the sink.'], ['Glow', 'One pump. Press, don’t rub.'], ['Protect', 'SPF 50, invisible finish.']].flatMap(([h, b], i) => [
            sh('ellipse', { x: 120, y: 620 + i * 330, width: 120, height: 120, fill: '#E8A598', animation: pop(0.5 + i * 0.3, 'tick') }),
            tx({ x: 120, y: 650 + i * 330, width: 120, height: 70, text: String(i + 1), fontFamily: 'Playfair Display', bold: true, fontSize: 58, fill: '#3F1D16', align: 'center', animation: an('fade', 0.6 + i * 0.3, 0.3) }),
            tx({ x: 290, y: 615 + i * 330, width: 700, height: 80, text: h, fontFamily: 'Playfair Display', fontSize: 68, fill: '#FBEDE8', animation: wipe(0.6 + i * 0.3) }),
            tx({ x: 290, y: 705 + i * 330, width: 700, height: 60, text: b, fontFamily: 'Inter', fontSize: 32, fill: '#D9B4AA', animation: an('fade', 0.8 + i * 0.3, 0.5) }),
          ]),
        ],
      },
      {
        id: 'p3',
        transition: morph,
        background: { type: 'solid', color: '#FBEDE8' },
        elements: [
          tx({ x: 90, y: 160, width: 900, height: 100, text: '28 days later', fontFamily: 'Playfair Display', italic: true, fontSize: 80, fill: '#3F1D16', align: 'center', animation: up(0) }),
          sh('rect', { x: 90, y: 340, width: 435, height: 900, fill: '#D9B4AA', cornerRadius: 40, animation: an('pan', 0.3, 0.6, { direction: 'left' }) }),
          sh('rect', { x: 555, y: 340, width: 435, height: 900, fill: '#E8A598', cornerRadius: 40, animation: an('pan', 0.45, 0.6, { direction: 'right' }) }),
          tx({ x: 90, y: 1130, width: 435, height: 60, text: 'BEFORE', fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 8, fill: '#3F1D16', align: 'center', animation: an('fade', 0.9, 0.4) }),
          tx({ x: 555, y: 1130, width: 435, height: 60, text: 'AFTER', fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 8, fill: '#3F1D16', align: 'center', animation: an('fade', 1.0, 0.4) }),
          tx({ x: 90, y: 1320, width: 900, height: 200, text: '“I stopped wearing foundation.”', fontFamily: 'Playfair Display', fontSize: 64, lineHeight: 1.2, fill: '#3F1D16', align: 'center', animation: up(1.2, 0.7) }),
          tx({ x: 90, y: 1540, width: 900, height: 50, text: '— Léa, 34 · verified buyer', fontFamily: 'Inter', fontSize: 30, fill: '#A65D4E', align: 'center', animation: an('fade', 1.5, 0.5) }),
        ],
      },
      {
        id: 'p4',
        transition: fade,
        background: { type: 'gradient', from: '#F6D5CC', to: '#FBEDE8', angle: 20 },
        elements: [
          ...photoSlot(290, 260, 500, 500, '#E8A598', 'PRODUCT', 250, 0),
          tx({ x: 90, y: 840, width: 900, height: 110, text: 'Glow Serum', fontFamily: 'Playfair Display', fontSize: 96, fill: '#3F1D16', align: 'center', animation: up(0.4) }),
          tx({ x: 90, y: 960, width: 900, height: 60, text: '30 ml · €39 · free shipping over €50', fontFamily: 'Inter', fontSize: 32, fill: '#7C4A3E', align: 'center', animation: up(0.6) }),
          ...cta(1180, 'SHOP THE RITUAL', '#3F1D16', '#FBEDE8', 0.9, 'Playfair Display'),
          tx({ x: 90, y: 1360, width: 900, height: 50, text: 'Use code GLOW10 for 10% off your first order', fontFamily: 'DM Mono', fontSize: 28, letterSpacing: 1, fill: '#A65D4E', align: 'center', animation: breathe(1.3) }),
        ],
      },
    ],
  },

  // 3 ── Tech gadget · clean white, electric blue specs
  {
    slug: 'gadget-launch-reel',
    name: 'Gadget Launch Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#2563EB',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#F5F7FB' },
        elements: [
          tx({ x: 80, y: 180, width: 920, height: 60, text: 'NOW SHIPPING', fontFamily: 'Space Grotesk', bold: true, fontSize: 32, letterSpacing: 10, fill: '#2563EB', align: 'center', animation: an('fade', 0, 0.5) }),
          tx({ x: 80, y: 260, width: 920, height: 160, text: 'Pulse One', fontFamily: 'Sora', bold: true, fontSize: 140, fill: '#0B1220', align: 'center', animation: up(0.2, 0.7) }),
          tx({ x: 80, y: 430, width: 920, height: 80, text: 'Noise cancelling that listens to you.', fontFamily: 'Inter', fontSize: 38, fill: '#4B5563', align: 'center', animation: up(0.45) }),
          sh('rect', { x: 140, y: 620, width: 800, height: 1000, fill: '#0B1220', cornerRadius: 70, animation: an('zoom', 0.6, 0.8) }),
          ...photoSlot(190, 670, 700, 900, '#1E293B', 'PRODUCT PHOTO', 50, 0.8),
          sh('rect', { x: 700, y: 560, width: 300, height: 90, fill: '#2563EB', cornerRadius: 45, animation: pop(1.3, 'pop') }),
          tx({ x: 700, y: 585, width: 300, height: 50, text: '40 H BATTERY', fontFamily: 'Space Grotesk', bold: true, fontSize: 28, letterSpacing: 2, fill: '#FFFFFF', align: 'center', animation: an('fade', 1.45, 0.3) }),
        ],
      },
      {
        id: 'p2',
        transition: slide('up'),
        background: { type: 'solid', color: '#0B1220' },
        elements: [
          tx({ x: 80, y: 160, width: 920, height: 100, text: 'The spec sheet', fontFamily: 'Sora', bold: true, fontSize: 84, fill: '#FFFFFF', animation: wipe(0) }),
          tx({ x: 80, y: 270, width: 920, height: 60, text: 'in one breath.', fontFamily: 'Sora', fontSize: 48, fill: '#60A5FA', animation: wipe(0.2) }),
          ...[['40h', 'playtime'], ['-45dB', 'noise cancel'], ['12 min', 'fast charge'], ['0.9 oz', 'per earbud']].flatMap(([v, l], i) => {
            const col = i % 2, row = Math.floor(i / 2)
            const x = 80 + col * 470, y = 480 + row * 470
            return [
              sh('rect', { x, y, width: 450, height: 430, fill: '#111A2E', stroke: '#1E3A8A', strokeWidth: 2, cornerRadius: 40, animation: an('zoom', 0.4 + i * 0.15, 0.5) }),
              tx({ x, y: y + 120, width: 450, height: 120, text: v, fontFamily: 'Space Grotesk', bold: true, fontSize: 96, fill: '#60A5FA', align: 'center', animation: pop(0.6 + i * 0.15, i === 0 ? 'click' : undefined) }),
              tx({ x, y: y + 260, width: 450, height: 50, text: l.toUpperCase(), fontFamily: 'Inter', fontSize: 28, letterSpacing: 4, fill: '#94A3B8', align: 'center', animation: an('fade', 0.75 + i * 0.15, 0.4) }),
            ]
          }),
          tx({ x: 80, y: 1500, width: 920, height: 120, text: 'Spatial audio · Multipoint · IPX5', fontFamily: 'Inter', fontSize: 34, fill: '#CBD5E1', align: 'center', animation: up(1.4) }),
        ],
      },
      {
        id: 'p3',
        transition: morph,
        background: { type: 'gradient', from: '#2563EB', to: '#1D4ED8', angle: 160 },
        elements: [
          sh('ellipse', { x: -200, y: 1300, width: 900, height: 900, fill: '#60A5FA', opacity: 0.35, animation: breathe(0) }),
          tx({ x: 80, y: 300, width: 920, height: 80, text: 'LAUNCH PRICE', fontFamily: 'Space Grotesk', bold: true, fontSize: 34, letterSpacing: 10, fill: '#BFDBFE', align: 'center', animation: an('fade', 0, 0.5) }),
          tx({ x: 80, y: 400, width: 920, height: 240, text: '€179', fontFamily: 'Sora', bold: true, fontSize: 220, fill: '#FFFFFF', align: 'center', animation: pop(0.3, 'impact-hit') }),
          tx({ x: 80, y: 660, width: 920, height: 70, text: '€229 after launch week', fontFamily: 'Inter', strike: true, fontSize: 40, fill: '#BFDBFE', align: 'center', animation: up(0.6) }),
          ...cta(1180, 'PRE-ORDER NOW', '#FFFFFF', '#1D4ED8', 0.9, 'Space Grotesk'),
          tx({ x: 80, y: 1360, width: 920, height: 50, text: 'Ships in 5 days · 30-day returns', fontFamily: 'Inter', fontSize: 30, fill: '#DBEAFE', align: 'center', animation: an('fade', 1.3, 0.5) }),
        ],
      },
    ],
  },

  // 4 ── Coffee roast · warm espresso tones, tasting notes
  {
    slug: 'coffee-roast-reel',
    name: 'Coffee Roast Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#C8742E',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#2B1A12' },
        elements: [
          sh('ellipse', { x: 190, y: 380, width: 700, height: 700, fill: '#C8742E', opacity: 0.25, animation: an('zoom', 0, 1.2) }),
          st('☕', { x: 340, y: 500, width: 400, height: 400, fontSize: 300, animation: pop(0.3, 'thud') }),
          tx({ x: 80, y: 1050, width: 920, height: 60, text: 'NEW SINGLE ORIGIN', fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 10, fill: '#E8B06A', align: 'center', animation: an('fade', 0.6, 0.5) }),
          tx({ x: 80, y: 1130, width: 920, height: 260, text: 'Small batch.\nBig flavour.', fontFamily: 'Playfair Display', bold: true, fontSize: 110, lineHeight: 1.05, fill: '#FBEFD9', align: 'center', animation: up(0.8, 0.8) }),
          tx({ x: 160, y: 1430, width: 760, height: 100, text: 'Roasted Tuesday. At your door Thursday.', fontFamily: 'Inter', fontSize: 34, lineHeight: 1.4, fill: '#C9A98A', align: 'center', animation: up(1.1) }),
        ],
      },
      {
        id: 'p2',
        transition: slide(),
        background: { type: 'solid', color: '#FBEFD9' },
        elements: [
          tx({ x: 80, y: 160, width: 920, height: 100, text: 'Tasting notes', fontFamily: 'Playfair Display', bold: true, fontSize: 90, fill: '#2B1A12', animation: wipe(0) }),
          tx({ x: 80, y: 270, width: 920, height: 60, text: 'HUILA · COLOMBIA · 1 800 M', fontFamily: 'DM Mono', fontSize: 28, letterSpacing: 6, fill: '#C8742E', animation: an('fade', 0.2, 0.5) }),
          ...[['🍫', 'Dark chocolate'], ['🍒', 'Black cherry'], ['🍯', 'Honey finish']].flatMap(([e, t], i) => [
            sh('rect', { x: 80, y: 480 + i * 320, width: 920, height: 240, fill: '#FFFFFF', cornerRadius: 40, animation: an('pan', 0.4 + i * 0.25, 0.6, { direction: i % 2 ? 'right' : 'left' }) }),
            st(e, { x: 120, y: 520 + i * 320, width: 160, height: 160, fontSize: 120, animation: pop(0.7 + i * 0.25, 'pop') }),
            tx({ x: 320, y: 560 + i * 320, width: 640, height: 90, text: t, fontFamily: 'Playfair Display', fontSize: 64, fill: '#2B1A12', animation: an('fade', 0.8 + i * 0.25, 0.4) }),
          ]),
          sh('rect', { x: 80, y: 1500, width: 920, height: 6, fill: '#C8742E', animation: wipe(1.5) }),
          tx({ x: 80, y: 1540, width: 920, height: 60, text: 'Roast level · medium-light', fontFamily: 'Inter', fontSize: 32, fill: '#7A5540', align: 'center', animation: an('fade', 1.7, 0.4) }),
        ],
      },
      {
        id: 'p3',
        transition: fade,
        background: { type: 'gradient', from: '#C8742E', to: '#8A4A1C', angle: 160 },
        elements: [
          ...photoSlot(240, 240, 600, 600, '#2B1A12', 'BAG PHOTO', 300, 0),
          tx({ x: 80, y: 920, width: 920, height: 110, text: '250 g · €14', fontFamily: 'Playfair Display', bold: true, fontSize: 96, fill: '#FBEFD9', align: 'center', animation: up(0.4) }),
          tx({ x: 80, y: 1040, width: 920, height: 60, text: 'Whole bean or ground for your brewer', fontFamily: 'Inter', fontSize: 32, fill: '#FBEFD9', opacity: 0.85, align: 'center', animation: up(0.6) }),
          ...cta(1220, 'ORDER BY FRIDAY', '#FBEFD9', '#2B1A12', 0.9, 'Playfair Display'),
          tx({ x: 80, y: 1400, width: 920, height: 50, text: 'Subscribe & save 15%', fontFamily: 'DM Mono', fontSize: 28, letterSpacing: 2, fill: '#FBEFD9', align: 'center', animation: breathe(1.3) }),
        ],
      },
    ],
  },

  // 5 ── Flash deal countdown · ad reel, red alert
  {
    slug: 'flash-deal-reel',
    name: 'Flash Deal Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#EF4444',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#EF4444' },
        elements: [
          tx({ x: 60, y: 420, width: 960, height: 200, text: '48', fontFamily: 'Bebas Neue', fontSize: 420, fill: '#FFFFFF', align: 'center', animation: pop(0, 'boom') }),
          tx({ x: 60, y: 860, width: 960, height: 120, text: 'HOURS ONLY', fontFamily: 'Bebas Neue', fontSize: 140, fill: '#111111', align: 'center', animation: wipe(0.35) }),
          sh('rect', { x: 300, y: 1060, width: 480, height: 90, fill: '#111111', cornerRadius: 45, animation: an('zoom', 0.6, 0.4) }),
          tx({ x: 300, y: 1085, width: 480, height: 50, text: 'ENDS SUNDAY MIDNIGHT', fontFamily: 'Space Grotesk', bold: true, fontSize: 28, letterSpacing: 3, fill: '#FFFFFF', align: 'center', animation: an('fade', 0.8, 0.3) }),
          st('⚡', { x: 90, y: 180, width: 180, height: 180, fontSize: 140, animation: pop(0.9, 'hat') }),
          st('⚡', { x: 810, y: 1500, width: 180, height: 180, fontSize: 140, animation: pop(1.05, 'hat') }),
        ],
      },
      {
        id: 'p2',
        transition: slide(),
        background: { type: 'solid', color: '#111111' },
        elements: [
          tx({ x: 60, y: 200, width: 960, height: 110, text: 'UP TO', fontFamily: 'Bebas Neue', fontSize: 120, fill: '#FFFFFF', align: 'center', animation: up(0) }),
          tx({ x: 60, y: 320, width: 960, height: 340, text: '60%', fontFamily: 'Bebas Neue', fontSize: 400, fill: '#EF4444', align: 'center', animation: pop(0.3, 'impact-hit') }),
          tx({ x: 60, y: 680, width: 960, height: 110, text: 'OFF EVERYTHING', fontFamily: 'Bebas Neue', fontSize: 120, fill: '#FFFFFF', align: 'center', animation: up(0.6) }),
          ...['Sneakers', 'Hoodies', 'Accessories'].flatMap((t, i) => [
            sh('rect', { x: 120, y: 920 + i * 190, width: 840, height: 140, fill: '#1F1F1F', stroke: '#EF4444', strokeWidth: 3, cornerRadius: 70, animation: an('pan', 0.9 + i * 0.2, 0.5, { direction: 'left' }) }),
            tx({ x: 120, y: 960 + i * 190, width: 840, height: 60, text: t.toUpperCase(), fontFamily: 'Space Grotesk', bold: true, fontSize: 40, letterSpacing: 6, fill: '#FFFFFF', align: 'center', animation: an('fade', 1.1 + i * 0.2, 0.3) }),
          ]),
          tx({ x: 60, y: 1560, width: 960, height: 50, text: 'WHILE STOCKS LAST', fontFamily: 'Space Grotesk', bold: true, fontSize: 30, letterSpacing: 8, fill: '#EF4444', align: 'center', animation: breathe(1.6) }),
        ],
      },
      {
        id: 'p3',
        transition: morph,
        background: { type: 'solid', color: '#EF4444' },
        elements: [
          tx({ x: 60, y: 360, width: 960, height: 90, text: 'USE CODE', fontFamily: 'Space Grotesk', bold: true, fontSize: 40, letterSpacing: 10, fill: '#111111', align: 'center', animation: an('fade', 0, 0.5) }),
          sh('rect', { x: 140, y: 480, width: 800, height: 240, fill: '#FFFFFF', cornerRadius: 30, animation: an('zoom', 0.2, 0.5) }),
          tx({ x: 140, y: 530, width: 800, height: 140, text: 'FLASH60', fontFamily: 'Bebas Neue', fontSize: 170, letterSpacing: 10, fill: '#111111', align: 'center', animation: pop(0.4, 'camera') }),
          tx({ x: 60, y: 800, width: 960, height: 60, text: 'at checkout · no minimum spend', fontFamily: 'Inter', fontSize: 34, fill: '#111111', align: 'center', animation: up(0.7) }),
          ...cta(1180, 'SHOP THE SALE', '#111111', '#FFFFFF', 1.0, 'Space Grotesk'),
          tx({ x: 60, y: 1360, width: 960, height: 50, text: 'yourstore.com', fontFamily: 'Space Grotesk', bold: true, fontSize: 32, letterSpacing: 4, fill: '#111111', align: 'center', animation: an('fade', 1.4, 0.5) }),
        ],
      },
    ],
  },

  // 6 ── Fashion edit · editorial black & white, one red accent
  {
    slug: 'fashion-edit-reel',
    name: 'Fashion Edit Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#DC2626',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#F4F4F2' },
        elements: [
          ...photoSlot(0, 0, 1080, 1250, '#1A1A1A', 'CAMPAIGN PHOTO', 0, 0),
          sh('rect', { x: 0, y: 1250, width: 1080, height: 670, fill: '#F4F4F2' }),
          tx({ x: 80, y: 1310, width: 920, height: 60, text: 'AW ’26', fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 12, fill: '#DC2626', animation: an('fade', 0.6, 0.5) }),
          tx({ x: 80, y: 1380, width: 920, height: 150, text: 'NEW SEASON', fontFamily: 'Archivo', bold: true, fontSize: 130, letterSpacing: -4, fill: '#1A1A1A', animation: wipe(0.8) }),
          tx({ x: 80, y: 1540, width: 920, height: 150, text: 'NEW RULES', fontFamily: 'Archivo', bold: true, fontSize: 130, letterSpacing: -4, fill: '#1A1A1A', animation: wipe(1.0) }),
          tx({ x: 80, y: 1740, width: 920, height: 50, text: 'The edit drops in 3… 2… 1…', fontFamily: 'Inter', fontSize: 30, fill: '#6B6B6B', animation: an('fade', 1.4, 0.5) }),
        ],
      },
      ...[['01', 'The oversized coat', '€289'], ['02', 'The straight-leg denim', '€129']].map(([n, name, price], i) => ({
        id: `p${i + 2}`,
        transition: slide(),
        background: { type: 'solid' as const, color: i ? '#1A1A1A' : '#F4F4F2' },
        elements: [
          ...photoSlot(80, 200, 920, 1150, i ? '#2E2E2E' : '#D4D4D0', 'LOOK PHOTO', 0, 0.1),
          tx({ x: 80, y: 1400, width: 300, height: 180, text: n, fontFamily: 'Archivo', bold: true, fontSize: 160, letterSpacing: -6, fill: '#DC2626', animation: wipe(0.5) }),
          tx({ x: 380, y: 1420, width: 620, height: 90, text: name, fontFamily: 'Archivo', bold: true, fontSize: 48, fill: i ? '#F4F4F2' : '#1A1A1A', animation: up(0.7) }),
          tx({ x: 380, y: 1510, width: 620, height: 60, text: price, fontFamily: 'DM Mono', fontSize: 36, letterSpacing: 2, fill: i ? '#A3A3A3' : '#6B6B6B', animation: up(0.85) }),
          sh('rect', { x: 80, y: 1640, width: 920, height: 4, fill: '#DC2626', animation: wipe(1.0) }),
          tx({ x: 80, y: 1680, width: 920, height: 50, text: 'TAP TO SHOP THE LOOK', fontFamily: 'DM Mono', fontSize: 26, letterSpacing: 8, fill: i ? '#F4F4F2' : '#1A1A1A', animation: breathe(1.2) }),
        ],
      })),
      {
        id: 'p4',
        transition: fade,
        background: { type: 'solid', color: '#DC2626' },
        elements: [
          tx({ x: 80, y: 500, width: 920, height: 150, text: 'SHOP', fontFamily: 'Archivo', bold: true, fontSize: 180, letterSpacing: -6, fill: '#F4F4F2', align: 'center', animation: wipe(0) }),
          tx({ x: 80, y: 660, width: 920, height: 150, text: 'THE EDIT', fontFamily: 'Archivo', bold: true, fontSize: 180, letterSpacing: -6, fill: '#1A1A1A', align: 'center', animation: wipe(0.2, 'right') }),
          tx({ x: 80, y: 880, width: 920, height: 60, text: 'Free returns · Ships worldwide', fontFamily: 'Inter', fontSize: 32, fill: '#F4F4F2', align: 'center', animation: up(0.6) }),
          ...cta(1180, 'LINK IN BIO', '#1A1A1A', '#F4F4F2', 0.9, 'Archivo'),
        ],
      },
    ],
  },

  // 7 ── App launch · violet gradient, feature cards
  {
    slug: 'app-launch-reel',
    name: 'App Launch Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#7C3AED',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'gradient', from: '#4C1D95', to: '#7C3AED', angle: 160 },
        elements: [
          sh('ellipse', { x: 540, y: -200, width: 900, height: 900, fill: '#A78BFA', opacity: 0.3, animation: breathe(0) }),
          tx({ x: 80, y: 220, width: 920, height: 60, text: 'SAY HELLO TO', fontFamily: 'Space Grotesk', bold: true, fontSize: 32, letterSpacing: 10, fill: '#DDD6FE', align: 'center', animation: an('fade', 0, 0.5) }),
          tx({ x: 80, y: 300, width: 920, height: 160, text: 'Driftly', fontFamily: 'Urbanist', bold: true, fontSize: 150, fill: '#FFFFFF', align: 'center', animation: pop(0.25, 'chime-sparkle') }),
          tx({ x: 120, y: 470, width: 840, height: 110, text: 'Your week, planned while you sleep.', fontFamily: 'Inter', fontSize: 38, lineHeight: 1.35, fill: '#EDE9FE', align: 'center', animation: up(0.5) }),
          sh('rect', { x: 240, y: 680, width: 600, height: 1200, fill: '#1E1B4B', cornerRadius: 80, stroke: '#A78BFA', strokeWidth: 6, animation: up(0.7, 0.8) }),
          ...photoSlot(270, 710, 540, 1140, '#312E81', 'APP SCREENSHOT', 60, 0.9),
        ],
      },
      {
        id: 'p2',
        transition: slide('up'),
        background: { type: 'solid', color: '#0F0A1F' },
        elements: [
          tx({ x: 80, y: 160, width: 920, height: 100, text: 'Three things', fontFamily: 'Urbanist', bold: true, fontSize: 90, fill: '#FFFFFF', animation: wipe(0) }),
          tx({ x: 80, y: 260, width: 920, height: 100, text: 'it does better.', fontFamily: 'Urbanist', bold: true, fontSize: 90, fill: '#A78BFA', animation: wipe(0.2) }),
          ...[['🧠', 'Learns your rhythm', 'No setup. It watches, then plans.'], ['🔔', 'One nudge a day', 'Not forty. One, at the right time.'], ['🔒', 'Private by default', 'On-device. Nothing leaves your phone.']].flatMap(([e, h, b], i) => [
            sh('rect', { x: 80, y: 480 + i * 400, width: 920, height: 340, fill: '#1E1B4B', cornerRadius: 48, animation: an('zoom', 0.4 + i * 0.25, 0.5) }),
            st(e, { x: 120, y: 520 + i * 400, width: 130, height: 130, fontSize: 96, animation: pop(0.6 + i * 0.25, 'toggle') }),
            tx({ x: 280, y: 540 + i * 400, width: 680, height: 70, text: h, fontFamily: 'Urbanist', bold: true, fontSize: 52, fill: '#FFFFFF', animation: an('fade', 0.7 + i * 0.25, 0.4) }),
            tx({ x: 120, y: 690 + i * 400, width: 840, height: 90, text: b, fontFamily: 'Inter', fontSize: 32, lineHeight: 1.4, fill: '#C4B5FD', animation: an('fade', 0.85 + i * 0.25, 0.4) }),
          ]),
        ],
      },
      {
        id: 'p3',
        transition: morph,
        background: { type: 'gradient', from: '#7C3AED', to: '#4C1D95', angle: 20 },
        elements: [
          tx({ x: 80, y: 420, width: 920, height: 220, text: 'Free.\nForever.', fontFamily: 'Urbanist', bold: true, fontSize: 130, lineHeight: 1.0, fill: '#FFFFFF', align: 'center', animation: up(0, 0.8) }),
          tx({ x: 120, y: 690, width: 840, height: 80, text: 'Pro unlocks teams, that’s it.', fontFamily: 'Inter', fontSize: 36, fill: '#EDE9FE', align: 'center', animation: up(0.3) }),
          ...cta(1080, 'DOWNLOAD DRIFTLY', '#FFFFFF', '#4C1D95', 0.7, 'Urbanist'),
          sh('rect', { x: 290, y: 1240, width: 240, height: 76, fill: '#0F0A1F', cornerRadius: 18, animation: pop(1.1) }),
          tx({ x: 290, y: 1262, width: 240, height: 40, text: 'App Store', fontFamily: 'Inter', bold: true, fontSize: 26, fill: '#FFFFFF', align: 'center', animation: an('fade', 1.25, 0.3) }),
          sh('rect', { x: 550, y: 1240, width: 240, height: 76, fill: '#0F0A1F', cornerRadius: 18, animation: pop(1.2) }),
          tx({ x: 550, y: 1262, width: 240, height: 40, text: '▶ Google Play', fontFamily: 'Inter', bold: true, fontSize: 26, fill: '#FFFFFF', align: 'center', animation: an('fade', 1.35, 0.3) }),
          tx({ x: 80, y: 1420, width: 920, height: 50, text: '4.9 ★ · 12k reviews', fontFamily: 'Inter', fontSize: 30, fill: '#DDD6FE', align: 'center', animation: an('fade', 1.5, 0.5) }),
        ],
      },
    ],
  },

  // 8 ── Candle studio · handmade goods, cream & sage
  {
    slug: 'candle-studio-reel',
    name: 'Candle Studio Reel',
    category: 'reel',
    width: W,
    height: H,
    accent: '#6B8F71',
    badge: 'premium',
    pages: [
      {
        id: 'p1',
        background: { type: 'solid', color: '#F3EFE6' },
        elements: [
          sh('ellipse', { x: 190, y: 330, width: 700, height: 700, fill: '#DDE5D8', animation: an('zoom', 0, 1.0) }),
          st('🕯️', { x: 390, y: 450, width: 300, height: 400, fontSize: 260, animation: up(0.3, 0.8) }),
          tx({ x: 80, y: 1110, width: 920, height: 60, text: 'HAND-POURED IN LYON', fontFamily: 'DM Mono', fontSize: 28, letterSpacing: 10, fill: '#6B8F71', align: 'center', animation: an('fade', 0.7, 0.5) }),
          tx({ x: 80, y: 1190, width: 920, height: 240, text: 'Small batches.\nSlow evenings.', fontFamily: 'Playfair Display', fontSize: 96, lineHeight: 1.1, fill: '#2F3A31', align: 'center', animation: up(0.9, 0.8) }),
          tx({ x: 160, y: 1470, width: 760, height: 100, text: 'Soy wax · cotton wick · 50 h burn', fontFamily: 'Inter', fontSize: 32, fill: '#6F7A70', align: 'center', animation: up(1.2) }),
        ],
      },
      {
        id: 'p2',
        transition: fade,
        background: { type: 'solid', color: '#2F3A31' },
        elements: [
          tx({ x: 80, y: 160, width: 920, height: 100, text: 'This season’s', fontFamily: 'Playfair Display', italic: true, fontSize: 80, fill: '#DDE5D8', animation: up(0) }),
          tx({ x: 80, y: 260, width: 920, height: 100, text: 'three scents', fontFamily: 'Playfair Display', bold: true, fontSize: 96, fill: '#F3EFE6', animation: up(0.2) }),
          ...[['Fig & Cedar', 'warm · green · woody', '#9DB59A'], ['Sea Salt', 'clean · mineral · bright', '#B9CBD1'], ['Amber Night', 'smoky · sweet · deep', '#D9B27C']].flatMap(([h, b, c], i) => [
            sh('rect', { x: 80, y: 480 + i * 360, width: 920, height: 300, fill: c, cornerRadius: 48, animation: an('pan', 0.4 + i * 0.25, 0.6, { direction: i % 2 ? 'right' : 'left' }) }),
            tx({ x: 130, y: 540 + i * 360, width: 820, height: 90, text: h, fontFamily: 'Playfair Display', bold: true, fontSize: 68, fill: '#2F3A31', animation: an('fade', 0.7 + i * 0.25, 0.4) }),
            tx({ x: 130, y: 640 + i * 360, width: 820, height: 60, text: b, fontFamily: 'DM Mono', fontSize: 30, letterSpacing: 3, fill: '#2F3A31', animation: an('fade', 0.85 + i * 0.25, 0.4) }),
          ]),
        ],
      },
      {
        id: 'p3',
        transition: morph,
        background: { type: 'gradient', from: '#DDE5D8', to: '#F3EFE6', angle: 160 },
        elements: [
          ...photoSlot(190, 220, 700, 700, '#6B8F71', 'GIFT SET PHOTO', 60, 0),
          tx({ x: 80, y: 1000, width: 920, height: 110, text: 'The Trio Gift Set', fontFamily: 'Playfair Display', bold: true, fontSize: 86, fill: '#2F3A31', align: 'center', animation: up(0.4) }),
          tx({ x: 80, y: 1120, width: 920, height: 60, text: '3 × 180 g · €54 · gift-wrapped free', fontFamily: 'Inter', fontSize: 32, fill: '#6F7A70', align: 'center', animation: up(0.6) }),
          ...cta(1280, 'SHOP THE SET', '#2F3A31', '#F3EFE6', 0.9, 'Playfair Display'),
          tx({ x: 80, y: 1460, width: 920, height: 50, text: 'Orders before 18 Dec arrive for Christmas', fontFamily: 'DM Mono', fontSize: 26, letterSpacing: 1, fill: '#6B8F71', align: 'center', animation: breathe(1.3) }),
        ],
      },
    ],
  },
]
