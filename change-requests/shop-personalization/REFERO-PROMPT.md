# Refero pattern search: shop page customisation (MVP)

Written 2026-10-16 for `T-38`. The format follows the Vonnue design skills (`vonnue-design-skills/screenspec/references/refero-context-findings.md`). Refero screens carry fixed tags (Page Types, UX Patterns, UI Elements), and the free-text Layout and Functions fields are what match structure, so the searches mix tags with plain descriptions of the screen.

Paste the prompt below into a Claude session that has the **Refero MCP** connected. The prompt's own steps use `refero_search_screens`, then `refero_get_screen`. For Refero's own search box, use the short queries in "Quick queries" at the end.

---

## Prompt

You are a senior product designer researching references on Refero for a creator storefront feature. Use the Refero MCP: run `refero_search_screens` for each query below, open the strongest results with `refero_get_screen`, and report back. Web platform only.

### What we're designing

URMEI is a creator (influencer) storefront: creators curate beauty products, and shoppers buy from the creator's public shop page. The MVP lets the creator personalise the **top banner** of their shop page:

1. **Pick a backdrop** behind their profile card from preset patterns, including seasonal presets such as Valentine's Day. There are no custom uploads.
2. **Feature up to 2 items** in the banner, next to the profile card: collections (a board with three product photos and "+n products") or single products (with a required one-line note from the creator, up to 80 characters).
3. **Edit it from a side panel** that opens over the live shop preview (Edit Banner → panel with Backdrop and Featured Items sections → Cancel / Save Changes). The panel can also be opened from an "Edit Banner" button on the creator's dashboard.
4. **Empty states:** with nothing featured, shoppers see only the profile card, and the creator's preview shows a dashed "Feature a collection or product" prompt.
5. **The shop page** has two tabs, Picks (the product grid, open by default) and Posts (only reviews for now).

### Find screens for these patterns

Search for each pattern separately, one intent per query. For each, look for 3–5 strong screens from different products.

| # | Pattern | Search for | Why we need it |
|---|---|---|---|
| A | **Customise your page in a side panel with live preview** | storefront or profile editor with a right-side settings panel; theme customiser; "customize" panel over a live page; page builder sidebar | Our core interaction: edit next to the live shop |
| B | **Pick a background or theme from presets** | theme picker; background pattern selector; cover/banner style picker; swatch grid with a selected state and a "Default" label | Our backdrop chooser (5 presets, one seasonal) |
| C | **Feature or pin items in a hero or banner** | featured products in a profile header; pinned collection on a creator page; "featured" slot picker; select items to showcase (max N) | Our "up to 2 featured items" with a limit |
| D | **Pick items from your own content in a dialog** | choose products or collections modal; item picker with search, checkboxes and a selection limit ("2 of 2 selected") | The step after "Add Featured Item" |
| E | **Creator or seller profile header on a public shop** | creator storefront header; link-in-bio shop page; seller profile with banner, avatar, bio, follow, share link | How the banner reads to shoppers |
| F | **Empty slot or prompt that only the owner sees** | "add a section" placeholder; dashed empty slot with a CTA in edit mode; owner-only hint on a public page | Our dashed "Feature a collection or product" box |
| G | **Discoverable "edit / customise" entry point on a dashboard** | "Customize page" or "Edit profile" button on a dashboard card next to "View" or "Preview" | The Edit Banner button on My Shop |
| H | **Seasonal or promotional theming** | seasonal theme, holiday skin, campaign banner on a shop | The Valentine's Day preset |

Good sources to check first: creator and link-in-bio tools (Shopify themes and Shop app, Linktree, Beacons, Stan Store, Gumroad, Koji, Pinterest profiles, Etsy shop editor, Squarespace and Wix editors, Framer, Notion page covers, LTK and Amazon Influencer storefronts).

### What to return: one Refero screen per pick

Return every screen you pick (3–5 per pattern) in **Refero's own screen format**, exactly as `refero_get_screen` returns it. Copy the fields as they come back; don't rewrite or shorten them. Group the screens under a `## Pattern <letter>: <name>` heading for each pattern A–H, and end each screen with `---`. Each screen is:

```markdown
## Screen: <refero uuid>

- **Platform**: web
- **Page URL**: <live page>
- **Preview URL**: https://images.refero.design/screenshots/<domain>/desktop/<id>_preview.jpg
- **Thumbnail URL**: https://images.refero.design/screenshots/<domain>/desktop/<id>_thumb.jpg
- **ReferoURL**: https://refero.design/pages/<uuid>
- **Page Types**: <as Refero returns them; leave the line out if Refero has none>
- **UX Patterns**: <as Refero returns them; leave the line out if Refero has none>
- **UI Elements**: <as Refero returns them>
- **Fonts**: <as Refero returns them>
- **Colors**: 0xRRGGBB, 0xRRGGBB, 0xRRGGBB, 0xRRGGBB, 0xRRGGBB

### Content
- **Description**: <Refero's Description, verbatim>
- **Layout**: <Refero's Layout, verbatim>
- **Functions**: <Refero's Functions, verbatim>

### Flows
- <only if Refero returns one: "<Flow name> (Step N of M, Flow ID: …)"; otherwise leave the section out>

### Site
- **ID**: <site id>
- **Name**: <brand>
- **ReferoURL**: https://refero.design/websites/<site id>
- **Domain**: <domain>
- **Categories**: <as Refero returns them>
- **Description**: <the site tagline>

### Relevance to URMEI
- **Use**: <what to take from this screen for our banner editor, in one or two lines>
- **Avoid**: <what doesn't fit our decisions: side panel over the preview, preset backdrops only, max 2 featured items, required 80-character note, owner-only empty prompt>

---
```

Everything above `### Relevance to URMEI` is Refero's data, unchanged (the format matches the Column example, `refero.design/pages/77562542-41af-48f2-8fd9-58a743ff7e79`). `### Relevance to URMEI` is the only part you write yourself.

After the screens for each pattern, add **Pattern summary**: the common solution across its screens, in two sentences.

Then finish with:
- **Top 5 screens overall** to look at first, with their links.
- **Conflicts:** anything in the references that argues against a decision we've made, such as panels that push the page instead of covering it (our panel currently covers the featured slot), or inline editing on the page instead of a panel.
- **Copy we could borrow:** short labels for "Edit Banner", "Feature a collection or product", "Add Featured Item", "Maximum 2", and the seasonal tag.

Rules (from `screenspec/references/refero-context-findings.md`):
- Keep Refero's fields verbatim, including its tag names. Don't fix or translate them.
- The hex colours inside Refero's Description are AI guesses that never match its measured `Colors` field. Use `Colors` for real values, and say so if you quote a hex from Description in "Relevance to URMEI".
- Don't invent screens, links, tags or copy. If Refero leaves out a field, leave it out too (Page Types, UX Patterns, Fonts, Colors and Flows are sometimes missing).
- If a pattern has no good matches, say so, and list the queries you tried.
- Save the result as `change-requests/shop-personalization/refero-screenspecs.md`.

---

## Quick queries (for Refero's search box)

One per line, each a single intent:

- customize storefront side panel
- theme customizer live preview
- background pattern picker
- banner style selector
- featured products profile header
- pin collection to profile
- select items modal limit
- link in bio shop page
- creator storefront header
- empty state add section
- edit profile button dashboard
- seasonal theme shop
