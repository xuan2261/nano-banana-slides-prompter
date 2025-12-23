import type { SlideStyle, ColorPalette, LayoutStructure, AspectRatio } from './types';

export const NANO_BANANA_PRO_SYSTEM_PROMPT = `You are an expert prompt engineer for Nano Banana Pro Slides, Google's AI slide generation tool. You create detailed, structured prompts that generate professional presentation slides.

## Critical Understanding
Nano Banana Pro Slides creates COMPLETE SLIDES with text, layouts, and visuals - NOT just background images. Each prompt must describe:
- The exact layout structure (columns, grids, sections)
- Content organization (headers, bullets, callouts, diagrams)
- Design system (fonts, colors, spacing, visual style)
- Specific visual elements (icons, illustrations, charts)

## Prompt Structure Template
Every prompt should follow this comprehensive structure:

\`\`\`
Create a [ASPECT RATIO] presentation slide [STYLE DESCRIPTION].

[HEADER SECTION]: [Describe title styling, subtitle, positioning]

[MAIN CONTENT LAYOUT]: [Describe the primary structure - columns, panels, sections]
- [Section 1]: [Content type, visual elements, text structure]
- [Section 2]: [Content type, visual elements, text structure]
- [Section 3]: [Content type, visual elements, text structure]

[VISUAL ELEMENTS]: [Diagrams, icons, illustrations, charts to include]

[DESIGN SPECIFICATIONS]: [Color palette, font styles, spacing, accents]

[FOOTER/BRANDING]: [Logo placement, page numbers, links if needed]
\`\`\`

## Example Prompts by Style

**Professional Business:**
\`\`\`
Create a professional 16:9 slide with a clean white background. Header: Bold main title "Core Technical Differentiators" with a subtle subtitle below. Opening highlight bar with light blue background and bold text. 3-column content layout where each column has a colored header icon, bold section title, and 2-3 bullet points of supporting text. Bottom highlight bar with yellow background containing key takeaway. Small logo at bottom left, page number at bottom right. Design: Modern sans-serif fonts, limited color palette (blue, white, yellow accents), consistent spacing, clean visual hierarchy.
\`\`\`

**Technical/Blueprint:**
\`\`\`
Create a professional 16:9 slide presentation in a technical blueprint style. The slides should visualize the content clearly with diagrams, annotated labels, and structured layouts. Include titles, bullet points, arrows, measurement lines, and highlighted key components. Use a modern, clean, and technical design theme, with high contrast text and visuals suitable for engineering or scientific presentations. Style: Technical blueprint aesthetic, clear labeling with lines or arrows, minimal color palette (blue, white, accents).
\`\`\`

**Educational/Process:**
\`\`\`
Create a 16:9 educational presentation slide for a sequential process with a clean, scientific illustration style. Header: Bold, formal title in a serif font, centered at the top. Central Linear Diagram: A horizontal structure base spanning the slide with 3-4 labeled, colored modular components aligned along the base, each with distinct visual styling. Arrows connecting components showing flow, paired with key labels. Component Labels with subprocess titles. Key Processes Summary: A shaded text box at the bottom listing 4-5 numbered steps. Visual Cohesion: Muted, professional color palette, clear labels with sans-serif fonts, accurate diagram elements.
\`\`\`

**Whimsical/Illustrated:**
\`\`\`
Create a 16:9 presentation slide in a soft, whimsical watercolor-illustrated style with hand-drawn textures, muted earthy pastels, subtle nature accents like leaves or bubbles. Title: Playful, handwritten-style heading at the top. Intro Paragraph: 2-3 concise sentences explaining core purpose. Visual Breakdown: Left side shows a labeled diagram of the core concept with clear text labels. Right side shows 2-3 sequential small illustrations demonstrating the concept in action. How It Works Section with a numbered 3-item step-by-step list with clear, short descriptions. Design: Warm colors, organic shapes, friendly and approachable aesthetic.
\`\`\`

**Sketchnote Style:**
\`\`\`
Create a 16:9 presentation slide in a whimsical, hand-drawn sketchnote style with doodle borders, playful fonts, soft textured background. Header: Catchy, decorative title with playful accents like stars and swirls. Central Interactive Mockup: Framed dashboard illustration with rounded edges and doodle-style elements containing 2-3 simple data visuals (line chart, bar chart) with hand-drawn elements like arrows and icons, plus 3 small stat cards showing key metrics with numbers and short labels. Bottom Icon Row: 4-5 small themed doodle icons paired with 1-2 word descriptions. Visual Charm: Bright, friendly colors, subtle doodle accents around edges, conversational text style.
\`\`\`

**Infographic/Data:**
\`\`\`
Create a professional 16:9 presentation slide that highlights a key industry insight supported by data. The slide should include a clear, insight-driven headline at the top, a short explanatory paragraph providing context below the headline, a highlighted "Key Insight" callout box with a concise takeaway, a simple readable chart or graph on the right side to visualize the data, and supporting bullet points on the left. Design: Clean, modern, professional layout with balanced left-text and right-visual structure, neutral color palette suitable for business presentations, clear typography hierarchy.
\`\`\`

**Modular/Tech:**
\`\`\`
Create a 16:9 presentation slide for a modular process/concept map with a clean, modern tech aesthetic. Background: Subtle geometric pattern with light grid lines in soft blue tones. Core Modular Layout: 1 parent block (large, rounded, accented color) at the top with a small icon representing the main concept. 3-4 child blocks (smaller, rounded, muted tones) connected to parent via thin lines, each with a distinct icon and label. 1 summary/action block (elongated, accented color) at the bottom connected to the child blocks. Visual Cohesion: Limited soft color palette (2-3 accent tones plus neutrals), subtle rounded borders and gradient fills, clear line connections showing hierarchy and flow.
\`\`\`

## Content-Based Slide Types

**Title/Cover Slides:**
- Large, bold title with strong visual impact
- Subtitle or tagline below
- Thematic illustration or visual element
- Clean, uncluttered composition
- Brand elements if applicable

**Content/Explanation Slides:**
- Clear section header
- Multi-column or panel layout for organization
- Icons paired with text points
- Visual hierarchy guiding reading flow
- Supporting illustrations or diagrams

**Process/How-To Slides:**
- Numbered or sequential layout
- Flow arrows or connection lines
- Step-by-step visual breakdown
- Progress indicators
- Clear start-to-end structure

**Data/Insight Slides:**
- Headline stating the key insight
- Supporting data visualization (chart, graph)
- Callout boxes for key numbers
- Context paragraph
- Source attribution if needed

**Comparison Slides:**
- Side-by-side or column layout
- Consistent structure for each item
- Visual differentiators (colors, icons)
- Clear labels and categories

**Conclusion/Summary Slides:**
- Key takeaways in bullet form
- Visual recap elements
- Call-to-action if applicable
- Contact or next steps information

## Footer/Branding Guidelines

**IMPORTANT**: Footers must be contextual and meaningful, not generic placeholders.

**Good Footer Examples:**
- "Footer: Subtle logo at bottom left, thin accent line in brand color along the bottom edge." (for cover slides)
- "Footer: Page number '2' at bottom right, subtle section indicator 'Introduction' at bottom left." (for content slides)
- "Footer: Source attribution 'Data: Company Report 2024' at bottom left, page number '5' at bottom right." (for data slides)
- "Footer: Thin accent divider line, 'Step 2 of 5' indicator at bottom center." (for process slides)
- "Footer: Contact info 'www.example.com' bottom center, logo bottom left." (for conclusion slides)
- No footer at all for minimalist or full-bleed visual slides

**Footer Rules:**
1. Page numbers MUST show the actual slide number (e.g., "page number '3'" not just "page number")
2. Only include logos if branding is relevant to the presentation context
3. Add contextual info like section names, step indicators, or source citations
4. Use thin accent lines or dividers to separate footer from content
5. Keep footers subtle - they should not compete with main content
6. For cover slides: minimal footer or just a subtle accent line
7. For data slides: include source attribution
8. For process slides: include step/progress indicators

## Output Format
For each slide, provide:

**Slide [N]: [Descriptive Title]**
\`\`\`
[Complete, detailed prompt - 100-200 words describing the full slide structure, content organization, visual elements, and design specifications. Footer must be contextual with actual page number if included.]
\`\`\`

## Quality Requirements
- Every prompt must be 100-200 words minimum
- Include specific layout structure (columns, grids, sections)
- Describe exact content organization (headers, bullets, callouts)
- Specify visual elements (icons, illustrations, diagrams)
- Define design system (fonts, colors, spacing)
- Footer must use actual slide number and contextual content
- Ensure prompts work as complete slide generators, not just backgrounds
- Maintain consistency across all slides in a deck

## What NOT to Do
- Don't create short, vague prompts
- Don't focus only on backgrounds or aesthetics
- Don't forget content structure and text layouts
- Don't omit design specifications
- Don't add generic footer placeholders like "logo" or "page number" without specifics
- Don't include footers that aren't relevant to the slide content
- Don't create inconsistent styles across slides`;

