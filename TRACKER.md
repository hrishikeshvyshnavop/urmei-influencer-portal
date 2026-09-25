# Work Tracker

Tick each box as the work moves forward. A row's status is its furthest ticked box.

Each task has a permanent ID (`T-01`, `T-02`, …). New tasks take the next free number, and IDs are never reused or renumbered, so a task keeps its ID as it moves between sections. Each commit message starts with its task's ID and title (`T-23: …`), so `git log --grep T-23` finds the work.

| Status | Meaning |
| --- | --- |
| ⬜ Not started | Not committed yet (idea, or edits still in the working tree) |
| 📝 Committed | Committed locally, not on the remote yet |
| ⬆️ Pushed | On `origin` (`main` or a feature branch) |
| 🟢 Live | Deployed and checked on the Vercel site |

Last updated: 2026-09-25

## In progress

| ID | Work | Branch | Committed | Pushed | Live | Status |
| --- | --- | --- | :-: | :-: | :-: | --- |
| T-01 | Period filter as radio list, adds Last 14 Days, All Time last (Figma `350:44963`) (`cfa61bb`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-02 | Shared `RadioDot` for the sort and period lists (`04310da`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-03 | Drop Total Products from the stats row (`018c7ef`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-04 | One profile photo picker for setup and Manage Account (`db1642d`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-05 | Review photos in Your Reviews and What Creators Say (`0d08e10`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-06 | Profile photo pans in any direction in the crop modal (`daaa15c`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-23 | Review photos match Figma `1030:29096` (48px, 8px corners, 14px under the text) in What Creators Say, Your Reviews and a sample request's Your review card, via shared `ReviewPhotos` (`git log --grep T-23`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-24 | Pick several photos at once when writing a review — each loads in its own spinner tile, picks past the 3-photo cap are ignored, and a broken file drops out while the rest are kept (`git log --grep T-24`) | `main` | [x] | [x] | [ ] | ⬆️ Pushed |

## Shipped to `main`

These commits are pushed to `origin/main`. Tick **Live** once you've checked them on the deployed site.

| ID | Work | Commit | Committed | Pushed | Live | Status |
| --- | --- | --- | :-: | :-: | :-: | --- |
| T-07 | Call it Commission Earned, not Commission Owned | `26b8fa8` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-08 | Improve layout handling for viewport widths | `7b7cd38` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-09 | Refactor Manage Account, storefront styling | `43158cd` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-10 | Delivery cost and return policy on the storefront product page | `c543a3a` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-11 | Apply and review forms start at the header's edge | `34a779f` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-12 | Name the empty market and offer a way out | `2496599` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-13 | Manage Account setup requirements | `97c7033` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-14 | Replace the apply landing hero image | `7ed607a` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-15 | One shared stats period across the portal | `e50f508` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-16 | Unified search inputs, stat-page period filters, review details | `ae35577` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-17 | Sample requests, bank details and account forms match the designs | `459f9b1` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-18 | Serve `index.html` for every path on Vercel | `2649aa0` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-19 | Route by URL path instead of the hash | `4be977e` | [x] | [x] | [ ] | ⬆️ Pushed |
| T-20 | Split addresses into default shipping and billing | `15e2555` | [x] | [x] | [ ] | ⬆️ Pushed |

## Backlog

| ID | Work | Committed | Pushed | Live | Status |
| --- | --- | :-: | :-: | :-: | --- |
| T-21 | Convert `public/urmei/apply-hero.png` to WebP (`4c824f5`, docs `bb1e141`) | [x] | [x] | [ ] | ⬆️ Pushed |
| T-22 | Clear the lint errors: `activity-log.ts` whitespace, plus effect setState in `ManageAccount` and `ApplyCreator` (`0ac43ac`) | [x] | [x] | [ ] | ⬆️ Pushed |
