# Wager Royale Frontend

Ocean Professional themed React app for browsing, matchmaking, wagering, account management, and withdrawals.

Key features implemented:
- Ocean Professional theme (blue + amber) with modern minimal UI and shared UI components.
- Routing: Home, Matchmaking (crowns filter), Wager Lobby, Wallet, Results, Profile, Clash link/verification, OAuth callback, Subscription.
- API client scaffolding with .env-driven base URL.
- Skill-based matchmaking: filter by Clash Royale crowns.
- Mandatory Clash Royale verification gating for core features.
- 7-day free trial UI and $13/month subscription flow with placeholders.
- Payment scaffolding (Stripe or similar) with hosted checkout redirect placeholders.
- Route protection and entitlement gating.

## Run

- npm start
- npm test
- npm run build

Create a .env file from .env.example and set values:

```
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_PAYMENTS_PROVIDER=stripe
REACT_APP_PAYMENTS_PUBLISHABLE_KEY=pk_test_...
```

## Routes

- / — Home, hero and quick links, shows TrialBanner if not entitled.
- /matchmaking — Requires verification + entitlement; crowns-based filters and lobby list (placeholder).
- /lobby — Requires verification + entitlement; wager lobby placeholder.
- /wallet — Requires verification + entitlement; deposit/withdraw placeholder.
- /results — Requires verification + entitlement; match history placeholder.
- /profile — Profile, shows verification status and CR info.
- /clash-link — Link/verification flow with status panel and CTA.
- /oauth/callback — Placeholder to complete link and set verified state.
- /subscription — Trial/subscription management and checkout redirect.

## Gating Rules

1) Authenticated user (scaffolded fake user).
2) Verified Clash Royale account (required).
3) Active trial or subscription.

If verification missing, user is redirected to /clash-link.
If entitlement missing, user is redirected to /subscription.

## API Integration

- api/client.js — base fetch wrapper using REACT_APP_API_BASE_URL.
- api/subscription.js — billing placeholders:
  - GET /billing/status
  - POST /billing/start-trial
  - POST /billing/checkout-session → { url }
  - GET /billing/verify-session?session_id=...

Wire real endpoints in Phase B and replace placeholders in:
- AuthContext: CR status/profile and billing boot.
- Matchmaking: /matchmaking/search?crownMin=&crownMax=.
- ClashLink + OAuthCallback: real link flow and verification.

## Style and Components

- Theme variables in src/App.css using CSS custom properties.
- Reusable UI in src/components/UI.jsx: Button, Card, Modal, Toast, Loader.
- SearchFilters.jsx — crowns range filter.
- ClashLinkStatus.jsx — verification panel.
- TrialBanner.jsx — trial/subscription status banner.

## Notes

- Do not expose secret keys in frontend. Use only publishable keys.
- Environment variables must be set by deployment orchestrator or locally via .env.

