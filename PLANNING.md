# Ramen Journey Top Page Implementation Plan

## Overview
This document serves as the source of truth for the implementation of the new Ramen Journey top page. It outlines the technical stack, component structure, and phased implementation plan, as well as key decisions and references.

---

## Key Decisions
- **Directory Structure:** Continue using the `app/` directory (Next.js App Router)
- **Styling:** Use Tailwind CSS and global CSS variables (no CSS Modules)
- **Hero Image:** Use `ramen-hero.jpg` from `app/public/ramen-hero.jpg`
- **Data:** Start with creative mock data/types; refer to root HTML files for data points; Supabase integration to be handled in a separate task
- **Modal:** Build a simple custom modal for shop details
- **Routing:** Use Next.js `Link` for navigation; no special requirements
- **Localization:** Prepare for future locale support, but not required for MVP

---

## Technical Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, global CSS variables
- **Visualization:** D3.js for interactive family tree
- **Responsive Design:** Mobile-first, Tailwind breakpoints

---

## Component Structure
```
app/
  components/
    toppage/
      TopPage.tsx
      TopPageHero.tsx
      FamilyTreeVisualization.tsx
      JourneyTypeCards.tsx
      FeaturedJourney.tsx
      ResourcesSection.tsx
      index.ts
    shared/
      Button.tsx
      Card.tsx
      Modal.tsx
  types/
    toppage-tree.ts
  public/
    ramen-hero.jpg
```

---

## Implementation Phases
### Phase 1: Setup & Core Components
- Project setup, Tailwind config, global styles
- TopPage container, layout, hero section

### Phase 2: Family Tree Visualization
- Types, mock data, D3.js force-directed graph, interactivity, mobile view

### Phase 3: Journey Integration
- JourneyTypeCards, FeaturedJourney, connect tree to journeys

### Phase 4: Finalization
- ResourcesSection, Footer, performance, testing, accessibility

---

## References
- Use root HTML files (e.g., `iekei_family_tree_base.html`) for data points
- Supabase integration to be planned separately
- Design assets and variables in `app/globals.css` and Tailwind config

---

## To Do
- [ ] Scaffold missing components and types
- [ ] Implement hero section with ramen-hero.jpg
- [ ] Create mock data for tree and journeys
- [ ] Build D3.js visualization
- [ ] Add interactivity and modal
- [ ] Style and test for responsiveness 