import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/card'
import { cn } from '@/lib/utils'

import { LoginForm } from './login-form'

export function LoginPage({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription>Ingresa tu usuario y contraseña para iniciar sesión</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
