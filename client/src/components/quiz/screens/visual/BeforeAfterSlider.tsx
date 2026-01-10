import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeftRight, ScanEye } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface BeforeAfterSliderProps {
  beforeImage: string; // URL da imagem do "Problema"
  afterImage: string;  // URL da imagem da "Solução"
  beforeLabel?: string;
  afterLabel?: string;
  overlayText?: string; // Ex: "Arraste para ver a mágica"
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  overlayText
}: BeforeAfterSliderProps) {
  
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); // Posição do slider (começa em 0, vamos ajustar para 50%)

  // Estado inicial no centro (50%)
  useEffect(() => {
    if (containerRef.current) {
      x.set(containerRef.current.offsetWidth / 2);
    }
  }, []);

  const handleDrag = (event: any, info: any) => {
    // A lógica de drag é tratada pelo motion.div
  };

  return (
    <div className="w-full max-w-2xl mx-auto select-none relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      
      {/* Imagem de Fundo (AFTER - A Solução) */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden bg-black"
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 backdrop-blur-md z-10">
          {afterLabel}
        </div>
      </div>

      {/* Imagem Sobreposta (BEFORE - O Problema) - Controlada pelo ClipPath */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ 
          clipPath: useTransform(x, (val) => `inset(0px ${containerRef.current ? containerRef.current.offsetWidth - val : 50}% 0px 0px)`) 
        }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Filtro levemente escuro/desaturado no "Antes" para dramatizar o "Depois" */}
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
        
        <div className="absolute top-4 left-4 bg-black/50 text-white/80 px-3 py-1 rounded-full text-xs font-bold border border-white/10 backdrop-blur-md">
          {beforeLabel}
        </div>
      </motion.div>

      {/* O Manipulador (Handle) */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => setIsResizing(true)}
        onDragEnd={() => setIsResizing(false)}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center hover:bg-blue-400 transition-colors"
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center transform -translate-x-[1px]">
          <ArrowLeftRight className="w-4 h-4 text-black" />
        </div>
      </motion.div>

      {/* Overlay de Instrução (Desaparece ao interagir) */}
      {!isResizing && overlayText && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full backdrop-blur pointer-events-none animate-pulse">
          {overlayText}
        </div>
      )}

    </div>
  );
}