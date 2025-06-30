import { AuthLayout } from '@/components/molecules/auth-layout'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthLayout>{children}</AuthLayout>
}
