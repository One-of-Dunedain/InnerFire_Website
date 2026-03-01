# Pricing & Monetization Deep-Dive (TASK-036)

Date snapshot: 2026-03-01  
Scope: 10 apps in article + InnerFire  
Primary sources: official Apple App Store listings + app descriptions + official Apple subscription management docs.  
UGC/paywall friction signals cross-referenced from `docs/research/breathwork-apps-ugc.md`.

Important:
- Where an app exposes multiple SKUs without clear public mapping (promo/legacy tiers), values are marked `Unverified`.
- "CC upfront" for App Store subscriptions follows Apple subscription flow when trial/subscription is started.

---

## Batch 1

### Calm

#### Subscription tiers
- **Monthly:** $14.99/month (App Store listing + app description)
- **Yearly:** $69.99/year (= $5.83/month effective)
- **Lifetime / one-time:** $399.99 (app description)
- **Family plan:** Unverified (no dedicated family subscription SKU shown in current snapshot)
- **Student discount:** No public student tier found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided meditation access): Yes, limited (exact catalog size unverified)
- [ ] Feature 2 (sleep content access): Yes, limited (exact catalog size unverified)
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Content-limited (premium is "unlimited access")
- [ ] Can you use the core breathing timer for free? Partial/Unverified
- [ ] Are stats/tracking free? Unverified
- [ ] Is Apple Watch / widget support free? App supports watch platform; free-tier scope unverified
- Summary in one sentence: "Free tier appears limited; paywall is tied to unlimited Calm Collection access."

#### Trial details
- **Has free trial:** Yes ("if offered" language in app description)
- **Trial length:** Unverified (offer-dependent in current snapshot)
- **Auto-renews after trial:** Yes
- **Payment method required upfront:** Yes (app description states charge to iTunes-connected card on subscription confirmation)
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Calm > Cancel
- **What happens after cancel:** Typically access remains until period end for store subscriptions (app-specific phrasing not explicit)

#### Paywall behavior (UX observations)
- First paywall trigger: Unverified direct observation; UGC indicates early premium prompts and trial/renewal exposure.
- Aggressiveness: Reported as moderate/high in billing-related complaints.
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: UGC reports trial/renewal confusion and unexpected-charge perceptions.

#### Price history / changes
- Notable variance in current App Store IAP SKUs ($69.99, $79.99 annual-like entries) suggests plan/promo segmentation.
- UGC and trust-site reports mention billing friction; no single verified "date + % raise" statement confirmed in this pass.

Sources:
- https://apps.apple.com/us/app/calm/id571800810
- https://itunes.apple.com/lookup?id=571800810&country=us
- https://support.apple.com/en-us/118428
- `docs/research/breathwork-apps-ugc.md` (Calm section)

### Headspace

#### Subscription tiers
- **Monthly:** $12.99/month
- **Yearly:** $69.99/year (= $5.83/month effective)
- **Lifetime / one-time:** None found
- **Family plan:** Unverified (no explicit family SKU in current US App Store snapshot)
- **Student discount:** No public student tier found in verified sources for this pass

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided sessions): Yes, limited
- [ ] Feature 2 (breathwork/stress sessions): Yes, limited
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Content-limited
- [ ] Can you use the core breathing timer for free? Partial/Unverified
- [ ] Are stats/tracking free? Unverified
- [ ] Is Apple Watch / widget support free? Platform availability yes; free-tier scope unverified
- Summary in one sentence: "Free tier is usable but constrained; meaningful ongoing use is subscription-led."

#### Trial details
- **Has free trial:** Yes
- **Trial length:** Unverified in current snapshot
- **Auto-renews after trial:** Yes
- **Payment method required upfront:** Yes (iTunes account billing flow in description)
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Headspace > Cancel
- **What happens after cancel:** Typically keep access until paid period end (app-specific wording not explicit in listing text)

#### Paywall behavior (UX observations)
- First paywall trigger: Not directly observed; UGC signals free-tier shrink/premium gating pressure.
- Aggressiveness: Moderate (based on UGC complaint patterns).
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: Trial/renewal confusion appears in complaint corpus (moderate signal).

