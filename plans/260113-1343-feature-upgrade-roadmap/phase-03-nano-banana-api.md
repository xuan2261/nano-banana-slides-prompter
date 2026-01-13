---
phase: 3
title: 'Nano Banana API Integration'
status: pending
priority: P1
effort: 8h
dependencies: [phase-02]
---

# Phase 3: Nano Banana API Integration (v1.5.x)

**Parent Plan:** [plan.md](./plan.md)
**Dependencies:** Phase 2 complete, Nano Banana API access

## Overview

| Attribute             | Value          |
| --------------------- | -------------- |
| Version Target        | v1.5.0         |
| Priority              | P1 - High      |
| Effort                | 8h             |
| Implementation Status | 🔲 Not Started |
| Review Status         | 🔲 Pending     |

Direct integration with Nano Banana Pro API for live slide generation and preview.

## Key Insights

1. **API abstraction** - Create client layer to handle auth, versioning
2. **Preview integration** - Iframe or image gallery for generated slides
3. **One-click flow** - Generate prompt → Send to Nano Banana → Preview

## Requirements

### Functional

- [ ] FR-26: Configure Nano Banana API credentials
- [ ] FR-27: Send prompts directly to Nano Banana
- [ ] FR-28: Preview generated slides in-app
- [ ] FR-29: One-click generate-and-preview flow

### Non-Functional

- [ ] NFR-11: API response < 30s
- [ ] NFR-12: Preview loads < 5s after generation

## Architecture

```
src/
├── components/
│   ├── nano-banana/
│   │   ├── NanoBananaConfig.tsx     # API key settings
│   │   ├── NanoBananaPreview.tsx    # Slide preview
│   │   └── GenerateButton.tsx       # One-click action
│   └── settings/
│       └── ApiSettings.tsx          # Extend with NB config

server/src/
├── routes/
│   └── nanoBanana.ts                # /api/nano-banana/*
└── services/
    └── nanoBananaClient.ts          # API client
```

## Related Code Files

| File                            | Purpose          | Action        |
| ------------------------------- | ---------------- | ------------- |
| `src/stores/settingsStore.ts`   | Settings state   | Add NB config |
| `server/src/routes/settings.ts` | Settings API     | Extend        |
| `.env.example`                  | Environment vars | Add NB vars   |

## Implementation Steps

### 3.1 API Client Setup (3h)

```
[ ] 3.1.1 Research Nano Banana Pro API
    - Document endpoints, auth method
    - Rate limits, quotas

[ ] 3.1.2 Create API client
    - server/src/services/nanoBananaClient.ts
    - Authentication handling
    - Error mapping
    - Retry logic

[ ] 3.1.3 Create API routes
    - POST /api/nano-banana/generate
    - GET /api/nano-banana/status/:id
    - GET /api/nano-banana/result/:id

[ ] 3.1.4 Add environment config
    - NANO_BANANA_API_KEY
    - NANO_BANANA_API_BASE
```

### 3.2 Settings Integration (2h)

```
[ ] 3.2.1 Extend settingsStore
    - nanoBananaApiKey (optional)
    - nanoBananaEnabled toggle

[ ] 3.2.2 Create NanoBananaConfig component
    - API key input (masked)
    - Test connection button
    - Enable/disable toggle

[ ] 3.2.3 Add to Settings dialog
    - New tab or section
    - i18n translations
```

### 3.3 Preview & One-Click (3h)

```
[ ] 3.3.1 Create NanoBananaPreview component
    - Image gallery view
    - Slide navigation
    - Full-screen option

[ ] 3.3.2 Create useNanoBanana hook
    - src/hooks/useNanoBanana.ts
    - Generate, poll status, get result

[ ] 3.3.3 Create one-click flow
    - "Generate Slides" button
    - Progress indicator
    - Auto-open preview on complete

[ ] 3.3.4 Integrate into PromptOutput
    - Show button when NB enabled
    - Display preview inline or modal
```

## Todo List

- [ ] 3.1 API Client Setup (3h)
- [ ] 3.2 Settings Integration (2h)
- [ ] 3.3 Preview & One-Click (3h)

## Success Criteria

| Criteria                     | Validation                  |
| ---------------------------- | --------------------------- |
| API connection works         | Test with valid credentials |
| Slides generate successfully | Test with sample prompts    |
| Preview displays correctly   | Test all slide types        |
| Error handling works         | Test invalid API key        |

## Risk Assessment

| Risk               | Mitigation                       |
| ------------------ | -------------------------------- |
| API not available  | Feature flag, graceful fallback  |
| API format changes | Version pinning, adapter layer   |
| Rate limiting      | Queue requests, show limits      |
| Cost passthrough   | Document pricing, usage tracking |

## Security Considerations

- API key stored encrypted (electron keychain or encrypted localStorage)
- Keys never logged or exposed to frontend
- Validate API responses before rendering

## Unresolved Questions

1. Nano Banana Pro API documentation location?
2. Authentication method (API key, OAuth)?
3. Pricing model and rate limits?
4. Webhook support for async generation?

## Next Steps

After Phase 3 completion:

1. Update version to 1.5.0
2. Create user documentation for NB integration
3. Begin Phase 4: Education & Business
