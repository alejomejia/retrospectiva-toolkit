import { SideNavigation } from './side-navigation'

type BaseLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <SideNavigation />
      <main className="flex-1">{children}</main>
    </div>
  )
}