#### Price history / changes
- Current App Store shows standard monthly/yearly SKUs and additional higher-price SKU (`Headspace Plus $94.99`) suggesting tier variation.
- No fully verified dated price-change event captured in this pass.

Sources:
- https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008
- https://itunes.apple.com/lookup?id=493145008&country=us
- https://support.apple.com/en-us/118428
- `docs/research/breathwork-apps-ugc.md` (Headspace section)

### Breathwrk

#### Subscription tiers
- **Monthly:** $9.00/month (SKU: "Breathwrk Premium 900 Monthly")
- **Yearly:** Unverified public mapping; App Store IAP list includes multiple candidate pro SKUs ($38.99 / $49.00 / $69.99 / $29.99) not clearly labeled as annual in current snapshot
- **Lifetime / one-time:** None clearly verified
- **Family plan:** No public family subscription tier found
- **Student discount:** No public student tier found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided breathing sessions): Yes, limited (description promotes broad library; full access appears premium-gated)
- [ ] Feature 2 (habit tracking/reminders): Partial/Unverified for free tier
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Content-limited (inferred from pro SKUs)
- [ ] Can you use the core breathing timer for free? Partial/Unverified
- [ ] Are stats/tracking free? Unverified
- [ ] Is Apple Watch / widget support free? Unverified
- Summary in one sentence: "Free entry exists, but pricing SKUs indicate stronger subscription orientation for full use."

#### Trial details
- **Has free trial:** Unverified (no explicit trial duration statement found in current listing snapshot)
- **Trial length:** Unverified
- **Auto-renews after trial:** Unverified
- **Payment method required upfront:** Yes for paid subscription start via App Store; trial-specific requirement unverified
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Breathwrk > Cancel
- **What happens after cancel:** Typical App Store behavior likely applies; app-specific statement unverified

#### Paywall behavior (UX observations)
- First paywall trigger: Not directly observed.
- Aggressiveness: Moderate (UGC reports restore/login/subscription friction post Peloton integration).
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: No hard proof of UI dark-pattern mechanics; complaint cluster centers on subscription/access state mismatch.

#### Price history / changes
- Notable monetization event: Peloton integration/acquisition context appears in complaint narrative.
- UGC reports perceived subscription/access regressions; exact dated price ladder change unverified.

Sources:
- https://apps.apple.com/us/app/breathwrk-breathing-exercises/id1481804500
- https://itunes.apple.com/lookup?id=1481804500&country=us
- https://www.breathwrk.com
- `docs/research/breathwork-apps-ugc.md` (Breathwrk section)

### Wim Hof Method

#### Subscription tiers
- **Monthly:** $5.99/month (Supporter Monthly)
- **Yearly:** $42.99/year (= $3.58/month effective)
- **Lifetime / one-time:** None found (current model subscription-led; optional one-off challenge SKU exists)
- **Family plan:** No public family subscription tier found
- **Student discount:** No public student tier found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (basic breathing practice): Yes
- [ ] Feature 2 (cold exposure guidance): Partial (some content likely gated)
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Content-limited for premium features
- [ ] Can you use the core breathing timer for free? Yes/Partial (base functionality available; premium tier adds more)
- [ ] Are stats/tracking free? Partial/Unverified
- [ ] Is Apple Watch / widget support free? Platform support exists; exact free tier scope unverified
- Summary in one sentence: "Core use appears available for free, while guided/premium layers sit behind subscription."

#### Trial details
- **Has free trial:** Yes
- **Trial length:** 7 days (yearly supporter plan)
- **Auto-renews after trial:** Yes
- **Payment method required upfront:** Yes (App Store subscription flow)
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Wim Hof Method > Cancel
- **What happens after cancel:** Usually access until end of period; app-specific confirmation text not explicit in this snapshot

#### Paywall behavior (UX observations)
- First paywall trigger: Not directly observed; UGC indicates paywall surprise around shift to recurring model.
- Aggressiveness: Moderate.
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: More "model shift surprise" than explicit deceptive UI pattern in verified data.

