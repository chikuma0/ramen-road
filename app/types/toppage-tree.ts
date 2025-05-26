export type ShopType = 'main' | 'branch' | 'influenced';
export type LineageType = 'ie-kei' | 'tonkotsu' | 'shoyu' | 'miso' | 'other';
export type LinkType = 'master-student' | 'parent-branch' | 'influence' | 'collaboration';

export interface TopPageShopNode {
  id: string;
  name: string;
  foundingYear?: number;
  type: ShopType;
  lineage: LineageType;
  position?: { x: number; y: number };
  journeys?: {
    id: string;
    title: string;
    isPremium: boolean;
    thumbnailUrl?: string;
  }[];
  importance: 1 | 2 | 3; // 1 = major, 2 = notable, 3 = minor
  status: 'active' | 'inactive' | 'historical';
  isRoot?: boolean;
  connectionCount: number;
}

export interface ShopLink {
  source: string;
  target: string;
  type: LinkType;
  isMainLineage: boolean;
  strength: number;
}

export interface TreeDataContext {
  nodes: TopPageShopNode[];
  links: ShopLink[];
  filteredNodes: TopPageShopNode[];
  filteredLinks: ShopLink[];
  selectedNode: TopPageShopNode | null;
  highlightedLineage: LineageType | null;
  zoomLevel: number;
  center: { x: number; y: number };
}

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TreeState {
  nodes: TopPageShopNode[];
  links: ShopLink[];
  nodeMap: Map<string, TopPageShopNode>;
  linkMap: Map<string, ShopLink>;
  viewport: Viewport;
  zoom: number;
  center: { x: number; y: number };
} 