import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, ShieldCheck, Clock, Star, ArrowRight, 
  ChevronDown, Lock, Trophy, Zap, TrendingUp, X, Gift, Check, Minus 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// COMPONENTES VISUAIS (Certifique-se que existem na pasta visual)
import BeforeAfterSlider from '../../visual/BeforeAfterSlider';
import ScratchCard from '../../visual/ScratchCard';

// UTILS
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- TYPES (O que o Salomão precisa configurar) ---
interface SalesPageProps {
  headline: string; // Ex: "Seque a Barriga em 30 Dias"
  subheadline: string;
  regularPrice: number; // Ex: 297
  discountPrice: number; // Ex: 97
  checkoutUrl: string;
  beforeImage: string; // URL da Imagem
  afterImage: string; // URL da Imagem
  quizSummary: { label: string; value: string }[]; // [{label: "Meta", value: "-10kg"}]
  benefits: string[]; // Lista de ícones
  comparisonData: { feature: string; us: boolean; others: boolean }[]; // Para a Tabela
  testimonials: { name: string; text: string; stars: number; image?: string }[];
  faq: { question: string; answer: string }[];
}

// --- SUB-COMPONENTS ---

// 1. CONFETTI (Efeito de Vitória)
const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 1, x: "50%", y: "50%", scale: 0 }}
        animate={{ opacity: 0, x: `${Math.random()*100}%`, y: `${Math.random()*100}%`, rotate: 360 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={cn("absolute w-2 h-2 rounded-full", ["bg-yellow-400", "bg-red-500", "bg-green-500"][i%3])}
      />
    ))}
  </div>
);

// 2. COMPARISON TABLE (Nós vs Eles)
const ComparisonSection = ({ data }: { data: { feature: string; us: boolean; others: boolean }[] }) => (
  <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden mb-12">
    <div className="grid grid-cols-3 bg-[#222] p-4 text-sm font-bold text-center border-b border-white/10">
      <div className="text-left text-white/50">Benefício</div>
      <div className="text-white/50">Outros</div>
      <div className="text-green-500">NÓS</div>
    </div>
    {data.map((item, i) => (
      <div key={i} className="grid grid-cols-3 p-4 border-b border-white/5 text-sm items-center text-center">
        <div className="text-left text-white font-medium">{item.feature}</div>
        <div className="flex justify-center"><Minus className="w-5 h-5 text-red-500/50" /></div>
        <div className="flex justify-center"><CheckCircle2 className="w-5 h-5 text-green-500" /></div>
      </div>
    ))}
  </div>
);