#### Price history / changes
- Historical controversy signal: community complaints about shift from earlier one-time expectations to recurring subscription model.
- No verified official changelog entry with exact before/after pricing date captured.

Sources:
- https://apps.apple.com/us/app/wim-hof-method-breathwork/id890471578
- https://itunes.apple.com/lookup?id=890471578&country=us
- https://support.apple.com/en-us/118428
- `docs/research/breathwork-apps-ugc.md` (Wim Hof Method section)

---

## Batch 2

### Prana Breath

#### Subscription tiers
- **Monthly:** None clearly listed (weekly + yearly listed)
- **Yearly:** $14.99/year (= $1.25/month effective)
- **Lifetime / one-time:** Unverified; promo one-off SKUs appear (`$24.99`, `$0.99`) but not clearly permanent-tier labeled
- **Family plan:** No public family subscription tier found
- **Student discount:** No public student tier found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (core breathing coach): Yes
- [ ] Feature 2 (custom routines/reminders): Yes/Partial
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Content-limited for Guru/Premium layer
- [ ] Can you use the core breathing timer for free? Yes
- [ ] Are stats/tracking free? Partial/Unverified
- [ ] Is Apple Watch / widget support free? Unverified
- Summary in one sentence: "Base breathing workflows are available, with Guru tier unlocking additional depth."

#### Trial details
- **Has free trial:** Unverified (conflicting user reports; no clear trial metadata in current listing text)
- **Trial length:** Unverified
- **Auto-renews after trial:** Unverified
- **Payment method required upfront:** Yes for any subscription purchase through App Store
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Prana Breath > Cancel
- **What happens after cancel:** Typical App Store behavior expected; app-specific detail unverified

#### Paywall behavior (UX observations)
- First paywall trigger: Unverified direct observation.
- Aggressiveness: Low-to-moderate in available complaint sample.
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: Isolated complaint of immediate charge/trial expectation mismatch.

#### Price history / changes
- No verified official price-change timeline found in this pass.
- Promo-tag SKUs (Black Friday) indicate episodic discounting.

Sources:
- https://apps.apple.com/us/app/prana-breath-calm-meditate/id6478402874
- https://itunes.apple.com/lookup?id=6478402874&country=us
- https://support.apple.com/en-us/118428
- `docs/research/breathwork-apps-ugc.md` (Prana Breath section)

### Oak

#### Subscription tiers
- **Monthly:** None found
- **Yearly:** None found
- **Lifetime / one-time:** None found
- **Family plan:** None found
- **Student discount:** Not applicable / none found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided + unguided meditation): Yes
- [ ] Feature 2 (breathing exercises): Yes
- [ ] Number of free sessions/techniques: Multiple; exact count unverified
- [ ] Are free sessions time-limited or content-limited? Mostly usable without recurring paywall
- [ ] Can you use the core breathing timer for free? Yes
- [ ] Are stats/tracking free? Yes
- [ ] Is Apple Watch / widget support free? Unverified
- Summary in one sentence: "Oak is largely free in current market positioning with minimal monetization pressure."

#### Trial details
- **Has free trial:** No clear subscription trial signal
- **Trial length:** N/A
- **Auto-renews after trial:** N/A
- **Payment method required upfront:** N/A for core use
- **How to cancel:** N/A (no clear recurring subscription tier)
- **What happens after cancel:** N/A

#### Paywall behavior (UX observations)
- First paywall trigger: Minimal/none in verified sources.
- Aggressiveness: Low.
- Locked features labeled before tap: N/A / minimal gating.
- Most expensive plan pre-selected: N/A.
- Dark patterns observed: None identified in this pass.

#### Price history / changes
- No verified pricing controversy captured.
- Main risk signal for Oak is maintenance cadence, not monetization friction.

Sources:
- https://apps.apple.com/us/app/oak-meditation-breathing/id1210209691
- https://itunes.apple.com/lookup?id=1210209691&country=us
- `docs/research/breathwork-apps-ugc.md` (Oak section)

### iBreathe

