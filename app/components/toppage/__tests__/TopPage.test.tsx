import { render, screen, fireEvent } from '@testing-library/react';
import TopPage from '../TopPage';
import { ramenFamilyTree } from '../../../../family-tree/tree-data';

// Mock child components
jest.mock('../TopPageHero', () => () => <div data-testid="top-page-hero" />);
jest.mock('../FeaturedShops', () => () => <div data-testid="featured-shops" />);
jest.mock('../JourneyTypes', () => ({
  __esModule: true,
  default: ({ setActiveJourney, setPreviewedJourney }: any) => (
    <div data-testid="journey-types">
      <button onClick={() => setActiveJourney('test-journey')}>Set Journey</button>
      <button onClick={() => setPreviewedJourney('preview-journey')}>Preview Journey</button>
    </div>
  ),
}));

// Mock the ModernFamilyTree component
jest.mock('../ModernFamilyTree', () => ({
  __esModule: true,
  default: ({ nodes, links, activeJourney, previewedJourney }: any) => (
    <div data-testid="modern-family-tree" data-active={activeJourney} data-preview={previewedJourney}>
      Modern Family Tree
    </div>
  ),
}));

describe('TopPage Component', () => {
  it('renders all main sections', () => {
    render(<TopPage />);
    
    // Check for main sections
    expect(screen.getByTestId('top-page-hero')).toBeInTheDocument();
    expect(screen.getByTestId('featured-shops')).toBeInTheDocument();
    expect(screen.getByTestId('journey-types')).toBeInTheDocument();
    
    // Check for section titles
    expect(screen.getByText('横浜家系ラーメンの系譜')).toBeInTheDocument();
    expect(screen.getByText('家系ラーメンファミリーツリー')).toBeInTheDocument();
    expect(screen.getByText('家系ラーメンの旅：吉村家から世界へ')).toBeInTheDocument();
    expect(screen.getByText('追加リソース')).toBeInTheDocument();
  });

  it('renders the ModernFamilyTree with correct props', () => {
    render(<TopPage />);
    
    const tree = screen.getByTestId('modern-family-tree');
    expect(tree).toBeInTheDocument();
  });

  it('updates active journey when JourneyTypes calls setActiveJourney', () => {
    render(<TopPage />);
    
    // Initially should be null
    const tree = screen.getByTestId('modern-family-tree');
    expect(tree).not.toHaveAttribute('data-active', 'test-journey');
    
    // Click the button in JourneyTypes that calls setActiveJourney
    fireEvent.click(screen.getByText('Set Journey'));
    
    // The tree should now have the active journey
    expect(screen.getByTestId('modern-family-tree')).toHaveAttribute('data-active', 'test-journey');
  });

  it('updates previewed journey when JourneyTypes calls setPreviewedJourney', () => {
    render(<TopPage />);
    
    // Initially should be null
    const tree = screen.getByTestId('modern-family-tree');
    expect(tree).not.toHaveAttribute('data-preview', 'preview-journey');
    
    // Click the button in JourneyTypes that calls setPreviewedJourney
    fireEvent.click(screen.getByText('Preview Journey'));
    
    // The tree should now have the previewed journey
    expect(screen.getByTestId('modern-family-tree')).toHaveAttribute('data-preview', 'preview-journey');
  });

  it('renders the start journey button with correct click handler', () => {
    render(<TopPage />);
    
    const startButton = screen.getByText('この旅を始める');
    expect(startButton).toBeInTheDocument();
    
    // Test that clicking the button sets the active journey
    fireEvent.click(startButton);
    expect(screen.getByTestId('modern-family-tree')).toHaveAttribute('data-active', 'direct-lineage');
  });
});
