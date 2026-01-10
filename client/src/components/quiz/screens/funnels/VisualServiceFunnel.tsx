import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Gift, Trophy, ArrowRight, Lock, 
  Store, Phone, Timer, Sparkles, Users, 
  CheckCircle2, TrendingUp, Star, Heart 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// COMPONENTES VISUAIS OBRIGATÓRIOS (Certifique-se que estão na pasta visual)
import BeforeAfterSlider from '../../visual/BeforeAfterSlider';
import ScratchCard from '../../visual/ScratchCard';
import SocialProofLoader from '../../visual/SocialProofLoader';

// UTILS
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- TYPES (O que o Salomão configura) ---
interface VisualServiceProps {
  businessName: string; // Ex: "Clínica Royal Face"
  city: string; // Ex: "São Paulo"
  offerTitle: string; // Ex: "Harmonização Facial"
  heroImageBefore: string; 
  heroImageAfter: string;
  transformationText: string; // Ex: "Rejuvenesça até 10 anos em 1 sessão"
  socialProofText: string; // Ex: "Mais de 2.000 sorrisos transformados"
  bonusTitle: string; // Ex: "Avaliação 3D Gratuita"
  whatsappNumber: string;
}

// --- SUB-COMPONENTS (TELAS DO ZING ADAPTADAS) ---