#### Subscription tiers
- **Monthly:** None
- **Yearly:** None
- **Lifetime / one-time:** $3.99 (Unlock Premium, one-time)
- **Family plan:** None found
- **Student discount:** Not applicable / none found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (preset breathing exercises): Yes
- [ ] Feature 2 (custom exercises/reminders): Yes (with some premium upsell)
- [ ] Number of free sessions/techniques: Unverified
- [ ] Are free sessions time-limited or content-limited? Mostly free; ad/premium upsell model
- [ ] Can you use the core breathing timer for free? Yes
- [ ] Are stats/tracking free? Yes/Partial (Apple Health sync included)
- [ ] Is Apple Watch / widget support free? Yes (app family supports these platforms)
- Summary in one sentence: "iBreathe is a low-friction free app with one-time unlock/ads monetization."

#### Trial details
- **Has free trial:** No recurring subscription trial found
- **Trial length:** N/A
- **Auto-renews after trial:** N/A
- **Payment method required upfront:** Only for optional paid one-time purchases
- **How to cancel:** N/A (no recurring subscription required in current model)
- **What happens after cancel:** N/A

#### Paywall behavior (UX observations)
- First paywall trigger: Optional premium/ad-removal prompts.
- Aggressiveness: Low.
- Locked features labeled before tap: Mostly clear (one-time unlock language).
- Most expensive plan pre-selected: N/A.
- Dark patterns observed: None strong; complaint cluster is ad quality, not billing traps.

#### Price history / changes
- No verified major pricing controversy found.

Sources:
- https://apps.apple.com/us/app/ibreathe-relax-and-breathe/id1296605806
- https://itunes.apple.com/lookup?id=1296605806&country=us
- `docs/research/breathwork-apps-ugc.md` (iBreathe section)

### Insight Timer

#### Subscription tiers
- **Monthly:** $9.99/month
- **Yearly:** $59.99/year (= $5.00/month effective)
- **Lifetime / one-time:** None found
- **Family plan:** `MemberPlus Family` $89.99/year (= $7.50/month effective)
- **Student discount:** No public student tier verified

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided meditations/talks): Yes (large library)
- [ ] Feature 2 (breathing/timer + community): Yes
- [ ] Number of free sessions/techniques: Large; exact count dynamic/unverified
- [ ] Are free sessions time-limited or content-limited? Free tier is broad but premium adds courses/features
- [ ] Can you use the core breathing timer for free? Yes
- [ ] Are stats/tracking free? Yes
- [ ] Is Apple Watch / widget support free? Platform support exists; exact premium gating for all watch features unverified
- Summary in one sentence: "Insight Timer has one of the strongest usable free tiers, with premium layering on top."

#### Trial details
- **Has free trial:** Yes ("if offered" in listing text)
- **Trial length:** Unverified in current snapshot
- **Auto-renews after trial:** Yes
- **Payment method required upfront:** Yes (App Store subscription flow)
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Insight Timer > Cancel
- **What happens after cancel:** Usually access until end of paid period; app-specific wording in listing is limited

#### Paywall behavior (UX observations)
- First paywall trigger: Reported at premium content touchpoints and onboarding/upsell surfaces.
- Aggressiveness: Moderate (UGC reports "premium in your face" style complaints).
- Locked features labeled before tap: Partial/Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: Some complaints around renewals/cancellation friction; no hard proof of deceptive pre-check UI in this pass.

#### Price history / changes
- No single verified dated price hike event confirmed.
- Ongoing complaint signal centers on upsell pressure and billing support handling.

Sources:
- https://apps.apple.com/us/app/insight-timer-meditate-sleep/id337472899
- https://itunes.apple.com/lookup?id=337472899&country=us
- https://support.apple.com/en-us/118428
- `docs/research/breathwork-apps-ugc.md` (Insight Timer section)

---

## Batch 3

### Othership

