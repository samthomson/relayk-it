/**
 * Rubik's cube loader — vanilla port of @samthomson/rubix-loader (React).
 * The math, palette pipeline and timings are ported verbatim.
 *
 * Usage: <canvas data-rubix-cube data-size="320" data-colors="#A78BFA,#FBBF24,..."></canvas>
 */

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Palette {
  base: string;
  glow: string;
}

interface ParsedColor {
  r: number;
  g: number;
  b: number;
  baseA: number;
  glowA: number;
}

const FACE_INDICES: readonly (readonly number[])[] = [
  [4, 5, 6, 7],
  [0, 3, 2, 1],
  [1, 2, 6, 5],
  [0, 4, 7, 3],
  [3, 7, 6, 2],
  [0, 1, 5, 4],
];

const COLOR_CYCLE_MS = 1300;

function parseColor(input: string): Rgb | null {
  if (!input) return null;
  const c = input.trim();
  const hex3 = /^#([0-9a-f]{3})$/i.exec(c);
  if (hex3) {
    const h = hex3[1];
    return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16) };
  }
  const hex6 = /^#([0-9a-f]{6})$/i.exec(c);
  if (hex6) {
    const h = hex6[1];
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
  }
  const rgb = /^rgb\(\s*([01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*([01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*([01]?\d?\d|2[0-4]\d|25[0-5])\s*\)$/i.exec(c);
  if (rgb) return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
  return null;
}

const tint = (v: number, factor: number) => Math.max(0, Math.min(255, Math.round(v + (255 - v) * factor)));
const shade = (v: number, factor: number) => Math.max(0, Math.min(255, Math.round(v * factor)));

const DEFAULT_PALETTE: readonly Palette[] = [
  { base: 'rgba(210, 190, 240, 0.8)', glow: 'rgba(210, 190, 240, 0.4)' },
  { base: 'rgba(230, 215, 250, 0.8)', glow: 'rgba(230, 215, 250, 0.4)' },
  { base: 'rgba(195, 180, 235, 0.8)', glow: 'rgba(195, 180, 235, 0.4)' },
  { base: 'rgba(220, 205, 245, 0.8)', glow: 'rgba(220, 205, 245, 0.4)' },
  { base: 'rgba(180, 165, 225, 0.8)', glow: 'rgba(180, 165, 225, 0.4)' },
  { base: 'rgba(235, 225, 255, 0.8)', glow: 'rgba(235, 225, 255, 0.4)' },
  { base: 'rgba(200, 185, 245, 0.8)', glow: 'rgba(200, 185, 245, 0.4)' },
  { base: 'rgba(215, 200, 250, 0.8)', glow: 'rgba(215, 200, 250, 0.4)' },
];

const CUSTOM_COLOR_SOFTEN = 0.33;

function buildPaletteFromColor(input: string): readonly Palette[] {
  const rgb = parseColor(input);
  if (!rgb) return DEFAULT_PALETTE;
  const base = { r: tint(rgb.r, CUSTOM_COLOR_SOFTEN), g: tint(rgb.g, CUSTOM_COLOR_SOFTEN), b: tint(rgb.b, CUSTOM_COLOR_SOFTEN) };
  const factors: ({ t: number; a: number } | { s: number; a: number })[] = [
    { t: 0.02, a: 0.8 },
    { t: 0.16, a: 0.8 },
    { s: 0.82, a: 0.8 },
    { t: 0.28, a: 0.8 },
    { s: 0.9, a: 0.8 },
    { t: 0.4, a: 0.8 },
    { s: 0.74, a: 0.8 },
    { t: 0.52, a: 0.8 },
  ];
  return factors.map((f) => {
    const r = 't' in f ? tint(base.r, f.t) : shade(base.r, f.s);
    const g = 't' in f ? tint(base.g, f.t) : shade(base.g, f.s);
    const b = 't' in f ? tint(base.b, f.t) : shade(base.b, f.s);
    const gr = tint(r, 0.11);
    const gg = tint(g, 0.11);
    const gb = tint(b, 0.11);
    return {
      base: `rgba(${r}, ${g}, ${b}, ${f.a})`,
      glow: `rgba(${gr}, ${gg}, ${gb}, ${f.a * 0.64})`,
    };
  });
}

function parseRgba(value: string): Rgb & { a: number } {
  const m = /rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)/.exec(value);
  if (!m) return { r: 0, g: 0, b: 0, a: 0 };
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: Number(m[4]) };
}

function parsePalette(palette: readonly Palette[]): ParsedColor[] {
  return palette.map((entry) => {
    const base = parseRgba(entry.base);
    const glow = parseRgba(entry.glow);
    return { r: base.r, g: base.g, b: base.b, baseA: base.a, glowA: glow.a };
  });
}

function buildPaletteFromParsed(parsed: readonly ParsedColor[]): Palette[] {
  return parsed.map((entry) => ({
    base: `rgba(${entry.r}, ${entry.g}, ${entry.b}, ${entry.baseA})`,
    glow: `rgba(${entry.r}, ${entry.g}, ${entry.b}, ${entry.glowA})`,
  }));
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

interface Cubelet {
  gridX: number;
  gridY: number;
  gridZ: number;
  faceColors: number[];
}

interface ActiveRotation {
  axis: 'x' | 'y' | 'z';
  layerIndex: number;
  currentAngle: number;
  targetAngle: number;
}

interface Point {
  x: number;
  y: number;
  z: number;
}

interface Face {
  corners: Point[];
  colorIdx: number;
  alpha: number;
  avgZ: number;
}

function mountCube(canvas: HTMLCanvasElement, opts: { size: number; colors: string[] }): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { size, colors } = opts;
  let palette: readonly Palette[] = buildPaletteFromColor(colors[0] ?? '');
  let parsedPalette = parsePalette(palette);
  let paletteTransition: { from: ParsedColor[]; to: ParsedColor[]; progress: number } | null = null;
  let activeRotation: ActiveRotation | null = null;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const cubeSize = size * 0.5;
  const pieceSize = cubeSize / 3;
  const gap = Math.max(0.35, pieceSize * 0.045);

  let globalRotX = -0.6;
  let globalRotY = 0.785;
  let globalRotZ = 0;

  const cubelets: Cubelet[] = [];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 3; z++) {
        if (x === 1 && y === 1 && z === 1) continue;
        cubelets.push({
          gridX: x,
          gridY: y,
          gridZ: z,
          faceColors: [
            Math.floor(Math.random() * palette.length),
            Math.floor(Math.random() * palette.length),
            Math.floor(Math.random() * palette.length),
            Math.floor(Math.random() * palette.length),
            Math.floor(Math.random() * palette.length),
            Math.floor(Math.random() * palette.length),
          ],
        });
      }
    }
  }

  const startRotation = () => {
    const axes = ['x', 'y', 'z'] as const;
    const layers = [0, 1, 2];
    activeRotation = {
      axis: axes[Math.floor(Math.random() * 3)],
      layerIndex: layers[Math.floor(Math.random() * 3)],
      currentAngle: 0,
      targetAngle: Math.PI / 2,
    };
  };

  const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number, rz: number): Point => {
    const y1 = y * Math.cos(rx) - z * Math.sin(rx);
    const z1 = y * Math.sin(rx) + z * Math.cos(rx);
    const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
    const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
    const y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
    return { x: x3, y: y3, z: z2 };
  };

  const project = (x: number, y: number, z: number): Point => ({ x: x + size / 2, y: y + size / 2, z });

  const drawQuad = (corners: Point[], colorIdx: number, alpha: number) => {
    const color = palette[colorIdx % palette.length];
    const tinyMode = pieceSize < 18;
    const centerX = corners.reduce((sum, c) => sum + c.x, 0) / 4;
    const centerY = corners.reduce((sum, c) => sum + c.y, 0) / 4;
    const maxDist = Math.max(...corners.map((c) => Math.sqrt((c.x - centerX) ** 2 + (c.y - centerY) ** 2)));
    const tinyScale = Math.max(0, Math.min(1, (pieceSize - 10) / 40));
    const borderAlphaMultiplier = 0.22 + tinyScale * 0.26;
    const borderWidth = Math.max(0.6, Math.min(2, pieceSize * 0.03));
    const replaceAlpha = (rgba: string, a: number) => rgba.replace(/[\d.]+\)$/, `${a})`);
    const baseColor = replaceAlpha(color.base, alpha);
    const span = maxDist * 1.15;
    const lx = centerX - span * 0.55;
    const ly = centerY - span * 0.55;
    const dx = centerX + span * 0.5;
    const dy = centerY + span * 0.45;
    const gradient = ctx.createLinearGradient(lx, ly, dx, dy);
    const sheenA = alpha * (0.88 + tinyScale * 0.1);
    gradient.addColorStop(0, replaceAlpha(color.glow, sheenA));
    gradient.addColorStop(0.55, replaceAlpha(color.glow, alpha * (0.52 + tinyScale * 0.08)));
    gradient.addColorStop(1, baseColor);
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    ctx.lineTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[2].x, corners[2].y);
    ctx.lineTo(corners[3].x, corners[3].y);
    ctx.closePath();
    ctx.fillStyle = tinyMode ? baseColor : gradient;
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * (tinyMode ? borderAlphaMultiplier * 0.7 : borderAlphaMultiplier)})`;
    ctx.lineWidth = tinyMode ? Math.max(0.45, borderWidth * 0.75) : borderWidth;
    ctx.stroke();
  };

  const drawFrame = (animateMotion: boolean) => {
    ctx.clearRect(0, 0, size, size);

    if (animateMotion) {
      globalRotY += 0.0075;
      globalRotX = -0.6 + Math.sin(globalRotY * 0.35) * 0.22;
      globalRotZ += 0.0022;
      const rot = activeRotation;
      if (rot) {
        rot.currentAngle += 0.12;
        if (rot.currentAngle >= rot.targetAngle) {
          const affected = cubelets.filter((c) => {
            if (rot.axis === 'x') return c.gridX === rot.layerIndex;
            if (rot.axis === 'y') return c.gridY === rot.layerIndex;
            return c.gridZ === rot.layerIndex;
          });
          affected.forEach((cubelet) => {
            const { gridX, gridY, gridZ } = cubelet;
            if (rot.axis === 'x') {
              cubelet.gridY = 2 - gridZ;
              cubelet.gridZ = gridY;
              const [f, b, r, l, t, bo] = cubelet.faceColors;
              cubelet.faceColors = [t, bo, l, r, b, f];
            } else if (rot.axis === 'y') {
              cubelet.gridX = gridZ;
              cubelet.gridZ = 2 - gridX;
              const [f, b, r, l, t, bo] = cubelet.faceColors;
              cubelet.faceColors = [l, r, f, b, t, bo];
            } else {
              cubelet.gridX = 2 - gridY;
              cubelet.gridY = gridX;
              const [f, b, r, l, t, bo] = cubelet.faceColors;
              cubelet.faceColors = [f, b, t, bo, l, r];
            }
          });
          activeRotation = null;
          // Schedule the next layer turn from completion, matching the original
          // loader (never per-frame — stale timers reset mid-rotation and snap).
          rotationTimeout = window.setTimeout(startRotation, 267);
        }
      }
    }

    if (paletteTransition) {
      const transition = paletteTransition;
      transition.progress = Math.min(1, transition.progress + 0.035);
      const blended = transition.from.map((fromColor, index) => {
        const toColor = transition.to[index];
        return {
          r: Math.round(lerp(fromColor.r, toColor.r, transition.progress)),
          g: Math.round(lerp(fromColor.g, toColor.g, transition.progress)),
          b: Math.round(lerp(fromColor.b, toColor.b, transition.progress)),
          baseA: lerp(fromColor.baseA, toColor.baseA, transition.progress),
          glowA: lerp(fromColor.glowA, toColor.glowA, transition.progress),
        };
      });
      parsedPalette = blended;
      palette = buildPaletteFromParsed(blended);
      if (transition.progress >= 1) paletteTransition = null;
    }

    const faces: Face[] = [];
    cubelets.forEach((cubelet) => {
      const { gridX, gridY, gridZ, faceColors } = cubelet;
      const baseX = (gridX - 1) * (pieceSize + gap);
      const baseY = (gridY - 1) * (pieceSize + gap);
      const baseZ = (gridZ - 1) * (pieceSize + gap);
      const half = pieceSize / 2;
      const corners3d: Point[] = [
        { x: baseX - half, y: baseY - half, z: baseZ - half },
        { x: baseX + half, y: baseY - half, z: baseZ - half },
        { x: baseX + half, y: baseY + half, z: baseZ - half },
        { x: baseX - half, y: baseY + half, z: baseZ - half },
        { x: baseX - half, y: baseY - half, z: baseZ + half },
        { x: baseX + half, y: baseY - half, z: baseZ + half },
        { x: baseX + half, y: baseY + half, z: baseZ + half },
        { x: baseX - half, y: baseY + half, z: baseZ + half },
      ];

      let layerRotX = 0;
      let layerRotY = 0;
      let layerRotZ = 0;
      if (activeRotation) {
        let isInLayer = false;
        if (activeRotation.axis === 'x' && gridX === activeRotation.layerIndex) {
          isInLayer = true;
          layerRotX = activeRotation.currentAngle;
        } else if (activeRotation.axis === 'y' && gridY === activeRotation.layerIndex) {
          isInLayer = true;
          layerRotY = activeRotation.currentAngle;
        } else if (activeRotation.axis === 'z' && gridZ === activeRotation.layerIndex) {
          isInLayer = true;
          layerRotZ = activeRotation.currentAngle;
        }
        if (isInLayer) {
          for (let i = 0; i < corners3d.length; i++) {
            const c = corners3d[i];
            corners3d[i] = rotatePoint(c.x, c.y, c.z, layerRotX, layerRotY, layerRotZ);
          }
        }
      }

      const rotatedCorners = corners3d.map((c) => rotatePoint(c.x, c.y, c.z, globalRotX, globalRotY, globalRotZ));
      const projected = rotatedCorners.map((c) => project(c.x, c.y, c.z));
      FACE_INDICES.forEach((indices, faceIdx) => {
        const faceCorners = indices.map((i) => projected[i]);
        const v1x = faceCorners[1].x - faceCorners[0].x;
        const v1y = faceCorners[1].y - faceCorners[0].y;
        const v2x = faceCorners[2].x - faceCorners[0].x;
        const v2y = faceCorners[2].y - faceCorners[0].y;
        const cross = v1x * v2y - v1y * v2x;
        if (cross > 0) {
          const avgZ = faceCorners.reduce((sum, c) => sum + c.z, 0) / 4;
          const alpha = Math.max(0.62, Math.min(1, 1 - avgZ / 640));
          faces.push({ corners: faceCorners, colorIdx: faceColors[faceIdx], alpha, avgZ });
        }
      });
    });

    faces.sort((a, b) => a.avgZ - b.avgZ);
    faces.forEach((face) => drawQuad(face.corners, face.colorIdx, face.alpha));
  };

  const validColors = colors.filter((v) => v.trim().length > 0);
  const cycleColors = validColors.length > 1;
  let cycleIndex = 0;
  const cycleInterval: number | undefined = cycleColors
    ? window.setInterval(() => {
        cycleIndex = (cycleIndex + 1) % validColors.length;
        paletteTransition = { from: parsedPalette, to: parsePalette(buildPaletteFromColor(validColors[cycleIndex])), progress: 0 };
      }, COLOR_CYCLE_MS)
    : undefined;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let animationFrame = 0;
  let rotationTimeout: number | undefined;

  if (reducedMotion) {
    drawFrame(false);
  } else {
    const animate = () => {
      drawFrame(true);
      animationFrame = requestAnimationFrame(animate);
    };
    rotationTimeout = window.setTimeout(startRotation, 500);
    animate();
  }

  const disconnect = () => {
    cancelAnimationFrame(animationFrame);
    clearTimeout(rotationTimeout);
    clearInterval(cycleInterval);
  };
  window.addEventListener('pagehide', disconnect, { once: true });
}

function init(): void {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas[data-rubix-cube]');
  canvases.forEach((canvas) => {
    const size = Number(canvas.dataset['size'] ?? '320');
    const colors = (canvas.dataset['colors'] ?? '').split(',').map((c) => c.trim()).filter(Boolean);
    mountCube(canvas, { size, colors });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export {};
