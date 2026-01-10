import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

interface BodyPart {
  id: string;
  label: string;
  path: string; // SVG Path data
}

// Dados simplificados de um corpo humano (Silhouette)
const bodyParts: BodyPart[] = [
  { id: 'chest', label: 'Peito/Costas', path: 'M 40 20 L 60 20 L 65 45 L 35 45 Z' },
  { id: 'abs', label: 'Abdômen', path: 'M 35 45 L 65 45 L 60 65 L 40 65 Z' },
  { id: 'arms', label: 'Braços', path: 'M 25 25 L 35 25 L 35 50 L 25 50 M 65 25 L 75 25 L 75 50 L 65 50' },
  { id: 'legs', label: 'Pernas', path: 'M 40 65 L 60 65 L 60 95 L 40 95 M 50 65 L 50 95' },
];

export default function InteractiveBodySelector({ onSelect }: { onSelect: (parts: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  const togglePart = (id: string) => {
    const newSelection = selected.includes(id) 
      ? selected.filter(p => p !== id) 
      : [...selected, id];
    setSelected(newSelection);
    onSelect(newSelection);
  };

  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <h3 className="text-white font-bold mb-4">Onde você quer focar?</h3>
      
      <div className="relative h-80 w-full bg-[#1E1E1E] rounded-3xl border border-white/10 p-4 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-2xl">
          {/* Cabeça (Estática) */}
          <circle cx="50" cy="12" r="8" fill="#333" />
          
          {bodyParts.map((part) => {
            const isSelected = selected.includes(part.id);
            return (
              <motion.path
                key={part.id}
                d={part.path}
                onClick={() => togglePart(part.id)}
                initial={{ fill: '#333', scale: 1 }}
                animate={{ 
                  fill: isSelected ? '#3b82f6' : '#333',
                  scale: isSelected ? 1.05 : 1
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity stroke-black stroke-1"
                style={{ transformOrigin: 'center' }}
                whileTap={{ scale: 0.95 }}
              />
            );
          })}
        </svg>

        {/* Labels Flutuantes */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {selected.map(id => (
            <motion.div 
              key={id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md"
            >
              {bodyParts.find(p => p.id === id)?.label}
            </motion.div>
          ))}
        </div>
      </div>
      <p className="text-white/40 text-xs mt-4">Toque nas partes do corpo para selecionar.</p>
    </div>
  );
}