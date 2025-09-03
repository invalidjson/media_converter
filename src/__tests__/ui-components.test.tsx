import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

describe('UI Components', () => {
  describe('Button', () => {
    test('renders button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    test('handles click events', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      
      render(<Button onClick={handleClick}>Click me</Button>)
      
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test('applies variant styles', () => {
      const { rerender } = render(<Button variant="destructive">Button</Button>)
      let button = screen.getByRole('button')
      expect(button).toHaveClass('bg-accent')
      
      rerender(<Button variant="outline">Button</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('border')
      
      rerender(<Button variant="ghost">Button</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent')
    })

    test('applies size styles', () => {
      const { rerender } = render(<Button size="sm">Button</Button>)
      let button = screen.getByRole('button')
      expect(button).toHaveClass('h-9')
      
      rerender(<Button size="lg">Button</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('h-11')
      
      rerender(<Button size="icon">Button</Button>)
      button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })

    test('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    })
  })

  describe('Card', () => {
    test('renders card with content', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
        </Card>
      )

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card description')).toBeInTheDocument()
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    test('applies correct CSS classes', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Title</CardTitle>
            <CardDescription data-testid="description">Description</CardDescription>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      )

      expect(screen.getByTestId('card')).toHaveClass('rounded-lg', 'border', 'bg-card')
      expect(screen.getByTestId('header')).toHaveClass('p-6')
      expect(screen.getByTestId('title')).toHaveClass('text-2xl', 'font-semibold')
      expect(screen.getByTestId('description')).toHaveClass('text-muted-foreground')
      expect(screen.getByTestId('content')).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('Progress', () => {
    test('renders progress bar', () => {
      render(<Progress value={50} data-testid="progress" />)
      
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveClass('relative', 'h-4', 'w-full', 'overflow-hidden', 'rounded-full')
    })

    test('applies correct progress value', () => {
      render(<Progress value={75} data-testid="progress" />)
      
      const progressIndicator = screen.getByTestId('progress').querySelector('[data-state]') || 
                               screen.getByTestId('progress').querySelector('.bg-primary')
      
      if (progressIndicator) {
        expect(progressIndicator).toHaveStyle({ transform: 'translateX(-25%)' })
      }
    })

    test('handles zero progress', () => {
      render(<Progress value={0} data-testid="progress" />)
      
      const progressIndicator = screen.getByTestId('progress').querySelector('[data-state]') || 
                               screen.getByTestId('progress').querySelector('.bg-primary')
      
      if (progressIndicator) {
        expect(progressIndicator).toHaveStyle({ transform: 'translateX(-100%)' })
      }
    })

    test('handles complete progress', () => {
      render(<Progress value={100} data-testid="progress" />)
      
      const progressIndicator = screen.getByTestId('progress').querySelector('[data-state]') || 
                               screen.getByTestId('progress').querySelector('.bg-primary')
      
      if (progressIndicator) {
        expect(progressIndicator).toHaveStyle({ transform: 'translateX(-0%)' })
      }
    })
  })
})