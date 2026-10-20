---
name: laws-of-ux
description: Check a URMEI screen, flow or component against the 30 Laws of UX (lawsofux.com) and name the laws a design keeps or breaks. Use when designing or reviewing a screen in Figma or code, or when a design decision needs a UX principle behind it.
---

# Laws of UX

A reference of the 30 principles collected on [lawsofux.com](https://lawsofux.com/), each summarised in our own words with what it means for URMEI. It isn't a copy of the site: follow a law's link for the full article, its origins and further reading.

## How to use it

1. **When designing** a screen or flow (`change-request`, `mobile-screen`, `responsive-flow`), skim the groups below that touch your screen before you build: choices, layout, feedback, memory.
2. **When reviewing** (`mobile-design-review`, Figma comment replies), cite a law by name when a finding rests on one, e.g. "Fitts's Law: the Remove icon is a 16px target next to Edit". Name the law, the element and the fix. Don't cite laws to decorate a finding that stands on its own.
3. **When laws pull against each other**, say so and pick. Two examples: Hick's Law (fewer options) vs Tesler's Law (complexity has to live somewhere), and the Aesthetic-Usability Effect (polish hides problems) vs real usability testing.

## Perception and grouping (Gestalt)

| Law | In short | For URMEI |
| --- | --- | --- |
| [Law of Proximity](https://lawsofux.com/law-of-proximity/) | Things placed close together read as one group. | Spacing does the grouping: keep a label tight to its field and a gap between form sections, rather than adding dividers. |
| [Law of Common Region](https://lawsofux.com/law-of-common-region/) | Things inside a shared border or background read as one group. | Cards (product, collection, stat tiles) bound related content. Don't put unrelated actions inside a card's boundary. |
| [Law of Similarity](https://lawsofux.com/law-of-similarity/) | Things that look alike are seen as related, even when apart. | Same component, same meaning: a link styled as a button (or the reverse) breaks this. Use the `Button` variants consistently. |
| [Law of Uniform Connectedness](https://lawsofux.com/law-of-uniform-connectedness/) | Things joined by lines, frames or a shared colour feel strongly related. | Steppers, timelines and connected tabs: the visual link should match the real relationship. |
| [Law of Prägnanz](https://lawsofux.com/law-of-pr%C3%A4gnanz/) | People read complex or ambiguous shapes as the simplest form they can. | Prefer simple, recognisable icons and shapes. A busy illustration in an empty state gets read as noise. |

## Choices and decisions

| Law | In short | For URMEI |
| --- | --- | --- |
| [Hick's Law](https://lawsofux.com/hicks-law/) | The more options there are, and the harder they are, the longer a decision takes. | Keep menus short (`ItemMenu`, profile menu). Break long setup into steps, and put the recommended choice first. |
| [Choice Overload](https://lawsofux.com/choice-overload/) | Too many options overwhelm people and can stop them choosing at all. | Catalogue and filters: give sensible defaults, sort and filter rather than showing everything, and allow side-by-side comparison. |
| [Occam's Razor](https://lawsofux.com/occams-razor/) | When options work equally well, choose the one with the fewest assumptions. | Cut any element, step or field that doesn't earn its place. Ask "what can we remove?" before "what can we add?". |
| [Pareto Principle](https://lawsofux.com/pareto-principle/) | Most of the effect usually comes from a small share of the causes. | Spend design and build effort on the few flows creators use most: add to shop, share the storefront, sample requests. |
| [Tesler's Law](https://lawsofux.com/teslers-law/) | Every system has some complexity that can't be removed, only moved. | Let the system carry the complexity: prefill, sensible defaults, auto-formatting. Don't hand it to the creator. |
| [Cognitive Bias](https://lawsofux.com/cognitive-bias/) | People make systematic thinking errors that shape what they perceive and choose. | Be aware of anchoring, defaults and framing in stats and pricing copy. Don't use them to manipulate (no dark patterns). |

## Interaction and targets

| Law | In short | For URMEI |
| --- | --- | --- |
| [Fitts's Law](https://lawsofux.com/fittss-law/) | Bigger, closer targets are faster to hit. | Touch targets of at least 44×44 on mobile, with enough space between neighbouring actions. Put primary actions where the hand or cursor already is. |
| [Doherty Threshold](https://lawsofux.com/doherty-threshold/) | People stay engaged when the system responds in under about 400ms. | Give instant feedback (pressed state, optimistic update, skeleton or spinner tile) even when the work takes longer. There's no backend, so mocked delays should still show this feedback. |
| [Postel's Law](https://lawsofux.com/postels-law/) | Be flexible about what you accept and strict about what you send back. | Forms accept many input formats (phone numbers, spaces, pasted URLs), normalise them, and show one clean format back. |
| [Paradox of the Active User](https://lawsofux.com/paradox-of-the-active-user/) | People skip instructions and start using the product straight away. | Put guidance inline, in context (helper text, empty states, first-use hints). Never rely on a help page being read. |
| [Flow](https://lawsofux.com/flow/) | People do best in a state of focused, absorbed effort, with the challenge matched to their skill. | Remove interruptions mid-task (unnecessary modals, confirmation spam). Give clear feedback and keep the next step obvious. |

## Memory and attention

| Law | In short | For URMEI |
| --- | --- | --- |
| [Cognitive Load](https://lawsofux.com/cognitive-load/) | Every bit of mental effort the interface demands takes away from the user's actual goal. | Strip decoration that doesn't inform. Reuse familiar patterns, and show only what's needed for the current step. |
| [Working Memory](https://lawsofux.com/working-memory/) | People can hold only a little information in mind at once, and only briefly. | Don't make users carry facts between screens: show the selected product in a dialog (`DialogProductSummary`) and keep context visible. |
| [Miller's Law](https://lawsofux.com/millers-law/) | Short-term memory holds roughly 7 (±2) items, so chunk content. | Treat the number as a reason to chunk, not a hard cap on menu items. Group long lists and numbers (account numbers, codes). |
| [Chunking](https://lawsofux.com/chunking/) | Breaking content into small, meaningful groups makes it easier to take in. | Section headings, grouped form fields, and cards over walls of text. |
| [Selective Attention](https://lawsofux.com/selective-attention/) | People focus on what serves their goal and filter the rest, so anything that looks like an ad gets ignored. | Important notices mustn't look like promotional banners. Avoid change blindness: flag changes clearly, with a toast or highlight. |
| [Serial Position Effect](https://lawsofux.com/serial-position-effect/) | People remember the first and last items in a list best. | Put key nav items and actions at the start and end of a bar or list, and the least important in the middle. |
| [Von Restorff Effect](https://lawsofux.com/von-restorff-effect/) | The item that stands out from its neighbours is the one people remember. | One primary button per view. Use emphasis sparingly so it still means something, and never rely on colour alone (accessibility). |
| [Zeigarnik Effect](https://lawsofux.com/zeigarnik-effect/) | Unfinished tasks stay on the mind more than finished ones. | Profile setup and collections nudges: show progress and what's left. The setup banner is the existing pattern. |

## Expectations and mental models

| Law | In short | For URMEI |
| --- | --- | --- |
| [Jakob's Law](https://lawsofux.com/jakobs-law/) | Users spend most of their time on other sites and expect yours to work the same way. | Follow common e-commerce and creator-tool conventions (cart-like add flows, share links, kebab menus). When changing a familiar pattern, ease users into it. |
| [Mental Model](https://lawsofux.com/mental-model/) | People carry a simplified picture of how a system works and act on it. | Match the creator's model: "my shop" is what shoppers see; "collections" are folders of products. The words in the UI must match that model. |

## Emotion and memory of the experience

| Law | In short | For URMEI |
| --- | --- | --- |
| [Aesthetic-Usability Effect](https://lawsofux.com/aesthetic-usability-effect/) | People see attractive designs as easier to use, and forgive minor problems in them. | Polish builds trust, but it can hide usability problems in a review. Test the flow, not just the look. |
| [Peak-End Rule](https://lawsofux.com/peak-end-rule/) | People judge an experience mostly by its most intense moment and by how it ends. | Make the end of key flows feel good (apply success, review submitted, item added). Soften the worst moments (errors, revoked accounts) with clear recovery. |
| [Goal-Gradient Effect](https://lawsofux.com/goal-gradient-effect/) | People speed up as they get closer to a goal. | Show progress in multi-step flows (apply form, profile setup). Starting users partway along ("1 of 4 done") motivates them. |
| [Parkinson's Law](https://lawsofux.com/parkinsons-law/) | A task expands to fill the time it's given. | Shorten tasks: autofill, saved details (bank account, addresses) and fewer required fields make finishing faster than expected. |

## Review checklist

Before calling a screen done, check:

- [ ] Grouping is done by spacing and regions, and related things look alike (Proximity, Common Region, Similarity).
- [ ] Each view has one clear primary action, and emphasis is rare (Von Restorff, Hick's).
- [ ] Targets are large enough and well spaced on mobile (Fitts's).
- [ ] Every action gives instant feedback (Doherty).
- [ ] Options are trimmed and have a default (Choice Overload, Occam's Razor, Tesler's).
- [ ] The user never has to remember something from a previous screen (Working Memory, Cognitive Load).
- [ ] Patterns match common conventions and the creator's mental model (Jakob's, Mental Model).
- [ ] Multi-step flows show progress, and the ending is a positive moment (Goal-Gradient, Zeigarnik, Peak-End).
- [ ] Inputs are forgiving and errors explain how to recover (Postel's, Peak-End).

Source: [Laws of UX](https://lawsofux.com/) by Jon Yablonski. The summaries above are paraphrased; read the original articles for the full text.
