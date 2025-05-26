# Ramen Family Tree Implementation

## Overview

The Ramen Family Tree visualization is a key feature of the RamenJourney application, allowing users to visually explore the relationships and evolution of ramen styles across Japan. This document provides technical details on the implementation, usage, and extension of these components.

## Component Architecture

The implementation follows a modular, component-based architecture:

```
TopPageTreeIntegration
├── InteractiveTreeWrapper (manages loading states)
│   ├── TopPageInteractiveTree (D3 visualization)
│   └── D3FallbackTest (fallback when D3 fails)
```

### Key Components

1. **TopPageTreeIntegration**: Main container component that handles the overall UI, legend, modals, and integration with the rest of the application.

2. **InteractiveTreeWrapper**: Handles dynamic loading of D3, error states, and viewport adaptations.

3. **TopPageInteractiveTree**: Core D3 visualization component with two main view modes:
   - **Connections Mode**: Force-directed graph showing relationships between shops
   - **Timeline Mode**: Chronological layout showing evolution over time

4. **D3FallbackTest**: Simplified DOM-based fallback when D3 isn't available or fails to load.

## Features

- **Multiple View Modes**: Switch between connections (force-directed) and timeline views
- **Premium Content**: Lock certain nodes and connections for premium users only
- **Responsive Design**: Adapts to different screen sizes and devices
- **Interactive Elements**: Zoom, pan, click to explore individual nodes
- **Visual Encoding**: Color coding by ramen lineage, size by importance
- **Error Handling**: Graceful degradation when D3 fails to load
- **Lazy Loading**: Dynamic imports to improve page load performance

## Usage

### Basic Integration

```tsx
import TopPageTreeIntegration from '@/components/toppage/TopPageTreeIntegration';

const MyPage = () => {
  return (
    <div className="container">
      <TopPageTreeIntegration 
        isPremiumUser={userIsPremium} 
        initialViewMode="connections"
        onNodeSelect={(nodeId) => console.log(`Selected node: ${nodeId}`)}
      />
    </div>
  );
};
```

### Props Reference

#### TopPageTreeIntegration

| Prop             | Type            | Default        | Description                               |
|------------------|-----------------|----------------|-------------------------------------------|
| isPremiumUser    | boolean         | false          | Whether the user has premium access       |
| initialViewMode  | TreeViewMode    | 'connections'  | Starting view mode                        |
| onNodeSelect     | function        | undefined      | Callback when a node is clicked           |

#### InteractiveTreeWrapper

| Prop             | Type            | Default        | Description                               |
|------------------|-----------------|----------------|-------------------------------------------|
| data             | TopPageTreeData | undefined      | Tree data structure                       |
| loadData         | function        | undefined      | Async function to load data               |
| initialViewMode  | TreeViewMode    | 'connections'  | Starting view mode                        |
| isPremiumUser    | boolean         | false          | Whether the user has premium access       |
| onNodeClick      | function        | undefined      | Callback when a node is clicked           |
| height           | number          | 500            | Height of the visualization               |

## Data Structure

The tree visualization uses a specialized data structure defined in `types/toppage-tree.ts`:

```typescript
interface TopPageTreeData {
  nodes: TopPageShopNode[];
  links: TopPageShopLink[];
  metadata?: {
    title?: string;
    description?: string;
    version?: string;
    lastUpdated?: string;
  };
}
```

Each node represents a ramen shop, with properties like:
- `id`: Unique identifier
- `name`: Display name
- `lineage`: Type of ramen (iekei, tonkotsu, etc.)
- `foundingYear`: When the shop was established
- `isPremium`: Whether this is premium content
- `importance`: Relevance ranking (1-5, with 1 being most important)

Each link represents a relationship between shops, with properties like:
- `source`: Source node ID
- `target`: Target node ID
- `isMainLineage`: Whether this is a core relationship
- `type`: Relationship type (influence, direct, indirect)

## Styling

The components use CSS modules for styling:
- `TopPageTreeIntegration.module.css`
- `InteractiveTreeWrapper.module.css`
- `D3FallbackTest.module.css`

These styles maintain consistent visual language with the rest of the application while providing unique styling for the tree visualization elements.

## Testing and Debugging

A test page is available at `/[locale]/tree-test` to interact with the visualization:
- Toggle between premium and non-premium views
- Switch between visualization modes
- Test interaction with nodes
- Verify responsive behavior

## Known Issues and Limitations

1. High node density can affect performance, especially on mobile devices
2. Complex D3 visualizations may have initial rendering delays
3. Browser compatibility - modern browsers recommended for best experience

## Future Enhancements

1. **Performance Optimization**: Further optimize D3 rendering for large datasets
2. **Additional View Modes**: Add more specialized visualization modes
3. **Enhanced Filtering**: Allow users to filter by region, ingredients, or time period
4. **Animation Improvements**: Smooth transitions between view modes
5. **Advanced Interactions**: Allow editing or user annotations

## References

- D3.js Documentation: [https://d3js.org/](https://d3js.org/)
- React + D3 Integration Patterns: [https://2019.wattenberger.com/blog/react-and-d3](https://2019.wattenberger.com/blog/react-and-d3)