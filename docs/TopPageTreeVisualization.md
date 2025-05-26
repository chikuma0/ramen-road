# Top Page Interactive Tree Visualization

This document provides an overview of the interactive ramen family tree visualization implementation for the Ramen Journey application.

## Overview

The tree visualization is a D3.js-based interactive representation of ramen shop relationships and lineages. It helps users understand the connections between different ramen styles and shops, see how they evolved over time, and explore the rich history of ramen development in Japan.

## Component Architecture

The implementation follows a hierarchical structure:

```
InteractiveTreeWrapper
  └── TopPageInteractiveTree (Dynamically imported)
      ├── D3 Visualization (Force simulation)
      └── UI Controls
```

### Key Components

1. **`InteractiveTreeWrapper`** - Client component that:
   - Handles dynamic import of D3 components (avoiding SSR issues)
   - Manages loading states and errors
   - Provides UI controls for visualization modes
   - Forwards user interactions to parent components

2. **`TopPageInteractiveTree`** - Core visualization component that:
   - Implements the D3.js force simulation
   - Handles node and link rendering
   - Manages interactive behaviors (drag, click, hover)
   - Supports different view modes (connections, timeline)

3. **`SimpleD3Test`** - Basic D3.js test component to verify D3 is working correctly

4. **`D3FallbackTest`** - Simplified fallback component using direct DOM manipulation when D3 has issues

## Data Structure

Tree data follows this format:

```typescript
interface TopPageTreeData {
  nodes: TopPageShopNode[];
  links: TopPageShopLink[];
}
```

Where:
- `TopPageShopNode` represents a ramen shop with properties like id, name, lineage, founding year
- `TopPageShopLink` represents connections between shops with source and target IDs

## View Modes

The visualization supports two view modes:

1. **Connections Mode**
   - Force-directed graph showing relationships between shops
   - Nodes can be freely dragged and repositioned
   - Shops cluster by lineage and influence

2. **Timeline Mode**
   - Chronological layout with founding year on the x-axis
   - Shops with the same lineage appear in consistent rows
   - Shows how different styles evolved over time

## Premium Content Integration

The visualization supports premium content with:
- Visual indicators for premium nodes (lock icon, different styling)
- Premium content teaser when non-premium users interact with premium nodes
- Ability to show/hide premium content based on user status

## Implementation Details

### Force Simulation

The D3 force simulation is configured with:
- Link forces to connect related shops
- Charge forces to prevent node overlap
- Center force to keep the visualization centered
- Collision detection to maintain spacing

Custom forces are applied in timeline mode to position nodes based on founding year and lineage.

### TypeScript Integration

The visualization uses TypeScript interfaces for type safety:
- `TopPageShopNode` - Node data structure with proper D3 compatibility
- `TopPageShopLink` - Link data structure for connections
- `TopPageTreeData` - Complete data structure for the visualization
- Various utility types for view modes, filters, etc.

### SSR Compatibility

To avoid issues with server-side rendering:
- D3 components are dynamically imported with `next/dynamic`
- Document/window access is wrapped in useEffect hooks
- Loading states provide feedback during hydration
- Fallback components ensure graceful degradation

## Testing

A dedicated test page is available at `/[locale]/interactive-tree-test` which allows:
- Testing different visualization components
- Switching between data loading methods
- Toggling between view modes
- Simulating premium/free users
- Testing error handling

## API Integration

Data for the visualization can be:
1. Passed directly through component props
2. Loaded asynchronously from `/api/tree-data` endpoint
3. Extended with custom loading functions for database integration

## Usage Examples

### Basic Usage

```tsx
import InteractiveTreeWrapper from '@/components/toppage/InteractiveTreeWrapper';
import { sampleTreeData } from '@/components/toppage/sample-tree-data';

const MyPage = () => (
  <InteractiveTreeWrapper
    data={sampleTreeData}
    initialViewMode="connections"
    isPremiumUser={false}
    onNodeClick={(nodeId) => console.log('Clicked:', nodeId)}
  />
);
```

### Async Data Loading

```tsx
import InteractiveTreeWrapper from '@/components/toppage/InteractiveTreeWrapper';

const loadTreeData = async () => {
  const response = await fetch('/api/tree-data');
  const result = await response.json();
  return result.data;
};

const MyPage = () => (
  <InteractiveTreeWrapper
    loadData={loadTreeData}
    initialViewMode="timeline"
    isPremiumUser={true}
    onNodeClick={(nodeId) => console.log('Clicked:', nodeId)}
  />
);
```

## Known Issues & Limitations

1. Performance may degrade with very large datasets (100+ nodes)
2. Mobile touch interactions have limited testing
3. Deep levels of relationships can cause visual clutter in connections mode
4. Timeline mode has fixed width scaling that may not work well with extreme date ranges

## Future Improvements

Potential enhancements include:
- Zoom and pan capabilities
- Search/filter functionality
- Detail panel for selected nodes
- Animation transitions between view modes
- Additional visualization layouts (geographical, hierarchical)
- Enhanced mobile responsiveness

## Troubleshooting

If visualization fails to render:
1. Check browser console for errors
2. Try the fallback test component to verify D3 is working
3. Ensure data structure follows the expected format
4. Verify that the component is properly client-side rendered