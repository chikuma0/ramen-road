import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders a button with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[var(--ramen-primary)]');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-4');
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--ramen-primary)]');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-white');
    expect(screen.getByRole('button')).toHaveClass('text-[var(--ramen-primary)]');
    expect(screen.getByRole('button')).toHaveClass('border');
  });

  it('applies the correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
    expect(screen.getByRole('button')).toHaveClass('px-3');
    expect(screen.getByRole('button')).toHaveClass('text-xs');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
    expect(screen.getByRole('button')).toHaveClass('px-6');
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  it('forwards additional props to the button element', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} data-testid="test-button">
        Click me
      </Button>
    );
    
    const button = screen.getByTestId('test-button');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">With Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
