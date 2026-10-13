# Social account revoked: Figma flows

Work File `FdmVPJo1j4t8s9gej1H7Yb`, flows page `2650:50683`, section **`[Influencer] Social Connection Lost | 13.10.26`** (`3061:84210`). Desktop first (Q17). Flow 01 was approved on its own; on 2026-10-13 the user said "do all" for 02–09, so those were built in one pass and go to review together. The decisions behind each flow are in `REQUIREMENT.md` / `ANSWERS.md`.

## Figma structure

| # | Flow | Sub-section | Frames | Status |
| --- | --- | --- | --- | --- |
| 01 | Connection Lost Alerts | `3061:84211` | 01.0 Cover `3061:84212` · 01.1 Home Banner `3061:84221` · 01.2 Notification Drawer `3061:84716` · 01.3 Social Accounts Connection Lost `3061:85038` | Approved 2026-10-13 |
| 02 | Reconnect | `3067:83937` | 02.0 Cover `3067:83938` · 02.1 Connection Lost Row `3067:83947` · 02.2 Instagram Sign-in Pop-up `3067:84187` · 02.3 Instagram Reconnected Toast `3067:84423` | Built, in review |
| 03 | Reconnect Errors | `3068:138938` | 03.0 Cover `3068:138939` · 03.1 Different Account Blocked `3068:138948` · 03.2 Account Unavailable `3068:139177` · 03.3 Limited Access `3068:139415` | Built, in review |
| 04 | Follower Count: Option A vs B | `3068:139645` | 04.0 Cover `3068:139646` · 04.1 Option A Count Hidden `3068:139655` · 04.2 Option B Last Known Count `3068:140159` | Built, **decision needed (Q2)** |
| 05 | Last Account Lost | `3070:85317` | 05.0 Cover `3070:85318` · 05.1 Sign-in Pop-up `3070:85327` · 05.2 Home Countdown Banner `3070:85874` · 05.3 Request Sample Paused `3070:86378` · 05.4 Requests On Hold `3070:86752` | Built, in review |
| 06 | Shop Unpublished (Day 7) → Reconnect | `3070:86905` | 06.0 Cover `3070:86906` · 06.1 My Shop Unpublished `3070:86915` · 06.2 Shop Live Again Toast `3070:87220` | Built, in review |
| 07 | Disconnect in URMEI | `3071:86419` | 07.0 Cover `3071:86420` · 07.1 Two Accounts Connected `3071:86429` · 07.2 Confirm Dialog `3071:86668` · 07.3 Instagram Disconnected Toast `3071:86915` · 07.4 Last Account Blocked Tooltip `3071:87153` | Built, in review |
| 08 | Application On Hold | `3071:87383` | 08.0 Cover `3071:87384` · 08.1 On Hold Page `3071:87393` · 08.2 Back In Review `3071:87455` | Built, in review |
| 09 | Emails | `3072:86929` | 09.0 Cover `3072:86930` · 09.1 Connection Lost `3072:86949` · 09.2 Last Account Lost `3072:86975` · 09.3 Day 3 Reminder `3072:86999` · 09.4 Day 7 Reminder `3072:87023` · 09.5 Shop Unpublished `3072:87047` · 09.6 Application On Hold `3072:87071` | Built, in review |

## Build notes

- **01:**
  - **Sources:** clones of Home `04.2` (`2740:65593`), Notification `01.2` (`2740:82918`) and Social Accounts `02.2` (`2740:83562`). The cover is a clone of Collections `01.0`.
  - **Home banner:** a Notification Banner instance with a "Reconnect" action.
  - **Avatar:** an amber warning dot.
  - **Stats:** Instagram's count is replaced by "Disconnected · Reconnect".
  - **Social Accounts tab:** a warning icon.
  - **Instagram row:** a "Connection lost on 13 Oct 2026" status line and a primary Reconnect button.
- **02:**
  - **Sources:** clones of 01.3.
  - **02.2 (1440×900):** a dashed placeholder for Instagram's own sign-in, which we don't design. Behind it, the row's button is `Primary / Disabled` and reads "Reconnecting…".
  - **02.3:** the "Instagram reconnected" toast (a clone of `2801:72046`). Disconnect is enabled on both accounts, and the banner is back to the source frame's bank-details message.
- **03:**
  - **03.1 and 03.2:** error toasts, cloned from the "slots full" toast container `2740:69053`.
  - **03.3:** a "limited access" status line on the Instagram row.
- **04:** clones of 01.1.
  - **Option A:** shows the reconnect hint in place of the count.
  - **Option B:** shows "15.4K · last updated 13 Oct · Reconnect".
  - **Storefront:** the storefront designs (`01.1 Storefront` `2740:96015`) show only URMEI followers, so only Home changes. The code's `StorefrontProfileCard` shows TikTok and Instagram counts and should follow the chosen option.
- **05:**
  - **Dialogs:** the sign-in pop-up reuses the Collections confirm dialog `2750:146547` over Home, with buttons "Later" and "Reconnect".
  - **TikTok:** its count is hidden, because in this scenario Instagram was the only account.
  - **05.3:** "Request sample" swapped to `Button=Secondary, Size=md, State=Disabled` (product page source `2740:86141`).
  - **05.4:** the first request's chip reads "On hold" (list source `2740:85463`).
- **06:**
  - **Source:** My Shop `03.1` (`2740:72043`).
  - **06.1:** a banner with Reconnect, "Your store URL is currently disabled.", Publish disabled and "Unpublished on 20 Oct 2026". The frame hugs its content, so the footer isn't clipped.
  - **06.2:** the live URL, "View Shop" and a toast.
- **07:**
  - **Sources:** clones of 02.3.
  - **07.2:** a confirm dialog, "Disconnect Instagram?".
  - **07.3 and 07.4:**
    - Instagram reads "Not connected" with Connect, and TikTok's Disconnect is `Outlined / Disabled`.
    - On 07.4, a `Tooltip` instance (`3078:87143`, Placement=Left) beside the disabled button reads "Connect another account before disconnecting TikTok." The old hand-built tooltip `3071:87373` is hidden beside it.
- **08:**
  - **Source:** Application Submitted `00.8` (`2740:93606`).
  - **08.1:** the check icon is swapped for `triangle-alert` in amber, and the button reads "Reconnect Instagram".
  - **Assumption, to confirm:** applicants can't sign in before approval, so they reconnect from this page, which they reach from the email.
- **09:** six 600px email frames built from the file's own text styles, the header logo and `Button=Primary, Size=md` with its icons turned off. A subject line sits at the top of each email, and an Info annotation above each one says when it's sent. There was no email template in the file to start from.
- **Housekeeping:**
  - **Cursors:** every action has a clone of Pointer Container `2775:169244`. Cursors inherited from the source frames ("Cursor", "Annotation / Cursor (not for build)") were removed.
  - **Annotations:** every annotation is an Info `Annotation` instance, its dot on the element and its card outside the frame (leaders stretched where needed). They carry no question references such as "(Q6)" (removed from 14 notes on 2026-10-13).
  - **Glitch:** two cursors vanished during the flow 01 build; nobody had removed them on purpose, and they were re-added.

## Open for review

- **Q2:** pick Option A or B in flow 04. B means Q5 changes to keep the last count, and that needs legal sign-off (Q16).
- **08:** confirm the assumption that applicants reconnect from the on-hold page, not after signing in.
- **02.3:** keep or hide the bank-details banner.
- **Copy:** the dates are examples. Lost on 13 Oct 2026, so unpublished on 20 Oct.
- **Mobile:** once desktop is approved (Q17).