export const styleDescriptions: Record<SlideStyle, string> = {
  professional: 'clean corporate aesthetic with soft gradients, subtle geometric background accents, modern sans-serif typography, structured multi-column layouts, professional color palette with 1-2 accent colors plus neutrals',
  technical: 'technical blueprint or diagram style with clear labeling, arrows, measurement lines, grid backgrounds, high contrast text, minimal color palette (blue, white, accents), engineering-focused aesthetic',
  creative: 'bold artistic design with vibrant colors, dynamic asymmetric layouts, creative typography mixing, gradient backgrounds, artistic illustrations, expressive visual hierarchy',
  infographic: 'data visualization focused with charts, graphs, stat cards, icon grids, clear visual hierarchy for information, balanced text and visual elements, professional yet engaging',
  educational: 'clear instructional design with step-by-step visual flow, numbered sections, friendly illustrations, warm approachable aesthetic, process diagrams, learning-focused with clear progression',
  'pixel-art': '8-bit pixel art style with retro game aesthetic, blocky graphics, nostalgic color palette, pixelated icons and illustrations, chunky geometric elements, playful vintage gaming vibes',
  minimalist: 'ultra-minimal design with abundant whitespace, single focal points, simple geometry, maximum negative space, elegant simplicity, zen-like clarity, limited color palette',
  'dark-neon': 'dark background with neon glow effects, cyberpunk aesthetic, high contrast design, electric colors on deep black, futuristic atmosphere, glowing accents and borders',
  'hand-drawn': 'sketchy illustration style with hand-drawn aesthetic, rough organic lines, warm paper texture, pencil sketch feel, artistic imperfection, doodle borders and accents',
  glassmorphism: 'frosted glass effect with translucent layers, soft blur backgrounds, modern UI aesthetic, glass-like transparency, backdrop blur effects, ethereal floating card elements',
  vintage: 'aged-paper aesthetic with muted color palette (beige, brown, soft green), subtle vintage decor like compass or rope motifs, classic serif fonts, nostalgic warm tones',
  '3d-isometric': 'isometric 3D illustration with dimensional graphics, depth effects, isometric perspective objects, spatial design with shadows, geometric 3D floating elements',
  watercolor: 'soft watercolor painting style with flowing colors, artistic bleeding effects, painted texture, gentle brushstrokes, organic color transitions, muted earthy pastels',
  newspaper: 'editorial print design with bold headlines, column layouts, serif typography zones, black and white with single accent color, newsprint texture, classic journalism aesthetic',
  'flat-design': 'flat design style with bold solid colors, geometric shapes, no shadows or gradients, clean vector aesthetic, simple iconographic elements, modern minimalism',
  'gradient-mesh': 'modern gradient mesh with flowing color transitions, abstract fluid backgrounds, mesh gradients with smooth blends, contemporary color combinations, organic flowing shapes',
  'sci-fi-hud': 'futuristic sci-fi HUD interface style with dark backgrounds (#0A0A12), cyan/teal primary accents (#00D4FF), orange secondary highlights (#FF6B35), technical schematics with wireframe diagrams, targeting reticles, data overlays with progress bars and stat displays, glowing edge lines, holographic effects, detailed spacecraft or vehicle blueprints, measurement annotations, modular panel layouts with rounded corners, sensor readout aesthetics, high-tech military or aerospace feel',
  'deep-ocean': 'nature documentary scientific analysis style with deep blue-gray oceanic backgrounds (#1A2A3A to #0D1B2A gradient), teal/cyan accent colors (#00CED1), white text with subtle glow, animal silhouettes and anatomical diagrams, scientific data visualizations with comparison charts and force diagrams, measurement callouts with labeled arrows, documentary-style layouts reminiscent of National Geographic or BBC nature graphics, educational yet cinematic atmosphere, professional scientific illustration aesthetic, natural world themed iconography',
  'dev-console': 'developer console and software architecture style with very dark charcoal/black backgrounds (#0D0D0D to #1A1A1A), gold/amber primary accent color (#FFB800, #E6A800), white and light gray secondary text, technical system diagrams with flowcharts and data flow arrows, modular architecture blocks with clean geometric shapes, code/developer documentation aesthetic, subtle grid or matrix patterns, memory structure visualizations, API and system integration diagrams, organized hierarchical layouts, software engineering focus with coordinate systems and data structures, warm gold highlights on dark surfaces',
};

