import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, User, Mail, Phone, 
  CheckCircle2, Lock, Star, Target, TrendingUp 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Componentes
import DonutChart from '../../visual/DonutChart';
import ProjectionLineChart from '../../visual/ProjectionLineChart';
import SocialProofLoader from '../../visual/SocialProofLoader'; // Reutilizando o loader existente

// UTILS
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- TYPES ---
interface ConversionFlowProps {
  niche: string; // "Fitness", "Direito", etc.
  brandName: string; // "João Personal"
  transformationObjective: string; // "Ganhar Massa", "Recuperar Imposto"
  socialProofCount: string; // "8.400"
  onComplete: () => void; // Chama a Sales Page
}

// --- STEPS (Simplificados para o código não ficar gigante, mas seguindo a lógica) ---

// Step 1: Meaning
const StepMeaning = ({ onNext, objective }: any) => (
  <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom">
    <h2 className="text-2xl font-bold text-white">O que alcançar {objective} significa para você?</h2>
    <div className="space-y-3">
      {["Mudança de Vida", "Segurança", "Realização Pessoal", "Provar que sou capaz"].map(opt => (
        <button key={opt} onClick={onNext} className="w-full p-4 bg-[#1E1E1E] rounded-xl text-left hover:bg-white/10 border border-white/5 text-white">
          {opt}
        </button>
      ))}
    </div>
  </div>
);

// Step 2: Past Failure
const StepFailure = ({ onNext }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white">Outros métodos já falharam com você antes?</h2>
    <div className="space-y-3">
      <button onClick={onNext} className="w-full p-4 bg-[#1E1E1E] rounded-xl border border-white/5 text-white font-bold hover:border-red-500">Sim, já tentei e desisti</button>
      <button onClick={onNext} className="w-full p-4 bg-[#1E1E1E] rounded-xl border border-white/5 text-white font-bold hover:border-green-500">Não, é minha primeira vez</button>
    </div>
  </div>
);

// Step 3: Reassurance
const StepReassurance = ({ onNext, brand, count }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
      <ShieldCheck className="w-8 h-8" />
    </div>
    <h2 className="text-2xl font-bold text-white">Não se preocupe.</h2>
    <p className="text-white/70">
      O método <strong>{brand}</strong> foi desenhado para eliminar as falhas do passado.
    </p>
    <div className="bg-[#1E1E1E] p-4 rounded-xl">
      <p className="text-sm text-white/50">Junte-se a</p>
      <p className="text-2xl font-black text-white">{count} Pessoas</p>
      <p className="text-xs text-green-400">que conseguiram resultados reais.</p>
    </div>
    <button onClick={onNext} className="w-full bg-green-600 py-4 rounded-xl text-white font-bold">CONTINUAR</button>
  </div>
);

// Step 6: Visual Projection
const StepProjection = ({ onNext }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white">Você consegue!</h2>
    <p className="text-white/60 text-sm">Veja sua projeção de evolução:</p>
    <ProjectionLineChart 
      data={[
        { label: 'Hoje', value: 10, displayValue: 'Início' },
        { label: '30 Dias', value: 40, displayValue: 'Evolução' },
        { label: '90 Dias', value: 100, displayValue: 'Meta' }
      ]}
      title="Sua Jornada de Sucesso"
    />
    <button onClick={onNext} className="w-full bg-white text-black py-4 rounded-xl font-bold mt-4">PRÓXIMO PASSO</button>
  </div>
);

// Step 7: Identity Match (Donut)
const StepIdentity = ({ onNext, brand }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <h2 className="text-2xl font-bold text-white">Análise Concluída</h2>
    <DonutChart percentage={98} label="Compatibilidade" sublabel="Perfil Ideal" />
    <p className="text-white/70 text-sm mt-4">
      O programa <strong>{brand}</strong> é matematicamente perfeito para o seu perfil atual.
    </p>
    <button onClick={onNext} className="w-full bg-blue-600 py-4 rounded-xl text-white font-bold">VER MEU PLANO</button>
  </div>
);

// Step 11: The Contract (Commitment)
const StepContract = ({ onNext }: any) => (
  <div className="text-center space-y-6 animate-in fade-in">
    <Target className="w-16 h-16 text-red-500 mx-auto" />
    <h2 className="text-2xl font-bold text-white">Última pergunta:</h2>
    <p className="text-white/80 text-lg">
      Você está pronto para assumir o compromisso de iniciar sua transformação <strong>AMANHÃ</strong>?
    </p>
    <div className="space-y-3">
      <button onClick={onNext} className="w-full p-4 bg-green-600 rounded-xl text-white font-bold hover:scale-105 transition-transform">
        SIM, VOU COMEÇAR AMANHÃ
      </button>
      <button className="w-full p-4 bg-transparent border border-white/10 rounded-xl text-white/30 text-sm">
        Não, prefiro continuar como estou
      </button>
    </div>
  </div>
);

