/**
 * ⏰ TimeSlotSelector
 * Seletor de turno para agendamento (Manhã/Tarde/Noite)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeSlot {
    id: string;
    label: string;
    icon: string;
    description: string;
}

const defaultSlots: TimeSlot[] = [
    { id: 'morning', label: 'Manhã', icon: '☀️', description: '08h - 12h' },
    { id: 'afternoon', label: 'Tarde', icon: '🌤️', description: '13h - 18h' },
    { id: 'evening', label: 'Noite', icon: '🌙', description: 'Após 18h' }
];

interface Props {
    title?: string;
    subtitle?: string;
    slots?: TimeSlot[];
    onSelect: (slotId: string) => void;
    selectedSlot?: string;
}

export function TimeSlotSelector({
    title = 'Qual o melhor turno para o Especialista ir até você?',
    subtitle,
    slots = defaultSlots,
    onSelect,
    selectedSlot
}: Props) {
    const [selected, setSelected] = useState<string | null>(selectedSlot || null);

    const handleSelect = (slotId: string) => {
        setSelected(slotId);
        onSelect(slotId);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-gray-400 text-sm">{subtitle}</p>
                )}
            </motion.div>

            {/* Slots */}
            <div className="space-y-3">
                {slots.map((slot, index) => {
                    const isSelected = selected === slot.id;

                    return (
                        <motion.button
                            key={slot.id}
                            className={cn(
                                'w-full p-4 rounded-2xl flex items-center gap-4',
                                'border-2 transition-all duration-300',
                                isSelected
                                    ? 'bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/20'
                                    : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                            )}
                            onClick={() => handleSelect(slot.id)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Ícone */}
                            <div className={cn(
                                'w-14 h-14 rounded-xl flex items-center justify-center text-2xl',
                                isSelected ? 'bg-blue-500/30' : 'bg-white/10'
                            )}>
                                {slot.icon}
                            </div>

                            {/* Texto */}
                            <div className="flex-1 text-left">
                                <p className={cn(
                                    'font-bold text-lg',
                                    isSelected ? 'text-blue-400' : 'text-white'
                                )}>
                                    {slot.label}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {slot.description}
                                </p>
                            </div>

                            {/* Indicador de seleção */}
                            <div className={cn(
                                'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                                isSelected
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-white/30'
                            )}>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-3 h-3 bg-white rounded-full"
                                    />
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
