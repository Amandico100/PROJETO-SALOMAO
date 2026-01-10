import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Star, Quote, BadgeCheck, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
export interface ReviewData {
  id: string | number;
  name: string;
  text: string;
  rating?: number; // 1 a 5, padrão 5
  timeAgo?: string; // Ex: "2 dias atrás"
  avatarInitials?: string; // Ex: "JP"
}

interface ReviewsCarouselProps {
  title?: string; // Ex: "O que dizem sobre nós"
  overallRating?: number; // Ex: 4.8
  totalReviews?: string; // Ex: "12.4k avaliações"
  reviews: ReviewData[];
  autoPlayInterval?: number;
  colorTheme?: 'gold' | 'blue' | 'green';
  delay?: number;
}

// --- THEME CONFIG ---
const themes = {
  gold: { text: 'text-yellow-400', bg: 'bg-yellow-400', border: 'border-yellow-400/20', glow: 'shadow-yellow-400/20' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-400', border: 'border-blue-400/20', glow: 'shadow-blue-400/20' },
  green: { text: 'text-green-400', bg: 'bg-green-400', border: 'border-green-400/20', glow: 'shadow-green-400/20' },
};

// --- SUB-COMPONENT: STAR RATING ---
const StarRating = ({ rating = 5, colorClass }: { rating?: number, colorClass: string }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "w-3 h-3 sm:w-4 sm:h-4",
          star <= rating ? cn("fill-current", colorClass) : "text-white/10"
        )}
      />
    ))}
  </div>
);

// --- MAIN COMPONENT ---
export default function ReviewsCarousel({
  title = "Resultados Reais",
  overallRating = 4.9,
  totalReviews = "2.4k avaliações",
  reviews,
  autoPlayInterval = 4000,
  colorTheme = 'gold',
  delay = 0
}: ReviewsCarouselProps) {
  
  const theme = themes[colorTheme];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-Play Logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [reviews.length, isPaused, autoPlayInterval]);

  // Drag constraints (Simples swipe visual)
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    } else if (info.offset.x > 50) {
      setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className="w-full max-w-md mx-auto relative overflow-hidden flex flex-col gap-6"
    >
      {/* HEADER: AUTHORITY BADGE */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-white text-lg font-bold">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black text-white tracking-tight">{overallRating}</span>
            <div className="flex flex-col">
              <StarRating rating={Math.round(overallRating)} colorClass={theme.text} />
              <span className="text-[10px] text-white/40 font-medium uppercase tracking-wide">{totalReviews}</span>
            </div>
          </div>
        </div>
        {/* Selo de Garantia Visual */}
        <div className={cn("w-12 h-12 rounded-full border flex items-center justify-center bg-white/5 backdrop-blur-sm", theme.border)}>
           <ShieldCheck className={cn("w-6 h-6", theme.text)} />
        </div>
      </div>

      {/* CAROUSEL AREA */}
      <div 
        className="relative min-h-[180px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full"
          >
            {/* CARD */}
            <div className={cn(
              "h-full w-full p-6 rounded-2xl bg-[#1E1E1E] border border-white/5 shadow-2xl relative flex flex-col justify-between select-none cursor-grab active:cursor-grabbing",
              "hover:border-white/10 transition-colors duration-300"
            )}>
              
              {/* Aspas decorativas */}
              <Quote className={cn("absolute top-4 right-4 w-10 h-10 opacity-10 rotate-180", theme.text)} />
              
              {/* Conteúdo do Review */}
              <div>
                <StarRating rating={reviews[currentIndex].rating || 5} colorClass={theme.text} />
                <p className="mt-3 text-white/90 text-sm leading-relaxed font-light">
                  "{reviews[currentIndex].text}"
                </p>
              </div>

              {/* Footer do Card (Autor) */}
              <div className="flex items-center gap-3 mt-4 border-t border-white/5 pt-4">
                {/* Avatar / Iniciais */}
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black", theme.bg)}>
                  {reviews[currentIndex].avatarInitials || reviews[currentIndex].name.substring(0,2).toUpperCase()}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-xs font-bold">{reviews[currentIndex].name}</span>
                    <BadgeCheck className={cn("w-3 h-3", theme.text)} />
                  </div>
                  {reviews[currentIndex].timeAgo && (
                    <p className="text-[10px] text-white/30">{reviews[currentIndex].timeAgo}</p>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINATION DOTS */}
      <div className="flex justify-center gap-2 mt-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              idx === currentIndex ? cn("w-4 bg-white", theme.glow) : "bg-white/10 hover:bg-white/30"
            )}
          />
        ))}
      </div>

    </motion.div>
  );
}