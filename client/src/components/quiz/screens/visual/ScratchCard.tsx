import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScratchCardProps {
  prizeText: string;
  onReveal: () => void;
  coverColor?: string; // hex
}

export default function ScratchCard({ prizeText, onReveal, coverColor = '#CA8A04' }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configura Canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Pinta a capa
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto "Raspe Aqui"
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RASPE AQUI', canvas.width/2, canvas.height/2);

  }, [coverColor]);

  const handleScratch = (e: any) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Verifica quantos pixels transparentes existem
    // (Lógica simplificada: se raspou um pouco, libera tudo para facilitar)
    // Em produção, iterar pixel data. Aqui vamos usar um timer simples de interação.
    if (!isScratching) setIsScratching(true);
  };
  
  // Simulação de "Terminou de raspar" após interação contínua
  useEffect(() => {
    if (isScratching && !isRevealed) {
        const timer = setTimeout(() => {
            setIsRevealed(true);
            onReveal();
            // Limpa o canvas visualmente
            const canvas = canvasRef.current;
            if(canvas) canvas.style.opacity = '0'; 
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [isScratching, isRevealed, onReveal]);

  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-xl border-2 border-dashed border-yellow-600/50 bg-[#1E1E1E]">
      {/* O Prêmio (Fica embaixo) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <Trophy className="w-8 h-8 text-yellow-400 mb-2" />
        <h3 className="text-xl font-black text-white">{prizeText}</h3>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Parabéns!</p>
      </div>

      {/* A Capa (Canvas) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700"
        onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
        onTouchMove={handleScratch}
      />
    </div>
  );
}