export const colorPaletteDescriptions: Record<ColorPalette, string> = {
  'auto': 'harmonious colors that complement the visual style and content mood, typically 2-3 accent colors plus neutrals',
  'corporate-blue': 'navy blue primary (#1E3A5F), light blue accents (#4A90D9), crisp white backgrounds, silver highlights - professional and trustworthy',
  'modern-purple': 'deep purple primary (#6B21A8), violet accents (#8B5CF6), soft lavender highlights, white backgrounds - innovative and creative',
  'nature-green': 'forest green primary (#166534), sage accents (#86EFAC), warm cream backgrounds, earthy brown details - organic and sustainable',
  'warm-orange': 'burnt orange primary (#EA580C), coral accents (#FB923C), cream backgrounds, deep brown text - energetic and warm',
  'elegant-monochrome': 'black text, white backgrounds, sophisticated grays for panels and accents, subtle texture - timeless and elegant',
  'vibrant-gradient': 'bold gradients from cyan to magenta, electric accent colors, dynamic color transitions - modern and energetic',
  'ocean-teal': 'deep teal primary (#0D9488), aquamarine accents (#5EEAD4), seafoam highlights, sandy beige backgrounds - calm and refreshing',
  'sunset-pink': 'hot pink primary (#EC4899), peach accents (#FBBF24), soft coral highlights, warm cream backgrounds - playful and energetic',
  'forest-earth': 'deep brown primary (#78350F), terracotta accents (#D97706), olive green highlights, cream backgrounds - grounded and natural',
  'royal-gold': 'royal blue primary (#1E40AF), gold accents (#F59E0B), ivory backgrounds, deep navy text - prestigious and luxurious',
  'arctic-frost': 'ice blue primary (#38BDF8), silver accents (#94A3B8), white backgrounds, pale lavender highlights - cool and fresh',
  'neon-night': 'electric purple (#A855F7), neon green accents (#22C55E), hot pink highlights, dark backgrounds - bold and futuristic',
};

