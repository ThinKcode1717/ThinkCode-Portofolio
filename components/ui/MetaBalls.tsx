'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';

import './MetaBalls.css';

interface MetaBallsProps {
  className?: string;
  color?: string;
  speed?: number;
  enableMouseInteraction?: boolean;
  hoverSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  cursorBallSize?: number;
  cursorBallColor?: string;
  enableTransparency?: boolean;
}

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash31(p: number): [number, number, number] {
  let r: [number, number, number] = [fract(p * 0.1031), fract(p * 0.103), fract(p * 0.0973)];
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v: [number, number, number]): [number, number, number] {
  let p: [number, number, number] = [fract(v[0] * 0.1031), fract(v[1] * 0.103), fract(v[2] * 0.0973)];
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[25];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  float dist2 = dot(d, d);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 25; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    vec3 baseColor = iColor * alpha1 + iCursorColor * alpha2;
    
    // Liquid water depth shading: deep ocean sapphire inside, aquatic cerulean & sheen at edges
    float density = clamp((total - 1.2) * 0.6, 0.0, 1.0);
    vec3 waterDeep = mix(vec3(0.008, 0.243, 0.541), baseColor, 0.7); // #023e8a base
    vec3 waterSheen = vec3(0.282, 0.792, 0.894); // #48cae4 aquatic light
    
    // Dynamic subtle water wave shimmer
    float shimmer = sin(coord.x * 3.0 + coord.y * 3.0 + iTime * 2.0) * 0.06 + 0.06;
    
    cFinal = mix(waterDeep, waterSheen, density * 0.45 + shimmer);
  }
  outColor = vec4(cFinal * f, enableTransparency ? f * 0.85 : 1.0);
}
`;

const MetaBalls: React.FC<MetaBallsProps> = ({
  className = '',
  color = '#0077b6',
  speed = 0.28,
  enableMouseInteraction = true,
  hoverSmoothness = 0.06,
  animationSize = 30,
  ballCount = 12,
  clumpFactor = 1.1,
  cursorBallSize = 6,
  cursorBallColor = '#0096c7',
  enableTransparency = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Optimized DPR scaling for maximum 60fps rendering efficiency
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.25) * 0.85;
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false, powerPreference: 'low-power' });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, {
      left: -1,
      right: 1,
      top: 1,
      bottom: -1,
      near: 0.1,
      far: 10
    });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseHexColor(color);
    const [r2, g2, b2] = parseHexColor(cursorBallColor);

    const maxBalls = 25;
    const metaBallsUniform: Vec3[] = [];
    for (let i = 0; i < maxBalls; i++) {
      metaBallsUniform.push(new Vec3(0, 0, 0));
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: Math.min(ballCount, maxBalls) },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const effectiveBallCount = Math.min(ballCount, maxBalls);
    const ballParams: { st: number; dtFactor: number; baseScale: number; toggle: number; radius: number }[] = [];
    for (let i = 0; i < effectiveBallCount; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const st = h1[0] * (2 * Math.PI);
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2.0);
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });
    }

    const mouseBallPos = { x: 0, y: 0 };
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    function onPointerMove(e: PointerEvent) {
      if (!enableMouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      pointerX = (px / rect.width) * gl.canvas.width;
      pointerY = (1 - py / rect.height) * gl.canvas.height;
    }
    function onPointerEnter() {
      if (!enableMouseInteraction) return;
      pointerInside = true;
    }
    function onPointerLeave() {
      if (!enableMouseInteraction) return;
      pointerInside = false;
    }
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerenter', onPointerEnter, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const startTime = performance.now();
    let animationFrameId: number | null = null;
    let isVisible = true;

    function update(t: number) {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParams[i];
        const dt = elapsed * speed * p.dtFactor;
        const th = p.st + dt;
        const x = Math.cos(th);
        const y = Math.sin(th + dt * p.toggle);
        const posX = x * p.baseScale * clumpFactor;
        const posY = y * p.baseScale * clumpFactor;
        metaBallsUniform[i].set(posX, posY, p.radius);
      }

      let targetX: number, targetY: number;
      if (pointerInside) {
        targetX = pointerX;
        targetY = pointerY;
      } else {
        const cx = gl.canvas.width * 0.5;
        const cy = gl.canvas.height * 0.5;
        const rx = gl.canvas.width * 0.15;
        const ry = gl.canvas.height * 0.15;
        targetX = cx + Math.cos(elapsed * speed) * rx;
        targetY = cy + Math.sin(elapsed * speed) * ry;
      }
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

      renderer.render({ scene, camera });
    }

    // Performance Optimization: IntersectionObserver & Visibility API to pause rendering when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting && !document.hidden;

        if (isVisible && !wasVisible) {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(update);
          }
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        isVisible = false;
      } else if (!document.hidden && container) {
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          isVisible = true;
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(update);
          }
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start initial animation frame
    animationFrameId = requestAnimationFrame(update);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    color,
    cursorBallColor,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    enableTransparency
  ]);

  return <div ref={containerRef} className={`metaballs-container ${className}`} />;
};

export default MetaBalls;
