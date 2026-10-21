# Mobile plan — [Influencer] Profile Settings & Notification (`2375-62087`)

> **Archived 2026-09-28: built.** Kept for history. Node ids predate the page move; see `../../../_shared/workfile.md` for current ones.

Status: **built** (2026-09-25). See the catalog entry in `existing-mobile-screens.md`. This follows the `/mobile-screen` new-flow workflow, steps 1–3.

## Decisions (user)

- **Placement:** build **inside this section**, 50px beside each desktop. Run `/organize-flow` on it afterwards.
- **Notifications:** a **full-screen panel** (375 wide, header "NOTIFICATIONS" + ✕) over a dimmed My Shop mobile.
- **Footer:** **add the mobile footer** `2321-52957` to the Manage Account screens. This means adding it to the reused `2004-22278` / `2024-22599` copies too.
- **Wording:** "Favorite", title case, as elsewhere. Cursors mirror the desktop's.

## Sources to reuse

- **Manage Account template:**
  - `2004-22278` (Profile — Mobile) and `2024-22599` (Social Accounts — Mobile). Each has Status Bar, Header, bank-details `notification-banner`, the breadcrumb, "Manage Your Account", and a **tab strip** (Profile · Addresses · Social Accounts · Bank Details) in place of the desktop's left-hand menu.
- **Sheets:** the bottom-sheet `popup` from `2230-77536` / `2366-61376`.
- **Fields:** text fields from `2004-22278`, and mobile address rows from the Apply form (`2126-17660` area).
- **Underlay for notifications:** My Shop `2368-62138` (700 · 700 · S$845 · S$845 · S$0, matching the desktop underlay).
- **Chrome and parts:** mobile footer `2321-52957`, cursor `2344:77335`, success toast `2332-38320`, error toast `2348-55780`.

## Screens

| # | Desktop | Bucket | Mobile |
|---|---|---|---|
| 01.1 | Notifications — Empty State `2375-62091` | Adapt + New | Panel restacked from the desktop drawer: bell + "No Notifications Yet!" |
| 01.2 | Notifications — With Items `2375-62170` | Adapt | Panel with date groups, icon wells, times, and unread tint |
| 02.1 | Profile — Edit Form `2375-62289` | Reuse | `2004-22278` checked against the desktop, plus the footer |
| 02.2 | Social Accounts — Connected `2375-62554` | Reuse | `2024-22599` checked, plus the footer |
| 02.3 | Bank Details — Empty State `2375-62447` | Adapt | Bank Details tab selected, with the desktop's empty state restacked |
| 02.4 | Bank Details — Add Details Modal `2375-62488` | Adapt | Full-height bottom sheet with the bank form in one column and Cancel / Save |
| 02.5 | Bank Details — Connected `2375-62382` | Adapt | Bank account card restacked, with edit and delete |
| 02.6 | Addresses — empty state `2375-62627` | Adapt | Addresses tab with the "No address added" empty state |
| 02.7 | Add address — first address `2375-62662` | Adapt | Sheet with the address fields and the shipping/billing checkboxes |
| 02.8 | Addresses — Set As `2375-62735` | Adapt | Address cards with the Set As menu open, and the **cursor** |
| 02.9 | Set As pop-up `2375-62881` | Adapt | Small bottom sheet with the default shipping/billing checkboxes |
| 02.10 | Addresses — set `2375-62813` | Adapt | Cards with the Default badges |

The rows follow `/organize-flow`:
- **Row 1:** Notification.
- **Row 2:** Profile & Settings happy path (02.1–02.5).
- **Row below that:** the Address sub-flow (02.6–02.10).

The stray loose text `2375-62626` ("Bank details") gets flagged, not deleted.