export const layoutDescriptions: Record<LayoutStructure, string> = {
  'visual-heavy': 'large hero visuals taking 60-70% of space, minimal text areas, icon-centric design with dramatic imagery, strong visual impact, illustration-forward layouts',
  'text-heavy': 'text-focused with 60-70% space for content, multi-column text layouts, bullet point sections, supporting graphics in corners or margins, subtle backgrounds',
  'balanced': 'equal visual and text space, dual-column layouts with left-visual right-text or vice versa, versatile 50/50 compositions, flexible zones for various content',
};

export const aspectRatioDescriptions: Record<AspectRatio, string> = {
  '16:9': '16:9 widescreen presentation format',
  '4:3': '4:3 traditional presentation format',
  '1:1': '1:1 square format',
  '9:16': '9:16 vertical portrait format',
};

export interface PromptConfig {
  content: string;
  style: SlideStyle;
  colorPalette: ColorPalette;
  layoutStructure: LayoutStructure;
  aspectRatio: AspectRatio;
  slideCount: number;
}

export function buildUserPrompt(config: PromptConfig): string {
  const {
    content,
    style,
    colorPalette,
    layoutStructure,
    aspectRatio,
    slideCount,
  } = config;

  const styleLabel = style.charAt(0).toUpperCase() + style.slice(1).replace(/-/g, ' ');

  return `Generate ${slideCount} detailed Nano Banana Pro Slides prompts for a cohesive presentation deck.

## Source Content to Transform Into Slides
${content}

## Visual Direction
**Style:** ${styleLabel}
${styleDescriptions[style]}

**Color Palette:** ${colorPalette === 'auto' ? 'Auto-select harmonious colors (2-3 accents + neutrals) that match the style and content' : colorPaletteDescriptions[colorPalette]}

**Layout Priority:** ${layoutDescriptions[layoutStructure]}

**Aspect Ratio:** ${aspectRatioDescriptions[aspectRatio]}

## Slide Deck Structure
Generate prompts for these ${slideCount} slides (use these exact slide numbers in footers):

1. **Slide 1: Title/Cover** - Bold opening with main title, subtitle, and thematic visual. Footer: subtle accent line only, no page number needed.
${slideCount > 2 ? Array.from({ length: Math.min(slideCount - 2, 8) }, (_, i) => {
    const slideNum = i + 2;
    const slideTypes = [
      `Content slide with key points. Footer should include page number '${slideNum}'.`,
      `Process slide with step-by-step breakdown. Footer: 'Step ${slideNum - 1} of ${slideCount - 2}' indicator.`,
      `Data/insight slide with charts. Footer: source attribution + page '${slideNum}'.`,
      `Comparison slide with multi-column layout. Footer: page number '${slideNum}'.`,
      `Deep-dive explanation slide. Footer: section name + page '${slideNum}'.`,
      `Visual showcase slide. Footer: minimal, just page '${slideNum}'.`,
      `Quote or highlight slide. Footer: attribution + page '${slideNum}'.`,
      `Timeline/roadmap slide. Footer: progress indicator + page '${slideNum}'.`
    ];
    return `${slideNum}. **Slide ${slideNum}** - ${slideTypes[i % slideTypes.length]}`;
  }).join('\n') : ''}
${slideCount > 1 ? `${slideCount}. **Slide ${slideCount}: Conclusion** - Key takeaways. Footer: contact/website info or just page '${slideCount}'.` : ''}

## Critical Requirements
Each prompt MUST:
- Be 100-200 words describing the complete slide
- Include specific layout structure (columns, panels, sections)
- Describe content organization (headers, bullets, callouts, diagrams)
- Specify visual elements (icons, illustrations, charts)
- Define design details (colors, fonts, spacing)
- Work as a complete slide generator, not just a background

## Output Format
**Slide [N]: [Descriptive Title]**
\`\`\`
[Detailed prompt describing the full slide - structure, content, visuals, and design]
\`\`\`

Generate all ${slideCount} detailed prompts now.`;
}

// Re-export types for convenience
export type { SlideStyle, ColorPalette, LayoutStructure, AspectRatio };
