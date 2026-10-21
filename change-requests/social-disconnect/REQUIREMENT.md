# Social account revoked from the platform: requirement

Received 2026-10-13 from the client. Status: **all 9 desktop flows built in Figma (2026-10-13), in review. Flow 01 is approved; Q2 is to be picked from flow 04. The backend team still has to confirm the platform mechanics (Q9). No code yet.** Flow list and frame ids: `change-requests/social-disconnect/FLOWS.md`. Tracked as `T-35` in `TRACKER.md`. Answers summary: `change-requests/social-disconnect/ANSWERS.md`.

## Message (verbatim)

> A new edge case has been found:
>
> The user connects their social media (please let me know which platform is used for the connection, if you have the context).
>
> From that platform, the user can disconnect their social media connection to URMEI.
>
> Consequently, we lose the connection for their social media. How should we manage this case in the platform? Let me know the plan.

## Context: what exists today

- **Platforms:** Instagram, Facebook, YouTube and TikTok. The same four rows appear in the apply form (`ApplyCreator.tsx`), Review Details (`ReviewDetails.tsx`) and Manage Account → Social Accounts (`ManageAccount.tsx`), each drawn by `SocialAccountRow`.
- **Rules already in the product:** the apply form needs **at least one** connected account ("Connect at least one social account to help verify your reach"), and it promises "You can disconnect anytime from Settings."
- **Where the connection shows up:** the Home profile card and the storefront creator card show TikTok and Instagram follower counts (`Home.tsx`, `StorefrontProfileCard.tsx` via `FOLLOWER_STATS`).
- **What's missing:** the connection is a mock. Connect/Disconnect just toggles local state, there's no OAuth, and Manage Account's state isn't even persisted (it resets on reload). A row has only two states, *Connected* and *Not connected*. There's no "the connection broke" state.

## How we find out: through Phyllo (the backend team confirms this, Q9)

Updated 2026-10-13. The social connection runs through **Phyllo**, a third-party API, not straight to each platform. URMEI opens the **Phyllo Connect** SDK, the creator signs in to the platform inside Phyllo's screens, and Phyllo holds the platform tokens and syncs the data. We never talk to Meta, Google or TikTok directly.

A creator can still remove access from the platform's own settings at any time (Instagram/Facebook "Apps and websites", Google account "Third-party connections", TikTok "Manage app permissions"). Phyllo is the one that sees this, and it tells us in two ways:

| Channel | What Phyllo gives us | When |
| --- | --- | --- |
| **Webhook (server)** | `ACCOUNTS.DISCONNECTED`, with the account id | When an account is disconnected. Phyllo's docs tie it to a disconnect made through its API; whether a revoke on the platform fires it too is the open point below. |
| **Connect SDK callbacks (in the app)** | `accountConnected`, `accountDisconnected`, `tokenExpired`, `connectionFailure` (with a reason), `exit` | While the creator has Phyllo Connect open, e.g. during Reconnect |
| **Account status (pull)** | The account's connection status when we fetch it | As a fallback, if a webhook is missed |

What this means for the plan:
- **One source instead of four.** No per-platform webhooks (Meta deauthorize, Google RISC, TikTok `authorization.removed`); Phyllo covers all four platforms.
- **Token refresh is Phyllo's job.** The "silent refresh first" answer (Q13) now means: Phyllo refreshes; we mark the account lost only when Phyllo reports it disconnected or its session expired.
- **Reconnect = open Phyllo Connect again** for that platform. Phyllo's docs say a disconnected account can't be reconnected through the API; the creator has to sign in again.
- **Reconnect errors** come from `connectionFailure`. Blocking a different account (Q10) stays our own check: compare the handle Phyllo returns with the one on file.
- **Data** (Q5, Q16): Phyllo also stores the creator's platform data, so the deletion and legal sign-off must cover Phyllo too.
- Instagram data still needs a professional (Business/Creator) account; that limit comes from Meta, through Phyllo.

