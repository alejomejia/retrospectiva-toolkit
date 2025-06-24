import { cn } from '@/lib/utils'

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  onClick: () => void
}

export function IconButton({ className, onClick, children, ...buttonProps }: IconButtonProps) {
  return (
    <button className={cn('p-4 rounded-lg border border-input', className)} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  )
}
