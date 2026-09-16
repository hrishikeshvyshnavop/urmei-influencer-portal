# PRD: Creator Product Reviews & Product Sample Requests

**Status:** Draft
**Source:** Creator portal comment thread (Nelson Seh, Neethu KU; sample-request flow confirmed after sync with Mike)
**Owner:** TBD
**Portal scope:** Creator portal only. E-commerce/storefront-side display of creator reviews is explicitly out of scope for this PRD (see Open Questions).

## 1. Background

Today, product reviews on the e-commerce side are shopper reviews: they start after a product has been delivered to a normal shopper. Creators don't fit that model — most of the time a creator reviews a product after receiving a sample from the brand (or through some other means), not after a standard delivery-triggered purchase flow. There is currently no way for a creator to leave a review at all, and no way for a creator to request a product sample from within the portal.

This PRD covers two related, but independently shippable, features raised in the same discussion:

1. **Creator Product Reviews** — let creators leave a review (comment + optional social post link) on products in their shop.
2. **Product Sample Requests** — let creators request a physical sample of a product, and monitor the status of that request, so they have something to review in the first place.

These are treated as a *middle ground* ahead of full campaign functionality (which will later formalize both sampling and brand-approved participation).

## 2. Goals

- Give creators a first-class, low-friction way to record their opinion of a product they carry in their shop, including proof of promotion (a social post link).
- Give creators a way to actually obtain a sample to review, without waiting on campaigns to exist.
- Give creators visibility into the status of any sample they've requested, so "did this go anywhere?" is never a support question.
- Keep both flows simple enough to run with Urmei as a manual, interim approver — no assumption of automated fulfillment or brand-side workflow yet.

## 3. Non-Goals (for this phase)

- Deciding how the **e-commerce/storefront** side visually separates creator reviews from shopper reviews. Flagged by Nelson as unresolved — carried forward as an open question, not designed here.
- Any brand-facing approval workflow (brands requesting Urmei send samples to approved campaign participants). This is explicitly future work, tied to campaigns.
- Automated/real-time fulfillment tracking (carriers, tracking numbers, delivery confirmation).
- Rating scores, review moderation, or review editing history — scope is a free-text comment plus an optional link.
- Requiring or verifying that a creator actually received a sample before allowing a review (see §6, relationship between the two features).

## 4. Feature 1 — Creator Product Reviews

### 4.1 User story
As a creator, for any product I've added to my shop, I want to leave a short review and optionally link to the social media post where I featured it, so my feedback and promotion are captured on the platform — not just scattered across my social channels.

### 4.2 Requirements
- A creator can add a review to any product currently in their shop (i.e., something they've added — not gated on any other feature; see §6).
- A review consists of:
  - A free-text comment (required).
  - An optional hyperlink to a social media post about the product.
- A creator can view and edit their own review for a product after submitting it.
- Reviews are scoped to the creator who wrote them — this is not a public/aggregate rating system like shopper reviews; it's the creator's own record of their feedback.
- If a creator has added the same product more than once (e.g. under different variants), treat each addition as independently reviewable, since the creator's experience may differ by variant.

### 4.3 Explicitly deferred / open
- Whether/how creator reviews ever surface on the e-commerce storefront, and how they're visually distinguished from shopper reviews there, is unresolved. Nelson asked for ideas on this in the original thread but no decision was made — needs a follow-up discussion before any storefront-facing work starts.

## 5. Feature 2 — Product Sample Requests

### 5.1 User story
As a creator, I want to request a sample of a product I'm interested in (regardless of whether I've added it to my shop yet), so that I can try it and potentially review or promote it — and I want to be able to check the status of that request afterward.

### 5.2 Requirements
- **Independent of "add to shop."** A creator can request a sample for any product visible in the portal, whether or not it's currently in their shop. This was a deliberate decision in the thread (Nelson: "it should be a separate independent flow, not dependent on adding a product to their shop") — do not gate the request entry point behind shop membership.
- **Open to all creators.** In the absence of campaigns, any creator can request a sample for any product — there is no eligibility check beyond being a registered creator. This is explicitly interim: once campaigns exist, sample requests are expected to move to a brand-approved, campaign-scoped model instead.
- **Urmei is the interim gatekeeper.** Submitting a request does not auto-approve or auto-ship anything; Urmei manually reviews and approves/rejects/fulfills requests behind the scenes for now. This PRD covers the creator-facing request + monitoring experience; it does not cover an Urmei-side admin/approval tool (see §7).
- **Request flow.** A creator can submit a sample request from wherever they're viewing a product (product detail view), providing at minimum a shipping address and, optionally, a note to Urmei. The exact field set (e.g. reusing a saved default address vs. entering one per request) is a design detail for the follow-up UX pass, not fixed by this PRD.
- **Status monitoring.** A creator has a dedicated place to see all their sample requests and each one's current status (e.g., requested, approved, shipped, rejected — exact state names to be finalized in design). This was called out explicitly in the thread as a must-have alongside the request flow itself, not a nice-to-have.
- A creator should be able to tell, when looking at a product, whether they already have an outstanding or fulfilled sample request for it, to avoid duplicate requests.

### 5.3 Future (not this phase)
- Brands requesting Urmei to send samples to approved campaign participants, replacing the "open to all creators" interim model.
- Any real fulfillment/carrier integration.
- Automated approval rules or volume limits — for now, Urmei approves manually and can apply judgment on a case-by-case basis.

## 6. Relationship between the two features

Reviews and sample requests are **independent of each other** — this PRD does not require a creator to have an approved or fulfilled sample request before they can write a review. The original thread frames sample receipt as *one possible path* to a review ("after receiving samples from the brand or via other means... **regardless**, for products a creator adds to their shop, we should allow creators to enter their review comments"), not a precondition. Creators may already have product experience through other channels (self-purchase, brand relationships outside the platform, etc.), and requiring a completed sample request would block those cases without cause. The two features should ship, and can be used, independently.

## 7. Interim delivery note

Because there is no automated fulfillment or brand-approval system yet, this phase delivers the **creator-facing** request and review experiences only. "Urmei approves manually" means an operational/manual process on Urmei's side for now, not an in-product admin tool — building that tool is a separate, follow-up scope decision and is not assumed by this PRD.

## 8. Open Questions

1. How should the e-commerce/storefront side display creator reviews separately from normal shopper reviews? (Raised by Nelson, unresolved — needs its own discussion, likely with the e-commerce team.)
2. What are the exact sample-request status states and their definitions (e.g., is there a distinct "shipped" vs. "fulfilled" state, and does "rejected" need a reason)?
3. Does Urmei need any interim tooling to actually process/approve requests, or is that handled fully outside the product for now?
4. Should there be any limit on how many samples a creator can request at once, given there's no campaign-based gating yet?
5. Should a review require the product to still be in the creator's shop, or should it persist even if the creator later removes the product?

## 9. Success Signals

- Creators are submitting reviews for products in their shop without needing support intervention.
- Sample requests are being submitted and creators are checking status without asking "what happened to my request?" via support channels.
- Positive/negative signal on whether the interim "open to all creators" sample policy needs tightening once volume increases (informs the campaign-lifecycle design).
