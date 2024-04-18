import React, { useRef, useEffect } from 'react';

// Clase Point básica
class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

// Clase Particle simplificada
class Particle {
  constructor(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.time = 0;
    this.duration = 3 + Math.random() * 2;
    this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);
    this.w = 8;
    this.h = 6;
    this.complete = false;
  }

  update(timeStep) {
    if (this.time < this.duration) {
        this.time += timeStep;
        // Una interpolación lineal simple para el movimiento vertical
        let t = this.time / this.duration;
        t = (t * t * (3 - 2 * t)); // Aplique una función ease-in para suavizar el movimiento

        // Calcula la posición actual usando una curva Bezier cúbica
        const cx = 3 * (this.p1.x - this.p0.x);
        const bx = 3 * (this.p2.x - this.p1.x) - cx;
        const ax = this.p3.x - this.p0.x - cx - bx;

        const cy = 3 * (this.p1.y - this.p0.y);
        const by = 3 * (this.p2.y - this.p1.y) - cy;
        const ay = this.p3.y - this.p0.y - cy - by;

        const xt = ax * (t * t * t) + bx * (t * t) + cx * t + this.p0.x;
        const yt = ay * (t * t * t) + by * (t * t) + cy * t + this.p0.y;

        this.p0.x = xt;
        this.p0.y = yt;
    } else {
        this.complete = true;
    }
}


  draw(ctx) {
    if (!this.complete) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.p0.x, this.p0.y, this.w, this.h);
    }
  }
}

const ConfettiCanvas = () => {
  const canvasRef = useRef(null);
  let particles = [];
  const timeStep = 1 / 60;

  const createParticles = (ctx) => {
    particles = []; // Reinicia las partículas cada vez
    for (let i = 0; i < 128; i++) {
      const p0 = new Point(Math.random() * 512, Math.random() * 350);
      const p1 = new Point(Math.random() * 512, Math.random() * 350);
      const p2 = new Point(Math.random() * 512, Math.random() * 350);
      const p3 = new Point(Math.random() * 512, Math.random() * 350);
      particles.push(new Particle(p0, p1, p2, p3));
    }
  };

  const update = () => {
    particles.forEach(particle => particle.update(timeStep));
    particles = particles.filter(particle => !particle.complete);
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, 512, 350);
    particles.forEach(particle => particle.draw(ctx));
  };

  const loop = () => {
    const ctx = canvasRef.current.getContext('2d');
    update();
    draw(ctx);
    if (particles.length) {
      requestAnimationFrame(loop);
    }
  };

  const startAnimation = () => {
    const ctx = canvasRef.current.getContext('2d');
    createParticles(ctx);
    loop();
  };

  useEffect(() => {
    // Esta función de efecto no hace nada al montarse el componente
    // pero React requeriría que limpies después de que el componente se desmonte si fuera necesario
  }, []);

  return (
    <div className='absolute w-full h-full flex items-center justify-center' onClick={startAnimation}>
      <canvas ref={canvasRef} width="512" height="350" />
    </div>
  );
};

export default ConfettiCanvas;
