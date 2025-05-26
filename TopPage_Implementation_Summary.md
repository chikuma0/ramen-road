# RamenJourney Top Page Implementation Summary

## High-Level Vision
- The top page is the immersive gateway to the app, with the **Ramen Family Tree** as the centerpiece.
- It should create immediate visual impact, encourage exploration, and guide users toward journeys and other key features.

## Planned Structure
1. **Header/Navigation**
   - Minimal, clean nav with logo, auth controls, language selector, and (optionally) premium upgrade.
2. **Hero Section**
   - Headline and subheadline introducing the app's value and the concept of ramen lineages.
3. **Family Tree Visualization**
   - Interactive, visually rich, and simplified for the landing page.
   - Key features: zoom/pan, node selection, lineage highlighting, journey prompts, and visual indicators for journey content.
4. **Journey Integration**
   - When a user selects a shop, show a modal with info and a "Start Journey" CTA.
   - Highlight recommended starting points and lineage journeys.
5. **Resources & Secondary Features**
   - Taste profile quiz, knowledge cards, community stats, premium teasers.
6. **Footer**
   - Standard links, social, copyright, newsletter.

## User Experience Goals
- **For new users:** Welcome message, onboarding tooltips, suggested starting points.
- **For returning users:** Progress indicators, personalized suggestions, notifications.
- **For all:** Smooth, mobile-optimized, visually engaging, and fast.

## Technical/Design Notes
- Use and adapt the existing FamilyTreeVisual component.
- Optimize for performance and progressive disclosure.
- Responsive design for desktop, tablet, and mobile.
- Analytics and A/B testing for engagement and conversion.

## Success Metrics
- Engagement with the tree and journeys.
- Conversion to journey starts and premium features.
- Fast load times and low bounce rates.

---

# Top Page Implementation Plan: Section-by-Section

## 1. Hero Section
- **Purpose:** Immediate emotional connection, communicate core value, and direct users to start exploring.
- **Content:**
  - Headline (Japanese): "ラーメン家系図で、ラーメンの世界を探検しよう"
  - Subheadline (Japanese): "名店のつながり、歴史、味の系譜を一目で"
  - Primary CTA: "旅を始める" (Start Your Journey)
  - Secondary CTA: "あなたの好みを診断" (Find Your Taste)
  - Background: High-quality ramen image (see docs: TopPage_Design_Assets.md)
- **Reference:**  
  - TopPage_Design_Plan.md (Hero Section, Visual Design)
  - RamenJourney_TopPage_Vision.md (Hero Section)
  - TopPage_Design_Assets.md

## 2. Family Tree Visualization (Centerpiece)
- **Purpose:** Showcase the interactive ramen family tree as the main visual and educational tool.
- **Content:**
  - Interactive, simplified tree (focus on key shops/lineages)
  - Japanese tooltips, shop names, and prompts
  - Node click: Show shop details and "旅を始める" if journey available
- **Reference:**  
  - TopPage_Design_Plan.md (Family Tree Visualization)
  - TopPage_UserFlow.md (Primary User Path)
  - TopPage_Implementation_Plan.md (Tree Visualization)

## 3. Journey Types Section
- **Purpose:** Guide users to different ways of exploring ramen (Lineage, Curated, Technique).
- **Content:**
  - Three cards/banners:
    - 系譜の旅 (Lineage Journey)
    - 専門家による特選ジャーニー (Curated Experience)
    - 技術の深掘り (Technique Deep Dive)
  - Each with a Japanese description and CTA
- **Reference:**  
  - TopPage_Design_Plan.md (Journey Integration)
  - TopPage_Redesign_Vision.md (Journey Types Section)

## 4. Featured Journey
- **Purpose:** Highlight a recommended or trending journey.
- **Content:**
  - Title, short Japanese description, and CTA
  - Rotates or is admin-selected
- **Reference:**  
  - TopPage_Design_Plan.md (Featured Starting Points)
  - TopPage_Redesign_Vision.md (Featured Journey)

## 5. Resources & Community
- **Purpose:** Offer additional engagement and social proof.
- **Content:**
  - Taste profile quiz link ("あなたのラーメンタイプ診断")
  - Knowledge card preview ("ラーメン雑学カードを集める")
  - (Optional) Community stats/testimonials
- **Reference:**  
  - TopPage_Design_Plan.md (Resources & Key Links)
  - TopPage_ExecutiveSummary.md (Community Showcase)

## 6. Footer
- **Purpose:** Standard navigation and legal.
- **Content:**
  - About, Contact, 利用規約, プライバシーポリシー, SNS links
  - Copyright
- **Reference:**  
  - TopPage_Design_Plan.md (Footer)
  - TopPage_ExecutiveSummary.md

# Implementation Flow
1. Hero Section (Japanese copy, proofed)
2. Family Tree Visualization (Japanese UI)
3. Journey Types Section (Japanese copy)
4. Featured Journey (Japanese copy)
5. Resources & Community (Japanese copy)
6. Footer (Japanese copy)
7. Integration, mobile/responsive, polish

---

# Next: Hero Section (Japanese Draft)

**Headline:**  
ラーメン家系図で、ラーメンの世界を探検しよう

**Subheadline:**  
名店のつながり、歴史、味の系譜を一目で

**Primary CTA:**  
旅を始める

**Secondary CTA:**  
あなたの好みを診断

**Background:**  
高品質なラーメンの写真（例：家系ラーメンの丼）

---

**Please review and suggest any changes to the Japanese copy above!**
Once approved, implementation will proceed section by section. 