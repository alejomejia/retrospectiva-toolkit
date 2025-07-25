'use client'

import { Button } from '@/components/atoms/button'
import { Form, FormTextField } from '@/components/molecules/form-fields'

import { useLoginForm } from './hooks/use-login-form'

export function LoginForm() {
  const { form, state, onSubmit } = useLoginForm()
  const { isSubmitting, isLoading } = state

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormTextField control={form.control} name="username" label="Nombre de usuario" />
        <FormTextField control={form.control} name="password" label="Contraseña" placeholder="******" isPassword />
        <Button className="w-full" type="submit" disabled={isSubmitting || isLoading}>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
