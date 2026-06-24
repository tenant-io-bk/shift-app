# Connecting Supabase

The app runs without a backend (auth steps are skipped) until you connect a
Supabase project. Follow these steps to make it real.

## 1. Create a Supabase project

1. Go to <https://supabase.com> and sign in (free tier is fine to start).
2. **New project** → pick a name, a strong database password, and a region
   close to your users (e.g. `East US` for NYC).
3. Wait ~2 minutes for it to provision.

## 2. Apply the database schema

1. In the project, open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql)
   and click **Run**.
3. This creates the `profiles`, `venues`, `shifts`, `applications`, and
   `ratings` tables, their Row Level Security policies, and the trigger that
   auto-creates a profile when someone signs up.
4. Verify under **Table Editor** that the five tables exist.

## 3. Get your API keys

1. **Project Settings** → **API**.
2. Copy **Project URL** and the **anon / public** key.
3. In the repo:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and paste in the two values.
4. Restart the dev server (`npm run dev`) so the values load.

Once `NEXT_PUBLIC_SUPABASE_URL` is a real URL, the phone/SMS verify screens
stop skipping and start talking to Supabase Auth.

## 4. Enable phone (SMS) sign-in

The onboarding uses **phone OTP** (`signInWithOtp({ phone })`), which needs an
SMS provider. Two options:

- **For testing — no SMS cost:** Supabase **Authentication → Sign In / Providers
  → Phone**, enable Phone, then add a **test phone number** with a fixed OTP
  (e.g. `+15555550100` → `123456`). The app will accept that code without
  sending a real text.
- **For production:** connect a real SMS provider (Twilio, Vonage, MessageBird,
  etc.) in the same Phone settings panel. This costs money per message and
  needs an account with that provider.

> Prefer not to deal with SMS at all yet? We can switch onboarding to **email
> magic links** instead — say the word and I'll make that change.

## 5. Add the same env vars to Vercel (for the deployed site)

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the
   same values (Production + Preview).
3. Redeploy (a new push to `main`, or **Redeploy** in the Vercel UI).

## 6. Tell me when it's connected

Once steps 1–4 are done, I'll verify the auth round-trip end to end and start
wiring real data into the screens (Phase 1: sessions, route guards, and the
role/profile write path).
