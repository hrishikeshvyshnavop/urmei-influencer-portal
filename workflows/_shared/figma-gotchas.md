# `use_figma` gotchas in the Work File

These are the lessons from real runs, shared by every Figma skill in this project. Load `figma:figma-use` before any `use_figma` call. This file adds what that skill doesn't cover.

## Before you write

- **Check that ids exist.** Sections get moved, dissolved and copied (the flows page itself was replaced on 2026-09-28). Run `get_metadata` or a read-only script on the page first, and check the locked ids in `workfile.md`. **If a locked id is missing, stop and ask.** A stale id silently protects nothing, and on 2026-09-28 that let two page-wide passes edit the final design.
- **Exclude locked subtrees by ancestry** in every page-wide script:
  ```js
  const LOCKED = ['2320:42706']; // Work File. The final design is the main file's page 794:24650: never call use_figma on that file to write.
  for (const id of LOCKED) if (!(await figma.getNodeByIdAsync(id))) throw new Error('locked id missing: ' + id);
  const isLocked = n => { for (let a = n; a && a.type !== 'PAGE'; a = a.parent) if (LOCKED.includes(a.id)) return true; return false; };
  ```
- **Look for duplicates.** The page has held two copies of a section at once. Confirm with the user which one is current.
- **Desktop frames are read-only** unless the user asks for a desktop change (see `mobile-design-review/references/final-design.md`).

## Script mechanics

- Start every script with `figma.skipInvisibleInstanceChildren = false`. Otherwise `findAll` silently skips instance children in clones, such as tab labels.
- **A failed script rolls back completely.** Fix it and rerun the whole script. Don't patch half of it.
- **Layout reads can be stale in the same script.** After changing `layoutMode`, sizing or visibility, a `height` read in the same pass may still give the old value (on 2026-09-28 this reported a 0 change for a stack that had grown 54). Derive deltas from the children (`row.height - button.height`), or measure in a second read-only call before you shift overlays.
- **"Missing" can mean opacity 0.** Before rebuilding an element that doesn't show, check its `visible` and `opacity`, and its parent's `clipsContent`. Frames copied from a hover state have carried `opacity: 0`: the mobile PDPs' affiliate-link `copy` icon, fixed on 2026-09-28.
- **Hidden nodes don't re-lay-out.** A hidden frame keeps its old size until it's shown. Don't treat its size as a failure.
- **Load fonts before any text write**, including `textAutoResize`, `characters`, and appending text nodes. Load each node's current fonts via `getStyledTextSegments(['fontName'])`. The Status Bar uses SF Pro, which isn't installed, so wrap bulk font loads in try/catch.
- **Don't use `node.query('[name="…"]')`** for names with spaces or symbols. Use `findAll(n => n.name === …)`. Names can carry trailing spaces, so match with `name.trim()`.
- **Changing a property default on a component** can flip instances that relied on the default. After you change a boolean default or a main component's visibility, set every instance's value explicitly.
- **Setting `strokesIncludedInLayout`:** on an auto-layout row with a bottom border, `true` pushes children up by the stroke width. Keep it `false`, and draw per-item underlines on the items.

## Layout traps

- **Fixed-height frames clip new content.** Many desktop pages are `layoutMode: NONE` with a fixed height, and some have a fixed `Wireframe` frame. After you add a block, grow the frame and move the footer. Desktop rule (07.4): `Footer.y = stack bottom − 64` (the footer tucks into the stack's bottom padding), and the frame and the background `Container` end at the footer's bottom.
- **Fixed-height cards collapse gaps.** A vertical card with a fixed height and space-between squashes a new gap to 0. Set `primaryAxisSizingMode = 'AUTO'` (vertical) or `counterAxisSizingMode = 'AUTO'` (horizontal).
- **A FILL-height child in a vertical stack collapses.** When a horizontal row becomes vertical, set its children's `layoutSizingVertical = 'HUG'`.
- **Toast wrappers are bottom-anchored.** `Tost` is a 118px wrapper with `primaryAxisAlignItems: MAX`. A taller toast grows upward (the top goes from 64 to 42, over the status bar).
- **Moving content moves nothing absolute.** Cursors, menus and toasts are `ABSOLUTE` overlays. When a block above them changes height, shift overlays that sit below it, and move overlays that point *into* the block by the target's own delta. A cursor on a dialog belongs to the dialog, so don't move it with the page.
- **A cursor or menu inside a `clipsContent` parent gets clipped.** Re-parent it to the top-level frame, or to a non-clipping ancestor, as ABSOLUTE and keep its absolute position.

## Component traps

- **Swapping a variant keeps the old icon colour.** Copy the icon's `strokes` from a correct instance afterwards.
- **Adapting the success toast** into a warning or error toast: copy the icon stroke across, and set the inner Toast's `itemSpacing` from 108 to 12, with HUG height. Or reuse the finished error toast `2348:55780`.
- **The Button component forces Title Case** on its label.
- **`createSlice()` crops don't render image fills.** Verify images with `get_screenshot` on the frame.

## Recipes

- **Restacking a desktop frame into a mobile one:**
  1. Clone the desktop frame. Find `Header` and `Footer` **by name before** calling `resize(375, h)`.
  2. Insert the Status Bar, Header and Search wrap (see `workfile.md`), then the mobile footer and the Home Indicator.
  3. Set the content padding to 16. Set inner frames wider than 343 to FILL.
  4. Switch side-by-side rows to VERTICAL. Make long card rows horizontal scrolls with `clipsContent`.
  5. Fix fixed heights (AUTO/HUG), fixed-row grids, and FILL-vertical thumbnails.
- **Placing a cursor:** clone `2344:77335` and append it to the top-level mobile frame as ABSOLUTE, at the target's centre minus (21, 9).
- **Replacing a frame with a component instance:** insert the instance at the old frame's index. Copy `layoutSizingHorizontal`, `visible`, the text properties and the prototype reactions (`setReactionsAsync`). Then remove the old frame, and report old → new ids.