#### Subscription tiers
- **Monthly:** $17.99/month
- **Yearly:** $129.99/year (= $10.83/month effective)
- **Lifetime / one-time:** None found
- **Family plan:** No dedicated family pricing tier publicly listed
- **Student discount:** No public student tier found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (guided breathwork content): Yes, limited
- [ ] Feature 2 (full library access): No (subscription-led)
- [ ] Number of free sessions/techniques: Unverified in current snapshot
- [ ] Are free sessions time-limited or content-limited? Content-limited
- [ ] Can you use the core breathing timer for free? No pure timer model; guided content model
- [ ] Are stats/tracking free? Unverified
- [ ] Is Apple Watch / widget support free? Unverified
- Summary in one sentence: "Othership is premium-content-first with limited free entry and a relatively high recurring price."

#### Trial details
- **Has free trial:** Unverified in public listing snapshot
- **Trial length:** Unverified
- **Auto-renews after trial:** Unverified
- **Payment method required upfront:** Yes for paid subscription via App Store
- **How to cancel:** iOS Settings > Apple ID > Subscriptions > Othership > Cancel
- **What happens after cancel:** Typical App Store end-of-period behavior expected; app-specific statement unverified

#### Paywall behavior (UX observations)
- First paywall trigger: Not directly observed; complaints indicate strong premium lock gating.
- Aggressiveness: Moderate-to-high (from billing/access complaint reports).
- Locked features labeled before tap: Unverified.
- Most expensive plan pre-selected: Unverified.
- Dark patterns observed: Reports of charge/access mismatch; insufficient public evidence of specific deceptive UI mechanics.

#### Price history / changes
- No verified dated price-change event found in this pass.
- Recurring controversy signal is value sensitivity at high monthly/yearly price points.

Sources:
- https://apps.apple.com/us/app/othership-guided-breathwork/id1590348936
- https://itunes.apple.com/lookup?id=1590348936&country=us
- `docs/research/breathwork-apps-ugc.md` (Othership section)

### Box Breathe

#### Subscription tiers
- **Monthly:** None
- **Yearly:** None
- **Lifetime / one-time:** App upfront purchase $1.99
- **Family plan:** None found
- **Student discount:** Not applicable / none found

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (install/use core app): No free tier (paid upfront app)
- [ ] Feature 2 (extra sounds): Optional IAP sound packs ($0.99 each)
- [ ] Number of free sessions/techniques: N/A (paid app model)
- [ ] Are free sessions time-limited or content-limited? N/A
- [ ] Can you use the core breathing timer for free? No (requires app purchase)
- [ ] Are stats/tracking free? Included after app purchase
- [ ] Is Apple Watch / widget support free? Included after app purchase
- Summary in one sentence: "Box Breathe uses a low-cost paid-upfront model, not subscription monetization."

#### Trial details
- **Has free trial:** No
- **Trial length:** N/A
- **Auto-renews after trial:** N/A
- **Payment method required upfront:** Yes (to purchase app)
- **How to cancel:** N/A (no recurring subscription)
- **What happens after cancel:** N/A

#### Paywall behavior (UX observations)
- First paywall trigger: None for recurring subscription; only optional sound-pack upsell.
- Aggressiveness: Low.
- Locked features labeled before tap: Yes (IAP sound packs indicated in listing)
- Most expensive plan pre-selected: N/A.
- Dark patterns observed: None strong in verified data.

#### Price history / changes
- No verified pricing controversy found.
- Complaints are mainly reliability (Apple Watch/background), not monetization.

Sources:
- https://apps.apple.com/us/app/box-breathe/id1347597121
- https://itunes.apple.com/lookup?id=1347597121&country=us
- `docs/research/breathwork-apps-ugc.md` (Box Breathe section)

### InnerFire

#### Subscription tiers
- **Monthly:** N/A (public app-store pricing not published yet)
- **Yearly:** N/A
- **Lifetime / one-time:** N/A
- **Family plan:** N/A
- **Student discount:** N/A

