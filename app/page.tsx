import TopPage from './components/toppage/TopPage';
import { TopPageShopNode, ShopLink } from './types/toppage-tree';

// Sample data - this would typically come from an API or database
const sampleNodes: TopPageShopNode[] = [
  {
    id: '1',
    name: 'Yoshimura-ya',
    foundingYear: 1969,
    type: 'main',
    lineage: 'ie-kei',
    importance: 1,
    status: 'active',
    isRoot: true,
    connectionCount: 3,
    journeys: [
      {
        id: 'j1',
        title: 'The Birth of Ie-kei Ramen',
        isPremium: false
      }
    ]
  },
  {
    id: '2',
    name: 'Ichiran',
    foundingYear: 1960,
    type: 'branch',
    lineage: 'tonkotsu',
    importance: 1,
    status: 'active',
    connectionCount: 2,
    journeys: [
      {
        id: 'j2',
        title: 'Tonkotsu Ramen Evolution',
        isPremium: true
      }
    ]
  }
];

const sampleLinks: ShopLink[] = [
  {
    source: '1',
    target: '2',
    type: 'influence',
    isMainLineage: false,
    strength: 0.5
  }
];

export default function Home() {
  return <TopPage />;
} 