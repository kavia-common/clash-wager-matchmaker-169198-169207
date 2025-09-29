# Wager Royale Frontend

This React app is the user-facing application for browsing, matchmaking, wagering, account management, and withdrawals.

This document captures the implementation plan and technical strategy for:
1) Skill-based matchmaking by Clash Royale crowns (trophies),
2) Mandatory Clash Royale account verification gating,
3) Free trial and $13/month subscription.

The codebase currently includes scaffolding to support these features (UI components, contexts, and API client placeholders). Integrate with backend endpoints when available.

## Architecture Overview

- React 18 (CRA) with lightweight CSS.
- Planned routes: 
  - Matchmaking: crowns-based search and lobby filtering
  - Subscription: manage trial/subscription
- Context:
  - AuthContext to store user auth, CR verification status, trial/subscription state
- API client:
  - api/client.js for base REST requests
  - api/subscription.js for trial/subscription endpoints

## Feature Specifications

### 1) Skill-Based Matchmaking by Crowns
- Display users/lobbies with their Clash Royale crowns (trophies).
- Filter search by crown range slider or min/max inputs.
- Persist selected filters in URL query string to allow sharing links.
- UI shows crowns next to usernames and in filters.
- Technical:
  - SearchFilters.jsx exposes crownMin/crownMax controls and calls onChange.
  - Matchmaking.jsx reads filters, requests results from backend using crown range.
  - Backend: expect query params like ?crownMin=xxxx&crownMax=yyyy in /matchmaking/search.

### 2) Mandatory Clash Royale Account Verification
- Users must link and verify their Clash Royale account to access matchmaking, lobbies, or wager features.
- Gating: If not verified, show a blocking prompt with link flow.
- Show verification status in UI (linked/not linked, token age, trophy/crown display).
- Technical:
  - AuthContext.jsx provides: isVerified, crProfile (crowns, tag), verificationTokenAge.
  - ClashLinkStatus.jsx displays verification status and a CTA to link/verify.
  - Pages that require verification should render a gate (e.g., in Matchmaking.jsx).

### 3) Free Trial & Subscription Payments
- Start a 7-day free trial upon registration or first successful CR account linking.
- After trial expiry, restrict core functionality unless user subscribes to $13/month.
- UI:
  - TrialBanner.jsx displays countdown and expiry warning, and prompts to subscribe.
  - Subscription.jsx page to manage subscription flow and payment initiation.
- Technical:
  - Backend endpoints (placeholders):
    - GET /billing/status → { trialEndsAt, isTrialActive, isSubscribed }
    - POST /billing/start-trial
    - POST /billing/checkout-session → returns redirect URL for hosted payment
    - GET /billing/verify-session?session_id=...
  - api/subscription.js wraps these endpoints.
  - AuthContext integrates status into user state and enforces gating.

## Gating Rules

Order of checks to unlock core features (matchmaking, lobbies, wagers):
1. User authenticated (out of scope for this scaffold).
2. Clash Royale account verified (must be true).
3. Either active trial or active subscription.

If any check fails:
- Not verified → show ClashLinkStatus and block.
- Trial expired and not subscribed → show TrialBanner and Subscription prompts.

## Environment Variables

DO NOT commit actual secrets. Add these variables in your environment (.env). For CRA, prefix with REACT_APP_.

Suggested variables:
- REACT_APP_API_BASE_URL: Base URL for backend API.
- REACT_APP_SITE_URL: Public site URL used for OAuth/email redirect.
- REACT_APP_PAYMENTS_PROVIDER: 'stripe' or another provider key (for documentation/conditional logic).
- REACT_APP_PAYMENTS_PUBLISHABLE_KEY: Publishable key for client-side payment (if applicable).

Note: You (or the deployment orchestrator) must supply these in the environment. This project reads but does not set them.

## Implementation Plan (Incremental)

Phase A: Scaffolding and UI placeholders (this change)
- Add components:
  - SearchFilters.jsx (crown filters)
  - ClashLinkStatus.jsx (verification status and CTA)
  - TrialBanner.jsx (trial/subscription banner)
- Add routes/pages:
  - Matchmaking.jsx (filters, gating)
  - Subscription.jsx (subscription prompts/redirect)
- Add API wrappers:
  - api/client.js (base fetch)
  - api/subscription.js (trial/subscription placeholders)
- Add AuthContext.jsx (verification + billing state placeholders)

Phase B: Backend integration
- Wire Matchmaking.jsx to call backend /matchmaking/search with crown filters.
- Wire Clash Royale verification status from backend (e.g., /cr/verification, /cr/profile).
- Implement payment flows using /billing/* endpoints and hosted checkout redirect.
- Persist and refresh auth tokens securely.

Phase C: Hardening
- Add error states, loading states, retries.
- Comprehensive input validation for filters.
- Add analytics for trial conversions and drop-offs.

## UI/UX Guidance

- Theme: Modern, clean aesthetic (Ocean Professional). Use rounded corners, card surfaces, and subtle shadows.
- Emphasize interactive elements with secondary accent (#F59E0B).
- Show crowns prominently in matchmaking lists and filters.

## Getting Started

- npm start
- npm test
- npm run build

Ensure REACT_APP_API_BASE_URL is set to a valid backend for live integration.

## Notes

- This repo currently uses placeholders for verification and billing status. Replace with real API logic when backend endpoints are available.
- Security: Never expose secret keys in frontend. Use provider publishable keys only on client.
