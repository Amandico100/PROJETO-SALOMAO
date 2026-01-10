import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, User, MessageSquare, CheckCircle2, 
  Scale, Briefcase, FileText, Lock, Landmark 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// COMPONENTES VISUAIS
import ComparisonCard from '../../visual/ComparisonCard';
import SocialProofLoader from '../../visual/SocialProofLoader';
import ChecklistLoader from '../../visual/ChecklistLoader';
import DonutChart from '../../visual/DonutChart';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- TYPES (O que o Salomão configura) ---
interface HighTicketFlowProps {
  expertName: string; // "Jorge Advogados"
  niche: string; // "Direito Tributário"
  problemName: string; // "Recuperar Impostos"
  authorityText: string; // "Já recuperamos R$ 50 Milhões"
  guaranteeText: string; // "Se garantirmos X sem você precisar pagar nada antes..."
  whatsappNumber: string;
  comparisonData: { label: string; valueBad: string; valueGood: string }[];
}

// --- SUB-COMPONENTS (Telas) ---

// 1. SIGNIFICADO (Emotional Anchor)
const StepMeaning = ({ onNext, problem }: any) => (
  <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom">
    <Scale className="w-16 h-16 text-yellow-500 mx-auto" />
    <h2 className="text-2xl font-bold text-white">
      O que resolver "{problem}" significa para você hoje?
    </h2>
    <div className="space-y-3">
      {["Tranquilidade Financeira", "Justiça sendo feita", "Segurança para a Família", "Fim da Dor de Cabeça"].map(opt => (
        <button key={opt} onClick={onNext} className="w-full p-5 bg-[#1E1E1E] rounded-xl text-left hover:bg-white/10 border border-white/5 text-white font-medium transition-colors">
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// 2. A OFERTA IRRECUSÁVEL (Risk Reversal)
const StepOffer = ({ onNext, text }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <ShieldCheck className="w-8 h-8 text-green-500" />
    </div>
    <h2 className="text-2xl font-bold text-white">Uma pergunta sincera:</h2>
    <p className="text-lg text-white/80 leading-relaxed border-l-4 border-green-500 pl-4 text-left bg-white/5 p-4 rounded-r-xl">
      "{text}"
    </p>
    <p className="text-white/60 text-sm">Você aceitaria essa ajuda especializada?</p>
    <div className="space-y-3">
      <button onClick={onNext} className="w-full p-4 bg-green-600 rounded-xl text-white font-bold hover:scale-105 transition-transform shadow-lg">
        SIM, EU ACEITARIA
      </button>
      <button className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white/30 text-sm">
        Não, prefiro arriscar sozinho
      </button>
    </div>
  </div>
);

// 3. REASSURANCE + SOCIAL PROOF
const StepReassurance = ({ onNext, expert, authority }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white">Não se preocupe.</h2>
    <p className="text-white/70 text-lg">
      <strong className="text-yellow-500">{expert}</strong> vai ajudar você a resolver isso definitivamente.
    </p>
    
    <div className="bg-[#1E1E1E] border border-white/10 p-6 rounded-2xl mt-8">
      <Landmark className="w-10 h-10 text-white/20 mx-auto mb-2" />
      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Track Record</p>
      <p className="text-3xl font-black text-white">{authority}</p>
      <p className="text-xs text-green-500 mt-2 flex items-center justify-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Casos Comprovados
      </p>
    </div>

    <button onClick={onNext} className="w-full bg-white text-black py-4 rounded-xl font-bold mt-4">
      CONTINUAR
    </button>
  </div>
);

// 5. PROTOCOLO & ANÁLISE (Labor Illusion)
const StepProtocol = ({ onNext }: any) => (
  <div className="h-full flex flex-col">
    <div className="text-center mb-6">
      <h2 className="text-xl font-bold text-white">Ativando Protocolo de Análise...</h2>
      <p className="text-white/50 text-sm">Verificando viabilidade jurídica/técnica.</p>
    </div>
    <div className="flex-1">
      <ChecklistLoader 
        steps={[
          "Cruzando dados com legislação vigente...",
          "Verificando precedentes de sucesso...",
          "Calculando potencial de resultado...",
          "Gerando relatório de viabilidade..."
        ]}
        onComplete={onNext}
      />
    </div>
  </div>
);

// 11. O "SIM" FINAL (Commitment)
const StepReady = ({ onNext, problem }: any) => (
  <div className="text-center space-y-6 animate-in zoom-in">
    <Briefcase className="w-16 h-16 text-blue-500 mx-auto" />
    <h2 className="text-2xl font-bold text-white">Análise Finalizada.</h2>
    <p className="text-white/80 text-lg">
      Identificamos uma alta probabilidade de êxito no seu caso.
    </p>
    <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
      <p className="text-white font-medium">
        Você está pronto para iniciar o processo de <span className="text-blue-400">{problem}</span> com nossa equipe?
      </p>
    </div>
    <button onClick={onNext} className="w-full p-4 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/50">
      SIM, QUERO RESOLVER
    </button>
    <button className="text-white/30 text-xs underline">Não tenho interesse agora</button>
  </div>
);

// 11.5 LOADING FINAL COM AUTORIDADE (Transition)
const StepAuthorityLoading = ({ onNext, expert, niche }: any) => (
  <div className="text-center h-full flex flex-col justify-center items-center animate-in fade-in">
    <div className="relative mb-8">
        <DonutChart percentage={100} label="Viabilidade" sublabel="Confirmada" color="#3b82f6" />
    </div>
    
    <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-white/10 w-full max-w-sm">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white">IMG</div>
            <div className="text-left">
                <p className="text-white font-bold">{expert}</p>
                <p className="text-xs text-white/50">{niche}</p>
            </div>
        </div>
        <div className="flex gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
        </div>
        <p className="text-white/70 text-sm italic">"Somos implacáveis na defesa dos direitos dos nossos clientes."</p>
    </div>
    
    {/* Auto Advance simulado */}
    {setTimeout(onNext, 4000) && <p className="text-white/30 text-xs mt-8 animate-pulse">Redirecionando para o consultor...</p>}
  </div>
);

// 12. TELA FINAL (CTA WHATSAPP)
const StepFinalCTA = ({ expert, problem, whatsapp, comparisonData }: any) => {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=Olá, finalizei o diagnóstico de ${problem} e gostaria de falar com a equipe do ${expert}.`;

  return (
    <div className="text-center h-full flex flex-col animate-in slide-in-from-bottom duration-700">
      <h2 className="text-2xl font-bold text-white mb-2">{expert}, estamos com você!</h2>
      <p className="text-white/60 text-sm mb-6">Veja a diferença que podemos fazer no seu caso:</p>

      {/* COMPARAÇÃO VISUAL */}
      <div className="mb-8">
        <ComparisonCard 
            titleBad="Sozinho / Outros"
            titleGood="Com Nossa Ajuda"
            items={comparisonData.length > 0 ? comparisonData : [{label: "Resultado", valueBad: "Incerto", valueGood: "Garantido"}]}
        />
      </div>

      <div className="mt-auto pb-8">
        <p className="text-white/80 mb-4 font-medium">Nossos especialistas estão aguardando seu contato.</p>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.4)] animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
          FALAR NO WHATSAPP AGORA
        </a>
      </div>
    </div>
  );
};


// --- MAIN CONTROLLER ---
export default function HighTicketConversionFlow(props: HighTicketFlowProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const next = () => setStep(s => s + 1);

  return (
    <div className="h-screen w-full bg-[#121212] overflow-hidden p-6 flex flex-col justify-center max-w-md mx-auto font-sans">
      <AnimatePresence mode='wait'>
        
        {/* 1. SIGNIFICADO */}
        {step === 1 && <motion.div key="1" exit={{opacity:0}}><StepMeaning onNext={next} problem={props.problemName} /></motion.div>}
        
        {/* 2. A OFERTA (OBJEÇÃO) */}
        {step === 2 && <motion.div key="2" initial={{x:50}} animate={{x:0}} exit={{x:-50}}><StepOffer onNext={next} text={props.guaranteeText} /></motion.div>}
        
        {/* 3. REASSURANCE (AUTORIDADE) */}
        {step === 3 && <motion.div key="3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><StepReassurance onNext={next} expert={props.expertName} authority={props.authorityText} /></motion.div>}
        
        {/* 4. CONFIANÇA */}
        {step === 4 && (
          <motion.div key="4" className="text-center space-y-6" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
             <h2 className="text-2xl font-bold text-white">Você está confiante de que conseguirá resolver isso?</h2>
             <button onClick={next} className="w-full p-4 bg-[#1E1E1E] border border-white/20 rounded-xl text-white font-bold">Muito Confiante</button>
             <button onClick={next} className="w-full p-4 bg-[#1E1E1E] border border-white/20 rounded-xl text-white font-bold">Otimista</button>
             <button onClick={next} className="w-full p-4 bg-[#1E1E1E] border border-white/20 rounded-xl text-white font-bold">Indeciso</button>
          </motion.div>
        )}

        {/* 5. PROTOCOLO (LOADING) */}
        {step === 5 && <motion.div key="5" className="h-full"><StepProtocol onNext={next} /></motion.div>}

        {/* 6. TRANSIÇÃO DE DADOS */}
        {step === 6 && (
            <motion.div key="6" className="text-center space-y-4" initial={{opacity:0}} animate={{opacity:1}}>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Diagnóstico Pré-Aprovado</h2>
                <p className="text-white/60">Para oficializar a análise, precisamos identificar seu processo.</p>
                <button onClick={next} className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4">INICIAR CADASTRO</button>
            </motion.div>
        )}

        {/* 7. NOME */}
        {step === 7 && (
          <motion.div key="7" className="text-center" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <h2 className="text-xl font-bold text-white mb-6">Qual seu nome completo?</h2>
            <input type="text" className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 outline-none focus:border-blue-500" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={next} disabled={!name} className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold disabled:opacity-50">CONTINUAR</button>
          </motion.div>
        )}

        {/* 9. WHATSAPP (PULA EMAIL - Foco em contato direto) */}
        {step === 8 && (
          <motion.div key="8" className="text-center" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <h2 className="text-xl font-bold text-white mb-2">Seu WhatsApp Principal</h2>
            <p className="text-white/50 text-xs mb-6">É por aqui que nosso especialista falará com você.</p>
            <input type="tel" className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 outline-none focus:border-blue-500" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <button onClick={next} disabled={!whatsapp} className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold disabled:opacity-50">SALVAR E CONTINUAR</button>
          </motion.div>
        )}

        {/* 11. PRONTO (COMMITMENT) */}
        {step === 9 && <motion.div key="9" initial={{scale:0.9}} animate={{scale:1}} exit={{opacity:0}}><StepReady onNext={next} problem={props.problemName} /></motion.div>}

        {/* 11.5 LOADING FINAL (AUTORIDADE) */}
        {step === 10 && <motion.div key="10" className="h-full"><StepAuthorityLoading onNext={next} expert={props.expertName} niche={props.niche} /></motion.div>}

        {/* 12. FINAL CTA */}
        {step === 11 && <motion.div key="11" className="h-full"><StepFinalCTA expert={props.expertName} problem={props.problemName} whatsapp={props.whatsappNumber} comparisonData={props.comparisonData} /></motion.div>}

      </AnimatePresence>
    </div>
  );
}