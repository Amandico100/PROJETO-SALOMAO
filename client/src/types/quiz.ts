export interface GlobalSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  logo?: string;
  progressBarColor?: string;
}

export interface BaseScreen {
  id: string;
  nextScreenId?: string;
}

export interface WelcomeScreen extends BaseScreen {
  type: 'welcome';
  headline: string;
  subtitle?: string;
  ctaText: string;
  backgroundImage?: string;
  backgroundGradient?: string;
}

export interface SelectOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  image?: string;
}

export interface MultiSelectScreen extends BaseScreen {
  type: 'multi_select';
  question: string;
  subtitle?: string;
  options: SelectOption[];
  allowMultiple?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

export interface ImageSelectScreen extends BaseScreen {
  type: 'image_select';
  question: string;
  subtitle?: string;
  options: SelectOption[];
  columns?: 2 | 3 | 4;
}

export interface InfoInterstitialScreen extends BaseScreen {
  type: 'info_interstitial';
  icon?: string;
  headline: string;
  body: string;
  ctaText: string;
  fact?: string;
}

export interface LoadingStep {
  id: string;
  label: string;
  duration: number;
}

export interface LoadingCalculatedScreen extends BaseScreen {
  type: 'loading_calculated';
  headline: string;
  steps: LoadingStep[];
  completionText?: string;
}

export interface EmailCaptureScreen extends BaseScreen {
  type: 'email_capture';
  headline: string;
  subtitle?: string;
  benefits?: string[];
  ctaText: string;
  privacyText?: string;
  testimonial?: {
    quote: string;
    author: string;
    avatar?: string;
  };
}

export interface VSLSalesScreen extends BaseScreen {
  type: 'vsl_sales';
  headline: string;
  subtitle?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  benefits: string[];
  pricing: {
    original?: string;
    current: string;
    discount?: string;
  };
  ctaText: string;
  trustBadges?: string[];
  testimonials?: Array<{
    quote: string;
    author: string;
    avatar?: string;
  }>;
}

export type Screen =
  | WelcomeScreen
  | MultiSelectScreen
  | ImageSelectScreen
  | InfoInterstitialScreen
  | LoadingCalculatedScreen
  | EmailCaptureScreen
  | VSLSalesScreen;

export interface LogicRule {
  condition: {
    screenId: string;
    operator: 'equals' | 'contains' | 'not_equals';
    value: string | string[];
  };
  targetScreenId: string;
}

export interface QuizConfig {
  id: string;
  name: string;
  globalSettings: GlobalSettings;
  screens: Screen[];
  logicRules?: LogicRule[];
}
