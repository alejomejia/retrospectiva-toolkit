import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { login } from '../../services'
import { loginSchema } from '../../types'

export function useLoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const router = useRouter()

  async function onFormSubmit(values: z.infer<typeof loginSchema>) {
    const submitCredentials = async () => {
      try {
        await login(values.username, values.password)
        return `Has iniciado sesión correctamente`
      } catch {
        throw new Error('Error al iniciar sesión')
      }
    }

    toast.promise(submitCredentials(), {
      loading: 'Comprobando credenciales...',
      success: (message) => {
        form.reset()
        router.push('/')
        return message
      },
      error: (error) => ({
        message: error.message
      })
    })
  }

  function onError(errors: unknown) {
    console.log('Form validation errors:', errors)
    console.log('Form state:', form.formState)
  }

  return {
    form,
    onFormSubmit,
    onError
  }
}