// TELA 1: O SIGNIFICADO (Emotional Anchor)
const StepMeaning = ({ onNext, offer }: any) => (
  <div className="flex flex-col h-full text-center animate-in fade-in p-6 justify-center">
    <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse-slow" />
    <h2 className="text-2xl font-bold text-white mb-6">
      O que ter um resultado perfeito com {offer} significa para você?
    </h2>
    <div className="space-y-3 w-full max-w-sm mx-auto">
      {["Melhorar minha Autoestima", "Parecer mais Jovem/Disposto", "Confiança Profissional", "Me sentir bem nas fotos"].map(opt => (
        <button key={opt} onClick={onNext} className="w-full p-5 bg-[#1E1E1E] rounded-xl text-left hover:bg-white/10 border border-white/5 text-white font-medium transition-all hover:pl-6">
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// TELA 2: A VALIDAÇÃO (Past Failure)
const StepHistory = ({ onNext }: any) => (
  <div className="flex flex-col h-full text-center animate-in fade-in p-6 justify-center">
    <h2 className="text-2xl font-bold text-white mb-6">
      Você já realizou algum tratamento antes e não ficou 100% satisfeito?
    </h2>
    <div className="space-y-3 w-full max-w-sm mx-auto">
      <button onClick={onNext} className="w-full p-5 bg-[#1E1E1E] border border-white/10 rounded-xl text-white font-bold hover:border-red-500 transition-colors">
        Sim, já me decepcionei
      </button>
      <button onClick={onNext} className="w-full p-5 bg-[#1E1E1E] border border-white/10 rounded-xl text-white font-bold hover:border-green-500 transition-colors">
        Não, é minha primeira vez
      </button>
    </div>
  </div>
);

// TELA 3: ESPERANÇA (Reassurance)
const StepReassurance = ({ onNext, business, text }: any) => (
  <div className="flex flex-col h-full text-center animate-in fade-in p-6 justify-center">
    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <ShieldCheck className="w-8 h-8 text-blue-400" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-4">Fique tranquilo(a).</h2>
    <p className="text-white/70 text-lg leading-relaxed mb-8">
      O protocolo exclusivo da <strong>{business}</strong> foi desenhado para entregar resultados naturais.
      <br/><br/>
      <span className="text-sm text-blue-400 font-bold">{text}</span>
    </p>
    <button onClick={onNext} className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-lg">
      CONTINUAR
    </button>
  </div>
);

// TELA 5: O VEREDITO (Diagnosis)
const StepDiagnosis = ({ onNext, city, offer }: any) => (
  <div className="flex flex-col h-full text-center animate-in zoom-in p-6 justify-center">
    <div className="inline-flex mx-auto items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold mb-8 uppercase tracking-widest">
      <MapPin className="w-3 h-3" /> Unidade {city}
    </div>
    
    <h2 className="text-3xl font-black text-white mb-2">Perfil Compatível</h2>
    <p className="text-white/60 mb-8">Sua anatomia é ideal para o {offer}.</p>

    <div className="w-full max-w-sm mx-auto bg-[#1E1E1E] rounded-2xl p-6 border border-white/10 flex items-center gap-4 shadow-2xl mb-8">
       <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
       </div>
       <div className="text-left">
          <p className="text-xs text-white/50 uppercase font-bold">Status</p>
          <p className="text-xl font-bold text-white">Pré-Aprovado</p>
       </div>
    </div>

    <button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg">
      VER SIMULAÇÃO DE RESULTADO
    </button>
  </div>
);

// TELA 6: A PROVA VISUAL (Antes/Depois - O CLÍMAX)
const StepVisualProof = ({ onNext, before, after, text }: any) => (
  <div className="flex flex-col h-full text-center animate-in slide-in-from-right p-6 justify-center">
    <h2 className="text-2xl font-bold text-white mb-2">Imagine este resultado...</h2>
    <p className="text-white/60 text-sm mb-6 max-w-xs mx-auto italic">
      "{text}"
    </p>

    <div className="w-full shadow-2xl rounded-2xl overflow-hidden border border-white/20 mb-6 bg-black">
      <BeforeAfterSlider 
        beforeImage={before}
        afterImage={after}
        beforeLabel="Antes"
        afterLabel="Depois"
        overlayText="Arraste para comparar"
      />
    </div>

    <button onClick={onNext} className="w-full bg-white text-black font-bold py-4 rounded-xl mt-2 animate-pulse">
      EU QUERO ESSE RESULTADO
    </button>
  </div>
);

// TELA 7: CAPTURA (Lead Gate)
const StepLead = ({ onNext }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  return (
    <div className="flex flex-col h-full text-center animate-in fade-in p-6 justify-center">
      <Lock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Salve sua Análise</h2>
      <p className="text-white/60 text-sm mb-8">
        Para verificar se há bônus disponíveis para seu perfil, precisamos identificar você.
      </p>

      <input 
        type="text" placeholder="Seu Nome" value={name} onChange={e => setName(e.target.value)}
        className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 focus:border-yellow-500 outline-none"
      />
      <input 
        type="tel" placeholder="Seu WhatsApp" value={phone} onChange={e => setPhone(e.target.value)}
        className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-6 focus:border-yellow-500 outline-none"
      />

      <button onClick={onNext} disabled={!name || !phone} className="w-full bg-blue-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl">
        VERIFICAR BÔNUS
      </button>
    </div>
  );
};

// TELA 8: O CONTRATO (Hard Commitment)
const StepCommitment = ({ onNext }: any) => (
  <div className="flex flex-col h-full text-center animate-in zoom-in p-6 justify-center">
    <Store className="w-16 h-16 text-white/20 mx-auto mb-6" />
    <h2 className="text-2xl font-bold text-white mb-4">Política de Agendamento</h2>
    <p className="text-white/70 text-lg mb-8 leading-relaxed">
      Nossos especialistas têm agenda cheia. Se liberarmos um horário VIP para você, 
      <strong className="text-white"> você promete comparecer?</strong>
    </p>
    
    <div className="space-y-3 w-full">
      <button onClick={onNext} className="w-full p-4 bg-green-600 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform">
        SIM, EU ME COMPROMETO
      </button>
      <button className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white/30 text-sm">
        Não posso garantir
      </button>
    </div>
  </div>
);

// TELA 9: A RECOMPENSA (Gamification)
const StepReward = ({ onNext, bonus }: any) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col h-full text-center animate-in fade-in p-6 bg-gradient-to-b from-[#151515] to-black justify-center">
        <h2 className="text-2xl font-bold text-white mb-2">Parabéns!</h2>
        <p className="text-white/60 text-sm mb-8">Você desbloqueou um benefício exclusivo.</p>

        <div className="w-full max-w-sm h-64 relative mb-6 mx-auto">
            {!revealed ? (
                <ScratchCard 
                    prizeText={bonus}
                    onReveal={() => { setRevealed(true); setTimeout(onNext, 2500); }}
                    coverColor="#D97706"
                />
            ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center border-2 border-yellow-500 rounded-xl bg-yellow-900/10 p-4">
                    <Trophy className="w-12 h-12 text-yellow-400 mb-2" />
                    <h3 className="text-2xl font-black text-white">{bonus}</h3>
                    <p className="text-xs text-yellow-500 uppercase font-bold mt-2">Bônus Ativado</p>
                </motion.div>
            )}
        </div>
        {!revealed && <p className="text-white/30 text-xs animate-pulse">👆 Raspe para ver seu presente</p>}
    </div>
  );
};

// TELA 10 & 11: TIME BOMB + VOUCHER FINAL
const StepFinalVoucher = ({ props }: { props: VisualServiceProps }) => {
  const [timeLeft, setTimeLeft] = useState(60); // 60 SEGUNDOS (Pedido do Usuário)
  
  // URL do WhatsApp já com a mensagem de urgência
  const whatsappUrl = `https://wa.me/${props.whatsappNumber}?text=Olá! Acabei de ganhar o bônus "${props.bonusTitle}" no quiz e quero agendar antes que expire.`;

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) => `00:${s.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full text-center animate-in zoom-in p-6 bg-black relative justify-center">
       {/* Confetes explodem aqui (CSS animation) */}
       
       <div className="flex-1 flex flex-col justify-center items-center w-full mt-4">
          <Sparkles className="w-12 h-12 text-yellow-400 mb-4 animate-spin-slow" />
          <h2 className="text-2xl font-bold text-white mb-2">Voucher Reservado!</h2>
          <p className="text-white/60 text-sm mb-6">Confirme sua titularidade antes que o tempo acabe.</p>

          {/* O TIMER AGRESSIVO */}
          <div className="mb-6 bg-red-900/20 border border-red-500 rounded-xl px-6 py-3 flex items-center gap-3 animate-pulse">
            <Timer className="w-6 h-6 text-red-500" />
            <div>
                <p className="text-[10px] text-red-400 font-bold uppercase">Expira em</p>
                <p className="text-3xl font-mono font-black text-white leading-none">{formatTime(timeLeft)}</p>
            </div>
          </div>

          {/* O VOUCHER CARD */}
          <div className="w-full bg-white text-black rounded-xl overflow-hidden shadow-2xl relative max-w-sm mb-8 opacity-90">
              <div className="bg-black p-3 text-white flex justify-between items-center border-b border-gray-800">
                  <span className="font-bold text-xs">{props.businessName}</span>
                  <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">PENDENTE</span>
              </div>
              <div className="p-4 border-b-2 border-dashed border-gray-300">
                  <h3 className="text-xl font-black text-gray-900">{props.bonusTitle}</h3>
              </div>
          </div>

          <a 
            href={whatsappUrl}
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 animate-bounce-slow"
          >
            <Phone className="w-6 h-6" />
            RESGATAR AGORA
          </a>
          <p className="text-[10px] text-white/30 mt-4">Ao clicar, você garante sua condição especial.</p>
       </div>
    </div>
  );
};


// --- MAIN CONTROLLER ---
export default function VisualServiceFunnel(props: VisualServiceProps) {
  const [step, setStep] = useState(1);
  const next = () => setStep(s => s + 1);

  return (
    <div className="h-screen w-full bg-[#121212] overflow-hidden font-sans">
      <AnimatePresence mode='wait'>
        {step === 1 && <motion.div key="1" className="h-full" exit={{ opacity: 0 }}><StepMeaning onNext={next} offer={props.offerTitle} /></motion.div>}
        {step === 2 && <motion.div key="2" className="h-full" exit={{ opacity: 0, x: -50 }}><StepHistory onNext={next} /></motion.div>}
        {step === 3 && <motion.div key="3" className="h-full" exit={{ opacity: 0, x: -50 }}><StepReassurance onNext={next} business={props.businessName} text={props.socialProofText} /></motion.div>}
        
        {step === 4 && (
            <motion.div key="4" className="h-full">
               <SocialProofLoader onComplete={next} messages={["Analisando simetria...", "Buscando casos similares...", "Verificando agenda..."]} />
            </motion.div>
        )}

        {step === 5 && <motion.div key="5" className="h-full" exit={{ opacity: 0 }}><StepDiagnosis onNext={next} city={props.city} offer={props.offerTitle} /></motion.div>}
        {step === 6 && <motion.div key="6" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><StepVisualProof onNext={next} before={props.heroImageBefore} after={props.heroImageAfter} text={props.transformationText} /></motion.div>}
        {step === 7 && <motion.div key="7" className="h-full" exit={{ opacity: 0 }}><StepLead onNext={next} /></motion.div>}
        {step === 8 && <motion.div key="8" className="h-full" exit={{ opacity: 0 }}><StepCommitment onNext={next} /></motion.div>}
        {step === 9 && <motion.div key="9" className="h-full" exit={{ opacity: 0 }}><StepReward onNext={next} bonus={props.bonusTitle} /></motion.div>}
        {step >= 10 && <motion.div key="10" className="h-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><StepFinalVoucher props={props} /></motion.div>}
      </AnimatePresence>
    </div>
  );
}