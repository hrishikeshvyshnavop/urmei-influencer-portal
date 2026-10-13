# Social account revoked from the platform: answers

What happens when a creator removes URMEI's access from Instagram, Facebook, YouTube or TikTok. Agreed 2026-10-13 (`T-35`). The full reasoning is in `change-requests/social-disconnect/REQUIREMENT.md`.

| # | Question | Answer |
| --- | --- | --- |
| 1 | How the creator finds out | Manage Account row, notification, email (with day-3 and day-7 reminders), Home banner, warning dots, login pop-up, stats hint |
| 2 | Follower count while disconnected | Decided from two designs: hide it, or keep the last known count |
| 3 | Last connected account lost | 7-day grace period, then the shop is unpublished; it republishes automatically when they reconnect |
| 4 | Application in review | Goes on hold until they reconnect |
| 5 | Data kept after a revoke | Handle and disconnect date only |
| 6 | Disconnect inside URMEI | Confirmation dialog; the last account can't be disconnected |
| 7 | Platforms | All four |
| 8 | Use after approval | Verification and follower counts only |
| 9 | Platform mechanics | Backend team confirms before design |
| 10 | Reconnecting with a different account | Blocked; it must be the same account |
| 11 | Some permissions refused | Still connected, with the stats we can read |
| 12 | Account deleted, banned or made personal | Same "Connection lost" state |
| 13 | Expired token or password reset | Silent refresh first; lost only if that fails |
| 14 | During the grace period | New sample requests blocked; requests not yet approved on hold |
| 15 | URMEI team view | Admin list of lost connections with the countdown |
| 16 | Data handling sign-off | Client's legal/privacy contact |
| 17 | Design | Desktop first, mobile after approval |

## Answers

1. **How the creator finds out:** the account's row in Manage Account shows "Connection lost on <date>" with Reconnect. They also get a notification, an email with a Reconnect link (reminders on day 3 and day 7), a Home banner, warning dots on the avatar and settings, a pop-up at their next sign-in, and a hint on Home where the follower count was.
2. **Follower count:** we'll show two designs, one that hides the count and one that keeps the last known number with its date, and decide from those.
3. **Last account lost:** the creator has 7 days to reconnect. After that the shop is unpublished. When they reconnect, it goes live again automatically.
4. **Application in review:** it goes on hold, and the creator is asked by email to reconnect.
5. **Data:** we delete the access and the synced stats, and keep only the handle and the date it was lost.
6. **Disconnect inside URMEI:** a confirmation step, and the last account can't be disconnected until another one is connected.
7. **Platforms:** Instagram, Facebook, YouTube and TikTok.
8. **Use:** the connection verifies the creator and shows follower counts; brands don't rely on it.
9. **Mechanics:** the backend team confirms how each platform reports a removal before design starts.
10. **Different account:** reconnecting must use the same account.
11. **Partial permissions:** still connected; we show what we can read.
12. **Deleted or banned account:** the same "Connection lost" state; the creator connects another platform.
13. **Expiry:** we refresh quietly first, and only report it as lost if that fails.
14. **Grace period:** new sample requests are blocked, and requests not yet approved are on hold. Approved ones and payouts carry on.
15. **URMEI team:** an admin list shows creators with lost connections and the days left.
16. **Sign-off:** your legal/privacy contact approves the data handling. We'll send the list of what's stored and deleted.
17. **Design:** desktop first, then mobile.
