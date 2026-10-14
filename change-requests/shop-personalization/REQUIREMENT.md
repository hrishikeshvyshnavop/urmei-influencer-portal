# Shop personalization: client requirement

Received about 2026-10-09 (the thread showed "3 days ago" on 2026-10-12). Status: **internal review (2026-10-12).** It's post-MVP: the client asked for a draft flow to show the idea, not a build. There's an HTML concept board with six ideas, and three of them have desktop Figma drafts. They went to Rayboy and Neethu KU to pick 2–3 to develop further. No code yet. Tracked as `T-33` in `TRACKER.md`.

Links: this follows on from Collections (`T-31`, `change-requests/collections/REQUIREMENT.md`). Its post-MVP item, "photos, videos, etc.", was left **Undecided** there, and this thread picks it up. It touches the storefront's creator card (`src/shop/components/StorefrontProfileCard.tsx`).

## Client thread (verbatim)

Nelson Seh (client), replying to Neethu KU:

> @Neethu KU It would also be great if you can draft a post MVP flow to envision this with creators being able to add their own photo/video content like Pinterest. Add some personalization features for background banners, etc. An example to use as a reference is we want creators to be able to curate their own shop like how a physical shop layout works. When you enter a shop, normally what shops do is they place the newest/freshest products right in front of the entrance depending on what they want to promote. And the whole ambience of the shop can also be decorated based on an ongoing promotion or seasonal holiday. that's the general idea we want to bring to life

Neethu KU, 3 days ago:

> @Nelson Seh sure, we can do that. Just one clarification: which component are you referring to as the background banner in your comment?
> Currently, we don't have a banner component in the design.

Nelson Seh, 3 days ago:

> @Neethu KU was referring to the grey background banner in the creator's profile that we show on the creator's shop. But if you have other ideas for personalizing the shop please suggest as well. that idea was just top of mind

Neethu KU, 3 days ago:

> I understand what you're trying to achieve. Let me brainstorm and come up with a few ideas to achieve this goal.

## What was asked

A **post-MVP draft flow**, a vision piece rather than a build commitment. The goal is to let a creator curate their shop the way a physical store is laid out.

| # | Idea | Source |
|---|---|---|
| 1 | Creators add their **own photo and video content**, Pinterest-style, alongside products | Client |
| 2 | **Personalise the background banner**: the grey panel behind the creator's profile card on the storefront (`StorefrontProfileCard`, `bg-surface-secondary-300`) | Client, clarified |
| 3 | **"Front of the store"**: the creator chooses what shoppers see first (the newest products or a current promotion) | Client, via the shop analogy |
| 4 | **Seasonal or promotional theming**: the shop's whole look changes for an ongoing promotion or holiday | Client, via the shop analogy |
| 5 | **Other personalisation ideas from us**: the client explicitly invited suggestions | Client |

Our side has committed to brainstorming ideas and coming back with options.

## Relation to agreed Collections answers