// --- MAIN PAGE ---
export default function LongVSLSalesPage({ 
  headline, subheadline, regularPrice, discountPrice, checkoutUrl, 
  beforeImage, afterImage, quizSummary, benefits, comparisonData, 
  testimonials, faq 
}: SalesPageProps) {

  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const [showExitIntent, setShowExitIntent] = useState(false);
  
  // Sticky Footer Logic
  const { scrollY } = useScroll();
  const footerY = useTransform(scrollY, [0, 400], [100, 0]);

  // Timer
  useEffect(() => {
    if (!isRevealed) return;
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, [isRevealed]);

  // Exit Intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShowExitIntent(true);
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32">
      
      {/* 1. HERO SECTION (IMPACTO) */}
      <section className="relative pt-8 px-4 pb-12 text-center bg-gradient-to-b from-[#111] to-[#050505]">
        {/* Prova Social Topo */}
        <div className="flex justify-center items-center gap-2 mb-6 opacity-70">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#111]" />)}
          </div>
          <p className="text-xs text-white/60 font-medium">+12.500 Vidas Transformadas</p>
        </div>

        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {headline}
        </h1>
        <p className="text-white/60 text-lg mb-8 px-2 max-w-2xl mx-auto">{subheadline}</p>

        {/* ANTES E DEPOIS (Slider) */}
        <div className="max-w-xl mx-auto mb-10 shadow-2xl rounded-2xl border border-white/10 overflow-hidden">
          <BeforeAfterSlider 
            beforeImage={beforeImage} 
            afterImage={afterImage} 
            overlayText="Arraste para ver a transformação"
          />
        </div>

        {/* RESUMO DO QUIZ (Personalização) */}
        <div className="max-w-sm mx-auto bg-[#1a1a1a] rounded-xl p-5 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
          <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" /> Seu Plano Personalizado
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-left">
            {quizSummary.map((item, i) => (
              <div key={i}>
                <p className="text-[10px] text-white/40 uppercase font-bold">{item.label}</p>
                <p className="text-white font-bold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BENEFÍCIOS (VISUAL STACK) */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">O que você recebe:</h2>
        <div className="space-y-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex gap-4 p-4 bg-[#151515] rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm text-white/90 font-medium flex items-center">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AUTORIDADE & COMPARATIVO */}
      <section className="px-4 py-12 bg-[#111]">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Por que somos diferentes?</h2>
          
          <ComparisonSection data={comparisonData} />

          {/* Logos de Mídia (Fakes para layout) */}
          <p className="text-center text-xs text-white/30 uppercase tracking-widest mb-4">Visto em</p>
          <div className="flex justify-center gap-8 opacity-30 grayscale">
            <div className="font-serif font-bold text-xl">Forbes</div>
            <div className="font-serif font-bold text-xl">Vogue</div>
            <div className="font-serif font-bold text-xl">G1</div>
          </div>
        </div>
      </section>

      {/* 4. DEPOIMENTOS (CARROSSEL) */}
      <section className="px-4 py-12 max-w-xl mx-auto overflow-hidden">
        <h2 className="text-2xl font-bold mb-8 text-center">O que dizem nossos alunos</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-[280px] bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 snap-center">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={cn("w-4 h-4", idx < t.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-700")} />
                ))}
              </div>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                  {t.image ? <img src={t.image} className="w-full h-full rounded-full" /> : t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[10px] text-green-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Compra Verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. A OFERTA (GAMIFICAÇÃO + URGÊNCIA) */}
      <section className="px-4 py-12 bg-gradient-to-b from-[#111] to-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
        
        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1 bg-red-600 rounded-full text-xs font-bold mb-6 animate-pulse">
            OFERTA POR TEMPO LIMITADO
          </div>
          
          <h2 className="text-3xl font-black mb-2">Desbloqueie seu Desconto</h2>
          <p className="text-white/50 text-sm mb-8">Raspe para revelar sua condição exclusiva.</p>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 shadow-2xl relative">
            {isRevealed && <Confetti />}
            
            {!isRevealed ? (
              <div className="h-48 mb-4">
                <ScratchCard 
                  prizeText={`${Math.round((1 - discountPrice/regularPrice)*100)}% OFF`}
                  onReveal={() => setIsRevealed(true)}
                  coverColor="#D97706"
                />
                <p className="text-xs text-white/30 mt-4 animate-pulse">👆 Raspe a área dourada</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                {/* PREÇO REVELADO */}
                <div className="mb-6 p-4 bg-green-900/10 border border-green-500/20 rounded-xl">
                  <p className="text-white/40 text-sm line-through">De R$ {regularPrice}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-green-500 font-bold">Por apenas</span>
                    <span className="text-5xl font-black text-white">R$ {discountPrice}</span>
                  </div>
                  <p className="text-xs text-green-400 mt-2">Economia de R$ {regularPrice - discountPrice}</p>
                </div>

                {/* BOTÃO */}
                <a href={checkoutUrl} className="block w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse mb-4">
                  QUERO MEU PLANO AGORA
                </a>

                {/* TIMER DE URGÊNCIA */}
                <div className="flex items-center justify-center gap-2 text-red-400 font-mono text-sm font-bold bg-red-950/20 py-2 rounded-lg border border-red-500/10">
                  <Clock className="w-4 h-4" />
                  Expira em {formatTime(timeLeft)}
                </div>
              </motion.div>
            )}

            {/* GARANTIA */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-60">
              <ShieldCheck className="w-8 h-8 text-white" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Garantia Blindada</p>
                <p className="text-[10px]">7 dias para testar ou seu dinheiro de volta.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="px-6 py-12 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-6 text-center">Dúvidas Frequentes</h2>
        <div className="space-y-2">
          {faq.map((item, i) => (
            <details key={i} className="group bg-[#151515] rounded-xl overflow-hidden border border-white/5">
              <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-sm text-white/90">
                {item.question}
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-xs text-white/50 leading-relaxed border-t border-white/5 pt-2">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 7. STICKY FOOTER (MOBILE) */}
      <motion.div 
        style={{ y: footerY }}
        className="fixed bottom-0 left-0 w-full p-4 bg-[#0a0a0a]/90 backdrop-blur border-t border-white/10 z-40 md:hidden"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[10px] text-red-400 font-bold uppercase">Oferta expira em {formatTime(timeLeft)}</p>
            <p className="text-lg font-black text-white">R$ {discountPrice}</p>
          </div>
          <a href={checkoutUrl} className={cn("bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center gap-2", !isRevealed && "opacity-50 pointer-events-none")}>
            COMPRAR <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>

      {/* 8. EXIT INTENT POPUP */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1E1E1E] border-2 border-red-600 rounded-3xl p-6 max-w-xs text-center relative"
            >
              <button onClick={() => setShowExitIntent(false)} className="absolute top-3 right-3 text-white/30"><X className="w-5 h-5" /></button>
              <Gift className="w-12 h-12 text-red-500 mx-auto mb-3 animate-bounce" />
              <h3 className="text-xl font-black text-white mb-2">ESPERE!</h3>
              <p className="text-white/60 text-xs mb-4">Você esqueceu de resgatar seu bônus. Se sair agora, ele será perdido.</p>
              <button onClick={() => setShowExitIntent(false)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm">RESGATAR MEU BÔNUS</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}