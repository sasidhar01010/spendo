# Spendo

Track every rupee you spend, on your phone and laptop. Sign in with Google and your entries are stored privately in your own Supabase database and kept in sync across devices. It runs entirely on free tiers.

**Live app:** https://sasidhar01010.github.io/spendo/

## What it does today (Phase 1)

- **Quick add:** tap +, type the amount, pick a category, save. Remembers your last account and learns the category for each payee.
- **Home dashboard:** today's spend against a daily allowance, a month budget ring, account balances, a 30-day trend, category breakdown, spending calendar, budget bars, top payees and recent entries.
- **Timeline:** entries grouped by day with day totals and a running month total, plus search and filters. Swipe left to delete, with undo.
- **Budgets:** a monthly limit per category, with alerts at 80% and 100%.
- **Review, by week:** each week's everyday spending against your own usual week (up to 8 earlier weeks; rent, bills, health and monthly subscriptions left out). Whether last week's suggestion worked, what went up and why, what went well, day by day, unusual payments, new payees, an 8-week trend, what the difference means for your nearest goal, and one concrete suggestion.
- **Review, by month:** a month-end forecast (spent so far, expected everyday spending by weekday, and regular bills not yet paid, with a likely range), your patterns (weekday against weekend, after payday, priciest day) and small frequent payments added up per year.
- **Safe to spend today:** one number on Home that already sets aside goal savings and regular bills still to come, with the working shown.
- **Was it worth it?** Rate bigger purchases a few days later. The Review shows where regretted money goes, and Goals suggests cutting those first.
- **Price in work time:** amounts shown as working time (from your average income) and as days of saving for your nearest goal.
- **Spendo Wrapped:** a monthly or yearly recap in swipeable cards, with a hide-amounts option and save-as-image.
- **Goals planner:** add what you're saving for, the cost and a date. Spendo works out your real average month, the monthly amount each goal needs, and whether it fits. If it doesn't, it suggests specific changes from your own habits; you switch each one on or off and resize it, then turn the plan into budgets. Also: a what-if slider for the date, savings history, and whether you're ahead of or behind schedule. All on-device arithmetic, no AI.
- **Accounts, categories and income.**
- **CSV import and export, plus a full JSON backup.**
- **Google or GitHub sign-in**, private per user via row-level security.
- **Installable and works offline:** entries made offline sync when you reconnect.

## Stack

| Layer | Choice |
|---|---|
| App | Plain HTML, CSS and JavaScript PWA in `app/` (no build step) |
| Sign-in and database | Supabase Auth (Google, GitHub) and Postgres with row-level security |
| Hosting | GitHub Pages, deployed by `.github/workflows/deploy.yml` |
| Keep-alive | `.github/workflows/keepalive.yml` pings the database nightly so the free project never pauses |

## One-time setup

You need four free accounts: GitHub, Supabase, Google Cloud, and optionally a GitHub OAuth app. None of them asks for a card.

### 1. Supabase project
1. Go to https://supabase.com, sign in with GitHub, and click **New project**. Choose the region **South Asia (Mumbai)** and save the database password somewhere safe.
2. Open **SQL Editor → New query**, paste all of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
3. Open **Project Settings → API** and copy:
   - **Project URL**, like `https://abcd1234.supabase.co`
   - **anon public** key (labelled "publishable" on newer projects)
4. Put both into [`app/config.js`](app/config.js) and commit. The anon key is safe to make public. **Never** commit the `service_role` or secret key.

### 2. Google sign-in
1. Go to https://console.cloud.google.com and create a project called `Spendo`.
2. Open **APIs & Services → OAuth consent screen** (called "Google Auth Platform" on newer consoles):
   - User type: **External**
   - App name: `Spendo`; support email and developer email: your Gmail
   - Scopes: leave the defaults (`email`, `profile`, `openid`). These basic scopes need no Google review.
   - Then **Publish app** (set it to "In production") so anyone can sign in, not only test users.
3. Open **Credentials → Create credentials → OAuth client ID → Web application**:
   - Authorized JavaScript origins: `https://sasidhar01010.github.io`
   - Authorized redirect URIs: `https://<your-project-ref>.supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client secret**.
5. In Supabase, open **Authentication → Sign In / Providers → Google**, turn it on, paste the Client ID and secret, and save.

### 3. Tell Supabase where the app lives
In Supabase, open **Authentication → URL Configuration**:
- Site URL: `https://sasidhar01010.github.io/spendo/`
- Redirect URLs: add `https://sasidhar01010.github.io/spendo/` and `http://localhost:8080/`

### 4. GitHub Pages
In this repo, open **Settings → Pages → Build and deployment → Source: GitHub Actions**. Every push to `main` then deploys automatically.

### 5. (Optional) GitHub sign-in
On GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App**:
- Homepage URL: `https://sasidhar01010.github.io/spendo/`
- Callback URL: `https://<your-project-ref>.supabase.co/auth/v1/callback`

Then paste the Client ID and a new Client secret into **Supabase → Authentication → Providers → GitHub**, and set `githubLogin: true` in `app/config.js` to show the button.

## Run locally

```bash
cd app
python3 -m http.server 8080
# open http://localhost:8080
```

If `config.js` is empty, the app runs in "this device only" mode and saves to the browser.

## How sync works

The app keeps your data on the device first, so it is instant and works offline. It also remembers the last state it confirmed with the server. After every change it sends only the rows that differ: an upsert for new or edited rows, and a delete for removed ones. It pulls fresh data when the app comes back into view and once a minute while open. Any entries you made before signing in move into your account when you first sign in.

## Data model

Tables are in `supabase/schema.sql`: `profiles`, `accounts`, `categories`, `budgets`, `transactions` (used now), plus `recurring_rules`, `category_rules`, `import_tokens`, `import_log` and `goals`, which are ready for Phase 2. Money is stored as integer paise. Every table has row-level security set to `user_id = auth.uid()`.

## Roadmap

- **Phase 2:** Gmail bank-alert import through Google Apps Script running in each user's own account, recurring payments, bill reminders, receipt scanning and a weekly digest.
- **Phase 3:** insights, a month-end forecast, natural-language add ("chai 20 upi"), net worth, and a monthly PDF report.
