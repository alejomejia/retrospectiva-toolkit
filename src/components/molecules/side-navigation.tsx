'use client'

import { ShirtIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { LogoutButton } from '@/features/users/logout/logout-button'
import { cn } from '@/lib/utils'

import { LinkButton } from './link-button'
import { UserAvatar } from './user-avatar'

const NAVIGATION_ITEMS = [
  {
    id: 'nav-01',
    label: 'Productos',
    icon: ShirtIcon,
    href: '/',
    enabled: true
  },
  {
    id: 'nav-02',
    label: 'Clientes',
    icon: UserIcon,
    href: '/customers',
    enabled: false
  }
]

export function SideNavigation() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 max-h-screen w-20 border-r border-r-input p-4 flex flex-col">
      <nav className="flex-1">
        <ul className="flex flex-col gap-4 items-center justify-center">
          {NAVIGATION_ITEMS.map(({ id, label, icon, href, enabled }) => {
            const Icon = icon

            return enabled ? (
              <li key={id}>
                <LinkButton
                  tooltip={label}
                  href={href}
                  className={cn(pathname === href && 'bg-primary text-primary-foreground')}
                >
                  <Icon />
                </LinkButton>
              </li>
            ) : null
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-3 items-center justify-center">
        <UserAvatar />
        <LogoutButton />
      </div>
    </aside>
  )
}