// --- MAIN CONTROLLER ---
export default function ConversionFlow(props: ConversionFlowProps) {
  const [step, setStep] = useState(1);
  
  // Inputs de Lead (Estado Local)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const next = () => {
    if (step === 12) { // Último passo
      props.onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <div className="h-screen w-full bg-[#121212] overflow-hidden p-6 flex flex-col justify-center max-w-md mx-auto font-sans">
      <AnimatePresence mode='wait'>
        
        {/* 1. SIGNIFICADO */}
        {step === 1 && <motion.div key="1" exit={{opacity:0, x:-50}}><StepMeaning onNext={next} objective={props.transformationObjective} /></motion.div>}
        
        {/* 2. FALHA PASSADA */}
        {step === 2 && <motion.div key="2" initial={{x:50}} animate={{x:0}} exit={{opacity:0, x:-50}}><StepFailure onNext={next} /></motion.div>}
        
        {/* 3. REASSURANCE (Autoridade) */}
        {step === 3 && <motion.div key="3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><StepReassurance onNext={next} brand={props.brandName} count={props.socialProofCount} /></motion.div>}
        
        {/* 4. CONFIANÇA */}
        {step === 4 && (
          <motion.div key="4" className="text-center space-y-6" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <h2 className="text-2xl font-bold text-white">Você está confiante de que vai conseguir desta vez?</h2>
            <button onClick={next} className="w-full p-4 bg-[#1E1E1E] border border-white/20 rounded-xl text-white font-bold">Estou Otimista</button>
            <button onClick={next} className="w-full p-4 bg-[#1E1E1E] border border-white/20 rounded-xl text-white font-bold">Estou com Medo</button>
          </motion.div>
        )}

        {/* 5. LOADING (Personalização) */}
        {step === 5 && (
          <motion.div key="5" className="h-full">
            <SocialProofLoader 
              onComplete={next} 
              messages={["Personalizando estratégia...", "Ajustando níveis de dificuldade...", "Selecionando melhores ferramentas..."]}
            />
          </motion.div>
        )}

        {/* 6. PROJEÇÃO (Gráfico) */}
        {step === 6 && <motion.div key="6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><StepProjection onNext={next} /></motion.div>}

        {/* 7. IDENTITY (Donut) */}
        {step === 7 && <motion.div key="7" initial={{scale:0.8}} animate={{scale:1}} exit={{opacity:0}}><StepIdentity onNext={next} brand={props.brandName} /></motion.div>}

        {/* 8. NOME */}
        {step === 8 && (
          <motion.div key="8" className="text-center" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <h2 className="text-xl font-bold text-white mb-6">Como devemos te chamar?</h2>
            <input type="text" placeholder="Seu primeiro nome" className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 outline-none focus:border-green-500" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={next} disabled={!name} className="w-full bg-green-600 py-4 rounded-xl text-white font-bold disabled:opacity-50">CONTINUAR</button>
          </motion.div>
        )}

        {/* 9. WHATSAPP */}
        {step === 9 && (
          <motion.div key="9" className="text-center" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <h2 className="text-xl font-bold text-white mb-2">Seu WhatsApp</h2>
            <p className="text-white/50 text-xs mb-6">Para enviar seu acesso e notificações.</p>
            <input type="tel" placeholder="(DD) 99999-9999" className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 outline-none focus:border-green-500" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            <button onClick={next} disabled={!whatsapp} className="w-full bg-green-600 py-4 rounded-xl text-white font-bold disabled:opacity-50">CONTINUAR</button>
          </motion.div>
        )}

        {/* 10. EMAIL (Opcional/Strategic) */}
        {step === 10 && (
          <motion.div key="10" className="text-center" initial={{x:50}} animate={{x:0}} exit={{x:-50}}>
            <div className="flex justify-center mb-4"><Lock className="text-green-500 w-8 h-8" /></div>
            <h2 className="text-xl font-bold text-white mb-2">Onde enviar seu plano?</h2>
            <p className="text-white/50 text-xs mb-6">Enviaremos uma cópia de segurança.</p>
            <input type="email" placeholder="seu@email.com" className="w-full bg-[#1E1E1E] border border-white/20 p-4 rounded-xl text-white mb-4 outline-none focus:border-green-500" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={next} disabled={!email} className="w-full bg-green-600 py-4 rounded-xl text-white font-bold disabled:opacity-50">FINALIZAR CADASTRO</button>
          </motion.div>
        )}

        {/* 11. CONTRATO */}
        {step === 11 && <motion.div key="11" initial={{scale:0.9}} animate={{scale:1}} exit={{opacity:0}}><StepContract onNext={next} /></motion.div>}

        {/* 12. FINAL READY */}
        {step === 12 && (
          <motion.div key="12" className="text-center pt-10" initial={{opacity:0}} animate={{opacity:1}} onAnimationComplete={() => setTimeout(next, 3000)}>
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-black" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">TUDO PRONTO!</h2>
            <p className="text-white/70">Geramos seu plano oficial.</p>
            <p className="text-white/30 text-xs mt-8">Redirecionando para sua oferta...</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}