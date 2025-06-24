'use client'

import NextLink from 'next/link'
import { LinkProps, isStringHref } from './types'

import { cn } from '@/lib/utils'

const SHARED_CLASSNAME = 'inline-block transition-colors duration-300'

export function Link({ href, target, className, children, ...props }: LinkProps) {
  const isExternalLink = target === '_blank'

  return isExternalLink ? (
    <a
      className={cn(SHARED_CLASSNAME, className)}
      href={isStringHref(href) ? href : href.toString()}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  ) : (
    <NextLink className={cn(SHARED_CLASSNAME, className)} href={href} target={target} {...props}>
      {children}
    </NextLink>
  )
}