- Collections are ordered by the creator with ‹ › arrows, and there's no hide feature. A "front of the store" slot (#3) has to sit alongside that order, not contradict it. Flag any conflict before designing.
- Collections have no cover image (first few product images). Photo/video content (#1) may reopen that.
- The Collections MVP doesn't cover stats or the activity log. The same goes for this request unless the client asks.

## Concept board (2026-10-12)

An HTML concept board for internal review, built before any Figma work: https://claude.ai/artifact/8B7nPcVULVqEfVUv9mVU9m (private until shared). It shows six concepts on a live storefront mock, with a desktop/mobile toggle:

| Key | Concept | Answers | Effort | Suggested |
|---|---|---|---|---|
| A | Custom banner (colour, pattern, photo) | Client: background banner | S | Phase 1 |
| B | Shop window (1–3 products under the profile, each with the creator's note; see below) | Client: newest products at the entrance | M | Phase 1 |
| C | Seasonal themes (URMEI-made: banner, accent, promo ribbon, dates) | Client: decorate for a promotion or holiday | M | Phase 2 |
| D | Posts (Pinterest-style photos, videos and notes with product tags) | Client: photo/video content | L | Phase 3 |
| E | Shop floor plan (reorder sections with arrows, toggle optional ones) | Our idea | S | Phase 1 |
| F | Announcement bar (one line, up to 80 characters, end date) | Our idea | S | Phase 1 |

The phases are a suggestion and haven't been agreed with the client.

**Shop window, version 2 (2026-10-12):** redesigned on the board (`#window` opens it directly).
- **Layouts:** three to choose from.
  - **Spotlight** (default): the creator's photo on the left with the headline and end date, and a "shelf" of product cards on the right.
  - **Trio:** three equal tiles, each with the creator's note over the image.
  - **Single feature:** one hero product with the note as a quote, Add to bag and View product, and "Also in the window" thumbnails.
- **Creator notes:** a one-line note per product, in the creator's own words.
- **Label:** New in, Back in stock, On sale or Limited. A running seasonal theme overrides it.
- **End date:** tomorrow, in n days, or none.
- **Buying:** Add to bag straight from the window, with sale prices shown crossed out.
- **Mobile:** Spotlight and Single feature stack, and Trio becomes a swipeable row.

It isn't in Figma yet. Spotlight would be flow 04.

## Figma (Work File)

Top-level section `[Influencer] Shop Personalization (Post-MVP) | 12.10.26` `2903:78274` on the flows page `2650:50683`. It's a draft for review, not locked.

| Flow | Sub-section | Frames | Status |
|---|---|---|---|
| 01 - Posts on the Storefront (concept D) | `2903:78275` | `01.0` Cover `2903:78276` · `01.1` Storefront With Posts — Desktop `2903:78285` (cloned from Collections 16.1 `2757:65132`, which matches the main file's `1862:82376`) | Desktop draft, 2026-10-12. No mobile yet. |
| 02 - Announcement Bar (concept F) | `2910:78536` | `02.0` Cover `2910:78537` · `02.1` Storefront With Announcement — Desktop `2910:78546` (from 16.1 `2757:65132`) | Desktop draft, 2026-10-12. No mobile or creator-side editor yet. |
| 03 - Custom Banner (concept A) | `2921:78784` | `03.0` Cover `2921:78785` · `03.1` Photo Banner — Desktop `2921:78798` · `03.2` Colour Banner (Sage) — Desktop `2921:79268` | Desktop draft, 2026-10-12. Done as instance overrides on the `Influencer Profile Card`; a real build would add a banner property to the component. No pattern banner, mobile or creator-side picker yet. |

**Lead review section (2026-10-12):** `[Influencer] Shop Personalization (Post-MVP) — Lead Review | 12.10.26`, `2996:103805`. It's the user's own section. Its flows run left to right, each with a cover:
- **01 Posts:** cover `2903:78276`, frame `2903:78285`, 4 annotations.
- **02 Announcement Bar:** cover `2910:78537`, frame `2910:78546`, 2 annotations.
- **03 Persistent Banner:** cover `3000:80673`, then:
  - `03.1` Photo Backdrop Behind Card `2996:102574`: the recommended direction. A full-width photo behind the profile card, with the card untouched. 2 annotations, `3000:80682` and `3000:80688`.
  - `03.2` Photo Inside Card `2996:103398`: shown as an alternative for comparison. It changes the card, which is why it isn't recommended. 1 annotation, `3000:80694`. Its header and breadcrumb order was fixed.

The old section `2903:78274` now holds only `03 - Custom Banner` `2921:78784`.

In 01.1, `Section / Posts` `2903:78750` sits between Collections and Reviews. It's a 4-column wall of photos, videos (play button and length) and text notes. Photos carry product-tag dots, and each post has a "Shop n products" row. Four Info annotations explain it.

**Review meeting (2026-10-12):** the banner stays **persistent**: it is always on the storefront, and creators can't remove it. Only its vibe changes. **The `Influencer Profile Card` itself is never changed** (user, 2026-10-12): every theme is a layer placed *over* the card. The card keeps its grey `surface` fill, bound to its variable, and all its content.

- **`01.1` `2983:100162`, default vibe:** `Banner Overlay / Warm (over card)` `2992:80216` is an absolute frame above the card in `Stack / Charlotte`. Its warm gradient is in Multiply blend and transparent on the left, so the avatar and text are untouched.
- **`01.2` `2989:79952`, Chinese New Year:** placed to the right of `01.1`. The team's reference, `2981:113463`, turns the whole top of the page red: a campaign strip, a red band around the card, arcs and coins. This version keeps the season inside the banner instead. `Season Overlay / Chinese New Year (over card)` `2989:80327` sits above the card and holds:
  - a blush gradient (Multiply), fading in from the right
  - a gold coin-ring lattice (Multiply, masked so it fades out before the name)
  - two lanterns hanging from the top edge
  - a `Season chip` `2989:80570` reading "Chinese New Year Edit · until 21 Feb", with the library sparkles icon
  
  Nothing else on the page changes. Two annotations, `2990:80230` (left) and `2990:80236` (right), cover: the banner is persistent and only its look changes; URMEI supplies the themes; the theme switches off on its end date; the art stays on the right so the text remains readable.

- **`01.1` clean copy `2991:100937` (user's frame, 2026-10-12), the current direction:** the season goes **outside the banner**, never on the card. `Season Backdrop / Chinese New Year (behind card)` `2995:80455` is an absolute frame at the back of the page frame, from under the header to 36px below the card. It holds:
  - a gradient that starts light behind the breadcrumb, so it stays readable, and turns lacquer red from the card's top edge
  - a gold coin-ring lattice and two lanterns on each side of the card
  - a `Season ribbon` in the gutter under the card: "Chinese New Year Edit · Charlotte's picks for the season · Until 21 Feb"
  
  The card `2991:100979` and its contents are untouched. The earlier on-card overlay, `2993:80462`, was removed.

**Background themes board (2026-10-12):** `[Influencer] Shop Personalization — Background Themes | 12.10.26`, `3019:81003`, below the lead review section. Each tile is a 1440 × 500 crop of the clean storefront `3001:103829`. The theme is a `Backdrop / … (behind card)` frame, 372px tall, placed absolute behind the page from under the header to 56px below the card. The card is untouched. Art sits in the side gutters and the strip under the card, and the area behind the breadcrumb stays light. Every tile has an Info annotation. All art is vector, with no AI images (user's choice).
- **`04 - Default Backdrops` `3019:81004`:** cover `3019:81005`. Six tiles:
  - Warm Linen `3019:81014`
  - Botanical Line `3019:81395`
  - Soft Arches `3019:81770`
  - Creator Tint `3019:82145` (colours taken from the creator's photo)
  - Silk Wave `3019:82520`
  - Speckle `3019:82895`
  - Nine more patterns, added later the same day on a flat pale base with no top fade:
    - Awning Stripes `3027:82320`
    - Gingham `3027:82398`
    - Polka Dots `3027:82501`
    - Ripple Lines `3027:82966`
    - Foam Bubbles `3027:83048`
    - Petal Blooms `3027:83245`
    - Glow Sparkles `3027:83530`
    - Monogram `3027:83642` (the creator's initial)
    - Sunburst `3027:83865`
    
    Sections 05 and 06 moved down to make room.
- **`05 - Seasonal Backdrops` `3019:83270`:** cover `3019:83271`. Six tiles, each with a `Season ribbon` (a clone of the season chip) under the card:
  - Chinese New Year `3019:83280` (redrawn in this system)
  - Christmas `3019:83655`
  - Hari Raya `3019:84030`
  - Deepavali `3019:84405`
  - 11.11 Mega Sale `3019:84780`
  - Valentine's Day `3019:85155`

- **`06 - Backdrop Edge Alternatives` `3023:81841`:** alternatives to the top fade from the page colour into the theme colour, all on Chinese New Year. Cover `3023:81842`. Five tiles:
  - Current Top Fade, for reference `3023:81851`
  - Hard Split: colour from the card's midline `3023:82079`
  - Full Bleed + Light Breadcrumb `3023:82308`
  - Shaped Edge: scallops at the card's top `3023:82614`
  - Framed Panel: a rounded inset panel with a white breadcrumb `3023:82843`

**Shortlist (user, 2026-10-12):** the user's own `Section 1`, `3028:68275`, holds copies of the chosen tiles:
- **Defaults:** Speckle `3026:65896`, Botanical Line `3026:66193`, Gingham `3028:66957`, Petal Blooms `3028:67110`, Ripple Lines `3028:67445`.
- **Season:** Valentine's Day `3028:68106`.
- **Edges, both on Chinese New Year:** Full Bleed + Light Breadcrumb `3028:67577` and Hard Split `3028:67859`.

The Botanical Line copy's art was redrawn on 2026-10-12, inside its backdrop `3026:66194`:
- **Sprigs:** leaves are attached along a curved stem, each with a midrib, plus a tip leaf.
- **Eucalyptus:** a round-leaf sprig.
- **Citrus:** slices with a rind, pith and eight segments.
- **Droplets:** upright, with a highlight.
- **Spacing:** motifs keep an even minimum distance in the gutters and strips, and none are clipped at an edge.

The Petal Blooms copy `3028:67110` was also redrawn, inside its backdrop `3028:67111`:
- **Flowers:** five separate petals, each with a pointed base and a rounded tip, a fine petal line, a centre and five stamen dots.
- **Variety:** buds with sepals, and sage leaf pairs.
- **Spacing:** the same even spacing as Botanical Line, with no clipping and the breadcrumb left clear.

The Valentine's copy `3028:68106` got a new gradient in its backdrop `3028:68107`. The cream strip and the sudden switch to pink are gone, and so is the muddy rose at the bottom. In their place:
- A full-bleed blush gradient from `#FCE7EB` to `#F9D3DA` to `#F4BCC7`.
- Three soft radial glows: deeper rose at the bottom right, rose on the left, and a white lift at the top centre.

The breadcrumb stays dark and readable on the light top.

Not yet drawn: mobile, and the creator's opt-out control.

**Client delivery section (2026-10-13):** the user's `Section 3`, `3086:71893`, is now `[Influencer] Shop Personalization (Post-MVP) — Client Delivery | 13.10.26`. It holds seven numbered sub-sections, stacked 200px apart, each opening with a cover:

| Flow | Sub-section | Contents |
|---|---|---|
| 01 - Posts on the Storefront | `3089:84676` | Cover `2903:78276`, `01.1` `2903:78285`, 3 annotations |
| 02 - Announcement Bar | `3089:84677` | Cover `2910:78537`, `02.1` `2910:78546`, 2 annotations |
| 03 - Persistent Banner | `3089:84678` | Cover `3000:80673`, `03.1` `2996:102574` (recommended), `03.2` `2996:103398` (alternative), 2 annotations |
| 04 - Default Backdrops | `3089:84679` | New cover, plus the shortlisted tiles: `04.1` Speckle `3026:65896`, `04.2` Botanical Line `3026:66193`, `04.3` Gingham `3028:66957`, `04.4` Petal Blooms `3028:67110`, `04.5` Ripple Lines `3028:67445` |
| 05 - Seasonal Backdrop | `3089:84719` | New cover, plus `05.1` Valentine's Day `3028:68106` |
| 06 - Backdrop Edges | `3089:84735` | New cover, plus `06.1` Full Bleed + Light Breadcrumb `3028:67577` and `06.2` Hard Split `3028:67859` (both on Chinese New Year) |
| 07 - Hero Band | `3089:84757` | New cover, plus `07.1`–`07.3`: the three slides `3068:84319`, `3068:84785`, `3068:85165`. `07.4` `3097:84796` is a generic version of slide 3 ("Most loved · My most-loved picks · Shop Bestsellers"), with two Info notes: `3097:85618` says it's an exploration only, and `3097:85624` proposes how the creator manages slides (My Shop → Customise shop → Hero band) |
| 08 - All Personalization Together | `3096:84511` | Cover `3096:84512`, plus `08.1` `3096:84521`: one storefront with everything at once. It's a clone of `01.1` with the announcement bar, then the hero band (slide 1, Ripple Lines backdrop) in place of the profile card (the old card is hidden), then Collections, Posts, Reviews and All Picks. 5 Info annotations. |

Each tile in 04–06 carries a clone of its Info annotation from the Background Themes board. The hero band has no annotations yet.

Renamed frames (old → new):
- `04.6`/`04.2`/`04.8`/`04.12`/`04.10` Default Backdrop → `04.1`–`04.5` Default Backdrops
- `05.6` → `05.1`
- `06.3` → `06.1`; `06.2` keeps its number
- "Ripple Lines / Hero Band — Final — Slide n" → `07.n Hero Band — Slide n, <title> — Desktop`

The emptied sections (`2996:103805`, `Section 1` `3028:68275`, `Section 2` `3062:69715`) are hidden beside it, not deleted. The duplicate `03.1` frame `3085:85696` was moved out next to them and is still visible.

## Code it would touch (later, if built)

- `src/shop/components/StorefrontProfileCard.tsx`: the banner behind the profile card
- `src/shop/screens/StorefrontPreview.tsx` and `src/shop/screens/StandaloneStorefront.tsx`: storefront layout, front-of-store slot, theming
- My Shop (`src/shop/`): the creator-side controls for banner, theme and content
- A new persisted record for banner/theme/media (localStorage, like the other `*-status.ts` modules)

## Review round (internal)

Message to Rayboy and Neethu KU, drafted 2026-10-12 (final version):

> @Rayboy @Neethu KU Some post-MVP ideas for personalising creators' storefronts, from Nelson's comment. Which 2–3 should I develop further?
>
> 🎨 https://www.figma.com/design/FdmVPJo1j4t8s9gej1H7Yb/?node-id=2903-78274
> 🧪 https://claude.ai/artifact/8B7nPcVULVqEfVUv9mVU9m

Before it goes out, the concept board has to be shared from its Share menu (it's private), and both of them need access to the Work File.

**Waiting on:** which 2–3 concepts to take further. **Then:**
1. Mobile versions of the chosen flows.
2. The creator-side screens (My Shop → Customise).
3. A client message to Nelson.

## Open questions

These are to walk through one at a time (change-request step 2) once the concepts are picked. None is answered yet. Each one comes from its concept on the board.

| Concept | Question |
|---|---|
| A Custom banner | Can creators upload any photo, or only choose from colours and patterns URMEI provides? |
| B Shop window | Are the per-product notes required, or optional with no note shown when empty? |
| C Seasonal themes | Can URMEI switch a theme on for every creator at once, for a platform-wide sale like 11.11? |
| D Posts | Do photos and videos need review by URMEI before they go live? |
| E Shop floor plan | Which sections are fixed in place, and which can creators move or turn off? |
| F Announcement bar | Can the bar link to outside websites, or only to things inside the shop? |
| All | If several are taken, should we cap how many can show at the top of the shop (announcement, ribbon, banner, window) at once? |

Defaults in the Figma annotations are proposals, not decisions: video up to 60 s and muted in place, commission on post sales, 80-character announcements that stay closed once dismissed, a 1200 × 200 banner photo, five banner colours, and automatic light text.
