# Smog Saathi

A GenAI-powered assistant that helps families and communities navigate severe winter smog and urban air pollution. It turns today's AQI plus a family's real situation (city, commute, cooking, heating, who is vulnerable) into a personal plan and explains the **direct impact** of every choice.

**Live demo:** https://Rajnish9921.github.io/smog-saathi/  ·  **Self-tests:** add `#test` to the URL

## Problem statement → feature map
| Requirement | How it is met |
|---|---|
| Low-emission daily routines | Routine, Commute and Sustainable tips; cleanest-2-hour slot from a live 24h PM2.5 forecast |
| Indoor air-quality hacks | Indoor tips incl. DIY Corsi-Rosenthal box purifier, sealing gaps, no incense/coils |
| Sustainable alternatives | Cooking fuel, heating, generator, no-burning and transit swaps |
| Tailored to location & lifestyle | City-specific notes, live PM2.5 per city, 6 lifestyle inputs, 4 vulnerability flags |
| Families **and communities** | Community actions (RWA/school rules, neighbour alerts), one-tap WhatsApp share |
| Explain direct impact | Every tip has a "Kyun" line + impact level; before/after exposure model with visible assumptions |
| GenAI | Gemini answers free-form questions grounded in the profile and plan, in Hinglish / Hindi / English |

## Quality
- **Code quality:** one dependency-free file, strict mode, IIFE scope (no globals), single `state` object, pure functions (`buildPlan`, `exposure`, `aqiToPm`) separated from DOM code, documented constants.
- **Security:** strict CSP (only Open-Meteo and Gemini endpoints allowed), no `eval`, all AI text HTML-escaped before rendering (XSS-tested), model-name allow-list, input clamping, 500-char question cap, prompt-injection guard in the system prompt, API key sent via header (never in the URL), kept only in `sessionStorage`, one-click "Key hatao", `no-referrer`, `noopener` links. No backend, no analytics, no data leaves the browser except the two API calls.
- **Efficiency:** no framework, ~35 KB, request timeouts, in-memory cache (15 min forecast, 5 min live PM2.5), stale-response guard, button lock during AI calls.
- **Testing:** 17 unit tests on the plan engine, AQI math, exposure model, validators and XSS escaping. Run in the browser (`#test`) or in CI/terminal: `node run-tests.js`. GitHub Actions workflow included.
- **Accessibility:** skip link, landmarks, labelled controls, 44px touch targets, visible focus, focus moved to results, live regions for status/errors, no colour-only meaning (impact and AQI are also text), `prefers-reduced-motion`, dark mode, print styles, `lang="hi-Latn"`.

## Run
Open `index.html` (rename `smog-saathi.html`). Free GenAI: get a key at https://aistudio.google.com and paste it into the app. Never commit a key.

## Deploy free
GitHub Pages: Settings → Pages → `main` / root.

## Limits & honesty
General information, not medical advice. Cigarette-equivalent (~22 µg/m³ PM2.5 ≈ 1 cigarette/day) and the exposure model are labelled approximate with assumptions shown. The CSP keeps `'unsafe-inline'` for scripts because the app is a single file; moving the script to a hashed or external file would tighten it further.
