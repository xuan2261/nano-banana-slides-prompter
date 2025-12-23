export type ContentInputType = 'text' | 'topic' | 'file' | 'url';

export type SlideStyle =
  | 'professional'
  | 'technical'
  | 'creative'
  | 'infographic'
  | 'educational'
  | 'pixel-art'
  | 'minimalist'
  | 'dark-neon'
  | 'hand-drawn'
  | 'glassmorphism'
  | 'vintage'
  | '3d-isometric'
  | 'watercolor'
  | 'newspaper'
  | 'flat-design'
  | 'gradient-mesh'
  | 'sci-fi-hud'
  | 'deep-ocean'
  | 'dev-console';

export type AspectRatio = '16:9' | '4:3' | '1:1' | '9:16';

export type LayoutStructure = 'visual-heavy' | 'text-heavy' | 'balanced';

export type ColorPalette =
  | 'auto'
  | 'corporate-blue'
  | 'modern-purple'
  | 'nature-green'
  | 'warm-orange'
  | 'elegant-monochrome'
  | 'vibrant-gradient'
  | 'ocean-teal'
  | 'sunset-pink'
  | 'forest-earth'
  | 'royal-gold'
  | 'arctic-frost'
  | 'neon-night';

export interface ContentInput {
  type: ContentInputType;
  text: string;
  topic: string;
  fileContent: string;
  fileName: string;
  url: string;
  urlContent: string;
}

export interface PresentationSettings {
  aspectRatio: AspectRatio;
  slideCount: number;
  colorPalette: ColorPalette;
  layoutStructure: LayoutStructure;
}

export interface SlidePromptConfig {
  content: ContentInput;
  style: SlideStyle;
  settings: PresentationSettings;
}

export type OutputFormat = 'text' | 'json';

export interface ParsedSlide {
  slideNumber: number;
  title: string;
  prompt: string;
}

export interface GeneratedPrompt {
  plainText: string;
  slides: ParsedSlide[];
  jsonFormat: {
    model: string;
    messages: Array<{
      role: 'system' | 'user';
      content: string;
    }>;
  };
}
