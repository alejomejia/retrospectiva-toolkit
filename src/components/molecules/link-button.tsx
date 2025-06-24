import { Link } from '@/components/atoms/link'
import type { LinkProps } from '@/components/atoms/link/types'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

import { cn } from '@/lib/utils'

type LinkButtonProps = LinkProps & {
  tooltip?: string
}

export function LinkButton({ className, tooltip, href, target, children, ...linkProps }: LinkButtonProps) {
  return tooltip ? (
    <LinkButtonWithTooltip className={className} tooltip={tooltip} href={href} target={target} {...linkProps}>
      {children}
    </LinkButtonWithTooltip>
  ) : (
    <LinkButtonWithoutTooltip className={className} href={href} target={target} {...linkProps}>
      {children}
    </LinkButtonWithoutTooltip>
  )
}

function LinkButtonWithoutTooltip({ className, href, target, children, ...linkProps }: LinkButtonProps) {
  return (
    <Link
      className={cn('block p-4 rounded-lg border border-input', className)}
      href={href}
      target={target}
      {...linkProps}
    >
      {children}
    </Link>
  )
}

function LinkButtonWithTooltip({ className, tooltip, href, target, children, ...linkProps }: LinkButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link
          className={cn('block p-2 rounded-lg border border-input', className)}
          href={href}
          target={target}
          {...linkProps}
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" align="center">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