**Open, for the backend team to test in Phyllo's sandbox:** when a creator removes access in Instagram's (or YouTube's, TikTok's) own settings, does Phyllo send `ACCOUNTS.DISCONNECTED`, or does the account show up as an expired session / a different status? This is the exact case the client asked about. Most of Phyllo's documentation pages wouldn't load when checked; the event and callback names above come from Phyllo's disconnect-endpoint page and its Flutter SDK package, so confirm them against the full docs.

Sources: [Phyllo: Disconnect an account](https://docs.getphyllo.com/docs/api-reference/api/ref/operations/create-a-v-1-account-disconnect) · [Phyllo: Webhooks guide](https://docs.getphyllo.com/docs/api-reference/API/webhooks-guide) · [Phyllo: Browser integration](https://docs.getphyllo.com/docs/api-reference/connect-SDK/web/browser-integration) · [phyllo_connect package](https://pub.dev/documentation/phyllo_connect/latest/)

## Agreed plan

1. **Detect** (Q9, Q13), through Phyllo:
   - Phyllo's `ACCOUNTS.DISCONNECTED` webhook marks the account **Connection lost** straight away.
   - A daily check of each account's status in Phyllo catches any missed webhook. Phyllo handles token refresh, so an account is marked lost only when Phyllo reports it disconnected or expired.
   - The account is marked with the date. All four platforms are in scope (Q7).
2. **Clean up** (Q5): drop our link to the Phyllo account and the synced stats, ask Phyllo to delete its copy, and keep only the handle and the disconnect date.
3. **Tell the creator** (Q1). All of these, on top of the Manage Account row:
   - **Manage Account row:** "Connection lost on <date>" with a **Reconnect** button.
   - **Notification** in the header bell drawer, linking to the row.
   - **Email** with a one-click Reconnect link, plus reminders on day 3 and day 7.
   - **Home banner** until they reconnect, plus a warning dot on the avatar, the Manage Account menu item and the Social Accounts tab.
   - **Login pop-up** on the next sign-in, plus a "Disconnected · Reconnect" hint on Home where the follower count was.
4. **Stats** (Q2): to be chosen from two designs:
   - **A:** hide the count.
   - **B:** keep the last known count, labelled "last updated <date>".
5. **Losing the last connected account** (Q3, Q3a, Q3b, Q14):
   - **During the 7-day grace period:** new sample requests are blocked, and requests not yet approved go on hold. Approved or shipped ones carry on, and so do payouts.
   - **On day 7**, if the creator hasn't reconnected, the shop is **unpublished**.
   - **When they reconnect:** the shop **republishes automatically** with the same products and links, held requests resume, and they're told "Your shop is live again".
6. **Applications in review** (Q4): if the only connected account is lost, the application goes **on hold**, and the creator is emailed to reconnect before review continues.
7. **Reconnect rules** (Q10, Q11, Q12):
   - **Same account only:** a different handle is blocked ("This isn't the account you connected before").
   - **Partial permissions** still count as connected, showing only the stats we can read.
   - **Deleted, banned or personal accounts** stay in the same "Connection lost" state. Reconnect fails with the platform's reason, so the creator connects another platform.
8. **In-app Disconnect** (Q6): add a confirmation dialog, and block disconnecting the last account ("Connect another account first").
9. **Admin** (Q15): the URMEI team gets a list of creators with lost connections and each one's grace-day countdown. It's admin-side, outside this portal.
10. **Data sign-off** (Q16): the client's legal/privacy contact signs off. We supply the list of what's stored and deleted.

## Conflicts to resolve

- **Q2 B vs Q5:** "keep last known count" needs the count kept, but Q5 keeps only the handle and date. If the design review picks Q2 B, Q5 changes to "handle, date and last count", and that needs legal sign-off (Q16).
- **Q6 vs Q3:** blocking the in-app disconnect of the last account means the 7-day rule only applies when the creator revokes access on the platform itself. That's intended, but say so in the client message.

## Scope

**MVP:** everything in the agreed plan except the admin list.

**Post-MVP / other teams:** the admin list (Q15, admin side) and re-verifying reach on reconnect.

## Code it would touch

- New `src/portal/social-status.ts`: persisted connection records (`connected` / `lost` + date, handle), like the other `*-status.ts` modules, replacing the three separate `useState` lists.
- `SocialAccountRow.tsx`: the Connection lost state with Reconnect, and a confirmation dialog for Disconnect.
- `ManageAccount.tsx`, `ReviewDetails.tsx`, `ApplyCreator.tsx`: the shared record, the last-account block and the warning dot on the Social Accounts tab.
- `NotificationsDrawer.tsx`: a "connection lost" notification type.
- `Home.tsx`: the banner, the stats hint and the login pop-up.
- `ProfileMenu`: the warning dot on the avatar and the menu item.
- `StorefrontProfileCard.tsx` and `shop/data/shop.ts` (`FOLLOWER_STATS`): stats per Q2.
- Shop publish state and sample requests: the grace-period unpublish and republish, and the request hold.
- Frontend: the Phyllo Connect SDK for Connect and Reconnect (apply form, Review Details, Manage Account), with its callbacks driving the row states.
- Backend (not in this repo): the Phyllo integration (users, SDK tokens, the `ACCOUNTS.*` webhooks and the daily status check), the reminder emails, the grace-period job and the admin list.

## Questions and answers

★ marks the option suggested at the time. All answers are from 2026-10-13.

**Q1. How does the creator find out?** First offered as A ★ Manage Account only / B + notification / C + email. The user asked for more ideas because this is critical, so seven were listed.
**Answer:** all of them. The Manage Account row, a notification, an email with day-3 and day-7 reminders, the Home banner with warning dots, the login pop-up and the Home stats hint.

**Q2. The platform's follower count while it's disconnected?** A ★ Hide it / B Keep the last known count.
**Answer:** design both and decide from the screens. See "Conflicts to resolve".

**Q3. An approved creator loses their last connected account?** A ★ Prompt only / B Grace period, then unpublish / C Grace period, then restricted.
**Answer:** B, a grace period and then the shop is unpublished.
- **Q3a. Grace length?** 14 days ★ / 7 / 30. **Answer:** 7 days.
- **Q3b. After they reconnect?** Auto-republish ★ / the creator republishes. **Answer:** auto-republish.

**Q4. An application in review loses its only account?** A ★ Review continues / B On hold. **Answer:** B, the application goes on hold.

**Q5. What do we keep after a revoke?** A ★ Handle and date only / B Plus the last count / C Full stats history. **Answer:** A, the handle and date only.

**Q6. In-app Disconnect?** A ★ Confirm and block the last account / B Confirm, then the 7-day rule / C Leave as is. **Answer:** A.

**Q7. Platforms?** A ★ All four / B A subset. **Answer:** A, all four.

**Q8. What is the connection used for after approval?** A ★ Verification and the follower counts / B Ongoing reach data. **Answer:** A.

**Q9. Who confirms the platform mechanics?** A ★ The backend team, before design / B Design on assumptions. **Answer:** A. *Note 2026-10-13: the connection runs through Phyllo, so this is now "the backend team confirms with Phyllo".*

**Q10. Reconnecting with a different account?** A ★ Allow and log / B Block / C Allow and re-review. **Answer:** B, block it.

**Q11. Partial permissions?** A ★ Partly connected / B Not connected. **Answer:** A.

**Q12. The account is deleted, banned or switched to personal?** A ★ The same "Connection lost" state / B A separate state. **Answer:** A.

**Q13. Expired token or password reset?** A ★ A silent refresh first / B Lost straight away. **Answer:** A. *Note 2026-10-13: with Phyllo, Phyllo does the refresh; we mark the account lost only when Phyllo reports it disconnected or expired.*

**Q14. Side effects during the grace period?** A ★ Nothing else / B Block new sample requests / C Hold all requests not yet approved, and block new ones. **Answer:** C.

**Q15. Admin view?** A ★ Not in MVP / B Yes, an admin list. **Answer:** B.

**Q16. Data sign-off?** A ★ The client's legal contact / B The existing policy covers it. **Answer:** A. *Note 2026-10-13: the sign-off must also cover Phyllo, which stores the creator's platform data.*

**Q17. Design?** A ★ Desktop and mobile / B Desktop first. **Answer:** B, desktop first.
