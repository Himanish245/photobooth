"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  rotation: number;
  scale: number;
}

export function PetalAnimation() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 15,
      animationDelay: Math.random() * 5,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-50px]"
          style={{
            left: `${petal.left}vw`,
            animation: `petal-fall ${petal.animationDuration}s linear ${petal.animationDelay}s infinite`,
            transform: `rotate(${petal.rotation}deg) scale(${petal.scale})`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C12 2 4 6 4 12C4 18 12 22 12 22C12 22 20 18 20 12C20 6 12 2 12 2Z"
              fill="#F4C2C2"
              fillOpacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
