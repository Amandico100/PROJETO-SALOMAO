import { motion } from 'framer-motion';
import type { VSLSalesScreen as VSLSalesScreenType } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronRight, Play, Quote, Shield, Star } from 'lucide-react';

interface Props {
  screen: VSLSalesScreenType;
}

export function VSLSalesScreen({ screen }: Props) {
  const handleCTA = () => {
    console.log('CTA clicked - redirect to checkout');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            data-testid="text-headline"
          >
            {screen.headline}
          </h1>
          {screen.subtitle && (
            <p className="text-lg text-muted-foreground" data-testid="text-subtitle">
              {screen.subtitle}
            </p>
          )}
        </motion.div>

        {(screen.videoUrl || screen.videoThumbnail) && (
          <motion.div
            className="relative aspect-video rounded-lg overflow-hidden mb-12 bg-muted border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {screen.videoUrl ? (
              <iframe
                src={screen.videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                {screen.videoThumbnail && (
                  <img
                    src={screen.videoThumbnail}
                    alt="Video"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="relative w-16 h-16 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-white ml-1" />
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              O Que Você Vai Receber
            </h3>
            <ul className="space-y-3">
              {screen.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="p-8 text-center relative overflow-visible">
              {screen.pricing.discount && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-4 py-1">
                  {screen.pricing.discount}
                </Badge>
              )}

              <div className="mb-6">
                {screen.pricing.original && (
                  <p className="text-lg text-muted-foreground line-through">
                    {screen.pricing.original}
                  </p>
                )}
                <p className="text-5xl font-bold text-primary" data-testid="text-price">
                  {screen.pricing.current}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pagamento único
                </p>
              </div>

              <Button
                variant="shiny"
                size="lg"
                onClick={handleCTA}
                className="w-full py-5 text-base font-medium gap-2 group"
                data-testid="button-cta"
              >
                {screen.ctaText}
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              {screen.trustBadges && screen.trustBadges.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {screen.trustBadges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {screen.testimonials && screen.testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {screen.testimonials.map((testimonial, index) => (
                <Card key={index} className="p-5">
                  <div className="flex gap-3">
                    <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
                    <div>
                      <p className="text-sm italic text-muted-foreground mb-2">
                        "{testimonial.quote}"
                      </p>
                      <p className="text-sm font-medium">— {testimonial.author}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
