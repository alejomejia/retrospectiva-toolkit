import type { LinkProps as NextLinkProps } from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type AnchorProps = ComponentProps<'a'>

type BaseProps = {
  className?: string
  target?: string
  children: ReactNode
}

export type ExternalLinkProps = BaseProps & {
  href: string
} & Omit<AnchorProps, keyof BaseProps | 'href'>

export type InternalLinkProps = BaseProps & {
  href: NextLinkProps['href']
} & Omit<NextLinkProps, keyof BaseProps | 'href'>

export type LinkProps = ExternalLinkProps | InternalLinkProps

export const isStringHref = (href: LinkProps['href']): href is string => typeof href === 'string'
