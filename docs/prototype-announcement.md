# Prototype announcement to the dev team

These are the messages that introduce the clickable creator portal prototype to the dev team, written 2026-10-23.

- **Prototype:** https://creator-urmei.vercel.app
- **Full chat log:** [chat-log-2026-10-22.md](chat-log-2026-10-22.md) (branches, the staging merge, the docs branch, the reusable comments workflow and this message).
- **Shareable doc copy:** [URMEI Creator Portal: prototype ready](https://claude.ai/artifact/HFtLDYrCxh98FyJkp5VMPc) (a Claude Doc the team can comment on).

The prototype has no backend. Everything a creator does is saved in the browser's `localStorage`, so clearing the site data starts over as a fresh creator.

## Short Slack message

```
Hi team 👋

Here's the clickable prototype for the *URMEI Creator Portal*: https://creator-urmei.vercel.app

It covers the full creator journey, including the new *shop personalisation* and *collections* features.

Please take a look and flag anything that feels off. Thanks! 🙌
```

## Full Slack message

```
Hi team 👋

Please find the clickable prototype for the *URMEI Creator Portal*: https://creator-urmei.vercel.app

It covers the full creator experience end to end, including the latest features: *shop personalisation* and *collections*.

*Try the full journey:*
1. *Apply & onboard:* apply, verify your email, then sign in.
2. *Profile setup:* username, photo, address and bank details (fields change by market).
3. *Home:* dashboard, recent activities and notifications.
4. *Sample requests & reviews:* request samples, then review them with photos.
5. *My Shop:* add products, group them into *collections* (new), *personalise* your storefront's banner and featured items (new), then publish it.
6. *Stats & Manage Account:* stats, payouts and account details.

There's no backend: everything you do is saved in your browser, so clear the site data to start over as a fresh creator.

Please flag anything that feels off, or anything that won't map well to a real backend. Thanks! 🙌
```

## Journey and routes

The journey steps above map to these routes. The full list is the `switch` in `src/App.tsx`.

| Step | Routes |
| --- | --- |
| Apply and onboard | `/apply`, `/apply/verify`, `/apply/form`, `/apply/success`, `/login`, `/verify` |
| Profile setup | `/profile/username`, `/profile/photo`, `/profile/shipping`, `/profile/bank`, `/profile/review` |
| Home | `/home`, `/home/tour`, `/recent-activities` |
| Sample requests and reviews | `/sample-requests`, `/reviews` |
| My Shop (collections, personalisation) | `/shop`, `/shop/browse`, `/shop/preview`, `/shop/view` |
| Stats and Manage Account | `/shop/stats/…`, `/manage-account`, `/manage-account/payouts`, `/help-center` |
