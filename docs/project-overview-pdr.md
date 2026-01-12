# Project Overview & Product Development Requirements

## Overview

**Nano Banana Slides Prompter** is an AI-powered tool that generates optimized prompts for Nano Banana Pro Slides - an AI slide generation service. The application transforms user content into detailed, structured prompts that produce visually stunning presentations.

| Attribute | Value |
|-----------|-------|
| Name | Nano Banana Slides Prompter |
| Version | 1.0.6 |
| License | GPL-3.0-or-later |
| Repository | nano-banana-slides-prompter |

## Target Users

- **Content Creators**: Quickly convert ideas into presentation prompts
- **Educators**: Generate educational slide content with consistent styling
- **Business Professionals**: Create polished business presentations
- **Developers**: Integrate prompt generation into workflows

## Core Features

### 1. Content Input
- **Text Input**: Direct text entry for presentation content
- **URL Extraction**: Automatic content extraction from web pages
- **CSV Upload**: Data-driven presentations from CSV files
- **Topic-Based**: Generate content from topic descriptions

### 2. Visual Styling
- **20 Visual Styles**: Professional, Technical, Creative, Educational, Minimalist, etc.
- **13 Color Palettes**: Auto, Corporate, Vibrant, Pastel, Dark, etc.
- **Layout Structures**: Balanced, Text-Heavy, Visual-First, Minimal

### 3. Character Presenter (v1.0.4+)
- **8 Render Styles**: Pixar, Real, Anime, Cartoon, Sketch, Chibi, Low-Poly, Mascot
- **Dynamic Generation**: Characters generated based on content and audience (v1.0.6)
- **Non-Human Support**: Animals, robots, mascots, animated objects

### 4. Intelligent Slide Generation (v1.0.6)
- **50+ Slide Templates**: Opening, Concept, Data, Process, Technical, Business, etc.
- **Content-Aware Selection**: LLM analyzes content to select optimal slide types
- **Hybrid Fallback**: Category-based templates if analysis fails

### 5. Session Management (v1.0.5+)
- **Save/Load Sessions**: Persist presentation configurations
- **Multi-Session Support**: Work on multiple presentations
- **Server Sync**: Sessions synchronized with backend

### 6. Internationalization (v1.0.5+)
- **English & Chinese**: Full UI translation support
- **react-i18next**: Industry-standard i18n framework

### 7. LLM Configuration
- **Flexible Backend**: OpenAI, OpenRouter, Ollama compatible
- **User Overrides**: Per-user API key and model settings
- **Streaming Support**: Real-time prompt generation via SSE

## Product Requirements

### Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | Generate slide prompts from text content | High | Done |
| FR-02 | Extract content from URLs | High | Done |
| FR-03 | Support CSV file uploads | Medium | Done |
| FR-04 | Provide 20+ visual style options | High | Done |
| FR-05 | Include character presenter options | Medium | Done |
| FR-06 | Dynamic character generation | Medium | Done |
| FR-07 | Content-aware slide type selection | Medium | Done |
| FR-08 | Session management (CRUD) | Medium | Done |
| FR-09 | Multi-language support (EN/ZH) | Medium | Done |
| FR-10 | Configurable LLM backend | High | Done |
| FR-11 | Streaming prompt generation | Medium | Done |
| FR-12 | Copy individual slide prompts | High | Done |

### Non-Functional Requirements

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-01 | Response time for prompt generation | < 30s | Met |
| NFR-02 | Support concurrent users | 100+ | Met |
| NFR-03 | Browser compatibility | Chrome, Firefox, Safari, Edge | Met |
| NFR-04 | Mobile responsive design | Yes | Met |
| NFR-05 | Accessibility (WCAG 2.1) | AA | Partial |

### Technical Constraints

- **Frontend**: React 19+, TypeScript, Vite 7
- **Backend**: Bun runtime, Hono framework
- **LLM**: OpenAI SDK compatible APIs
- **Deployment**: Docker containers, GHCR images

## Architecture Summary

```
+------------------+     +------------------+     +------------------+
|    Frontend      | --> |     Backend      | --> |    LLM API       |
|  React + Vite    |     |   Hono + Bun     |     | OpenAI/OpenRouter|
+------------------+     +------------------+     +------------------+
        |                        |
        v                        v
+------------------+     +------------------+
|   shadcn/ui      |     |  Session Store   |
|   Radix UI       |     |   (JSON files)   |
+------------------+     +------------------+
```

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.6 | 2025-01 | Dynamic character generation, content-aware slides |
| 1.0.5 | 2025-01 | i18n support (EN/ZH), session management |
| 1.0.4 | 2024-12 | Character presenter feature |
| 1.0.3 | 2024-12 | Style personas, expanded visual vocabulary |
| 1.0.0 | 2024-11 | Initial release |

## Success Metrics

- **User Engagement**: Sessions created per day
- **Prompt Quality**: User satisfaction with generated prompts
- **Performance**: Average generation time
- **Reliability**: Uptime percentage, error rate

## Future Roadmap

- [ ] Additional language support (Japanese, Korean, Vietnamese)
- [ ] Template library with pre-built configurations
- [ ] Export prompts to various formats (JSON, Markdown)
- [ ] Team collaboration features
- [ ] Analytics dashboard for usage insights
