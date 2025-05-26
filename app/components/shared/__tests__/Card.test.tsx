import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card Components', () => {
  it('renders Card with default styles and children', () => {
    render(
      <Card data-testid="card">
        <p>Card Content</p>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-white', 'shadow-sm');
    expect(card).toHaveTextContent('Card Content');
  });

  it('applies custom className to Card', () => {
    render(<Card className="custom-class" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('renders CardHeader with correct styles', () => {
    render(
      <Card>
        <CardHeader data-testid="card-header">
          <p>Header Content</p>
        </CardHeader>
      </Card>
    );
    
    const header = screen.getByTestId('card-header');
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
  });

  it('renders CardTitle with correct styles', () => {
    render(
      <Card>
        <CardTitle data-testid="card-title">Title</CardTitle>
      </Card>
    );
    
    const title = screen.getByTestId('card-title');
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    expect(title).toHaveTextContent('Title');
  });

  it('renders CardDescription with correct styles', () => {
    render(
      <Card>
        <CardDescription data-testid="card-description">Description</CardDescription>
      </Card>
    );
    
    const description = screen.getByTestId('card-description');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveTextContent('Description');
  });

  it('renders CardContent with correct styles', () => {
    render(
      <Card>
        <CardContent data-testid="card-content">Content</CardContent>
      </Card>
    );
    
    const content = screen.getByTestId('card-content');
    expect(content).toHaveClass('p-6', 'pt-0');
    expect(content).toHaveTextContent('Content');
  });

  it('renders CardFooter with correct styles', () => {
    render(
      <Card>
        <CardFooter data-testid="card-footer">Footer</CardFooter>
      </Card>
    );
    
    const footer = screen.getByTestId('card-footer');
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    expect(footer).toHaveTextContent('Footer');
  });

  it('forwards refs correctly', () => {
    const cardRef = { current: null };
    const headerRef = { current: null };
    const titleRef = { current: null };
    const descriptionRef = { current: null };
    const contentRef = { current: null };
    const footerRef = { current: null };

    render(
      <Card ref={cardRef}>
        <CardHeader ref={headerRef}>
          <CardTitle ref={titleRef}>Title</CardTitle>
          <CardDescription ref={descriptionRef}>Description</CardDescription>
        </CardHeader>
        <CardContent ref={contentRef}>Content</CardContent>
        <CardFooter ref={footerRef}>Footer</CardFooter>
      </Card>
    );

    expect(cardRef.current).toBeInTheDocument();
    expect(headerRef.current).toBeInTheDocument();
    expect(titleRef.current).toBeInTheDocument();
    expect(descriptionRef.current).toBeInTheDocument();
    expect(contentRef.current).toBeInTheDocument();
    expect(footerRef.current).toBeInTheDocument();
  });
});
