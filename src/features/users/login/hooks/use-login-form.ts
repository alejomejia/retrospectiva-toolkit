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

        form.reset()
        router.push('/')
        router.refresh()

        return `Has iniciado sesión correctamente`
      } catch {
        throw new Error('Usuario o contraseña incorrecta')
      }
    }

    // store the promise in a variable to avoid form state issues
    const submissionPromise = submitCredentials()

    toast.promise(submissionPromise, {
      loading: 'Comprobando credenciales...',
      success: (message) => message,
      error: (error) => ({
        message: error.message
      })
    })

    return await submissionPromise
  }

  function onError(errors: unknown) {
    console.log('Form validation errors:', errors)
    console.log('Form state:', form.formState)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.handleSubmit(onFormSubmit)(e)
  }

  return {
    form,
    state: form.formState,
    onSubmit,
    onError
  }
}