#### Free tier (what you actually get without paying)
- [ ] Feature 1 (beta access waitlist): Yes (email signup flow)
- [ ] Feature 2 (public production app): Not yet publicly released
- [ ] Number of free sessions/techniques: Unverified (private beta state)
- [ ] Are free sessions time-limited or content-limited? Unverified
- [ ] Can you use the core breathing timer for free? Beta messaging indicates free beta access
- [ ] Are stats/tracking free? Unverified
- [ ] Is Apple Watch / widget support free? Unverified
- Summary in one sentence: "InnerFire is currently pre-release/beta with no published store subscription pricing."

#### Trial details
- **Has free trial:** N/A (beta access, not public subscription product yet)
- **Trial length:** N/A
- **Auto-renews after trial:** N/A
- **Payment method required upfront:** No (current waitlist flow)
- **How to cancel:** N/A
- **What happens after cancel:** N/A

#### Paywall behavior (UX observations)
- First paywall trigger: None observed in public web flow.
- Aggressiveness: None observed in current beta-signup site flow.
- Locked features labeled before tap: N/A.
- Most expensive plan pre-selected: N/A.
- Dark patterns observed: None observed (pre-release state).

#### Price history / changes
- No public pricing history yet.

Sources:
- `index.html` / `blog/best-breathwork-apps.html` (local project content)
- `docs/research/breathwork-apps-ugc.md` (InnerFire section)

---

## Pricing Comparison Summary

| App | Monthly | Yearly | Yearly/mo | One-time | Free tier quality | Trial days | CC upfront | Cancel ease |
|-----|---------|--------|-----------|----------|-------------------|------------|------------|-------------|
| Calm | $14.99 | $69.99 | $5.83 | $399.99 lifetime | Limited | Unverified | Yes | Moderate |
| Headspace | $12.99 | $69.99 | $5.83 | None | Limited | Unverified | Yes | Moderate |
| Breathwrk | $9.00 | Unverified (candidate SKUs: $38.99/$49/$69.99) | Unverified | None | Limited | Unverified | Yes | Moderate |
| Wim Hof Method | $5.99 | $42.99 | $3.58 | None | Limited | 7 days (yearly plan) | Yes | Moderate |
| Prana Breath | N/A (weekly $1.99) | $14.99 | $1.25 | Unverified promo one-offs | Limited | Unverified | Yes | Moderate |
| Oak | None | None | N/A | None | Good | N/A | No (core use) | Easy |
| iBreathe | None | None | N/A | $3.99 unlock (+ optional tips/ads removal) | Good | N/A | Optional (for one-time purchases) | Easy |
| Insight Timer | $9.99 | $59.99 | $5.00 | None | Good | Unverified | Yes | Moderate |
| Othership | $17.99 | $129.99 | $10.83 | None | Limited | Unverified | Yes | Moderate |
| Box Breathe | None | None | N/A | $1.99 app + optional $0.99 sound packs | None (paid app) | N/A | Yes (app purchase) | Easy |
| InnerFire | N/A | N/A | N/A | N/A | Beta / Pre-release | N/A | No (current waitlist flow) | N/A |

Legend:
- **Free tier quality**: `Good` = usable daily without paying; `Limited` = usable but gated; `None` = paid upfront; `Beta` = pre-release state.
- **Cancel ease**: `Easy` = no recurring subscription or standard low-friction flow; `Moderate` = standard store path but recurring complaint noise.

---

## Cross-app monetization observations (fact-only)

- Highest recurring monthly in current snapshot: **Othership ($17.99/month)**.
- Lowest verified monthly subscription in current snapshot: **Wim Hof Method ($5.99/month)**.
- Only clearly published lifetime option in this set: **Calm ($399.99 lifetime)**.
- Clear paid-upfront model (not subscription-led): **Box Breathe**.
- Strong free-tier posture in current verified signals: **Oak, iBreathe, Insight Timer**.
- Highest billing-friction complaint density in UGC corpus: **Calm, Insight Timer, Othership** (with Open excluded here because TASK-036 scope is article apps + InnerFire).

---

## Method notes

- Store pricing can vary by cohort, region, promo, and A/B paywall experiments; values above are US snapshot data from official listing surfaces on 2026-03-01.
- Where official listing showed conflicting SKUs without label clarity, entries are marked `Unverified` instead of guessed.
