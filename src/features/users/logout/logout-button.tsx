'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/tooltip'

import { logout } from '../services'

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  async function onLogout() {
    setIsLoading(true)

    const loggingOut = async () => {
      try {
        await logout()
        return `Has cerrado sesión correctamente`
      } catch {
        throw new Error('Error al cerrar sesión')
      }
    }

    toast.promise(loggingOut(), {
      loading: 'Cerrando sesión...',
      success: (message) => {
        router.push('/')
        router.refresh()

        return message
      },
      error: (error) => ({
        message: error.message
      })
    })

    setIsLoading(false)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            disabled={isLoading}
            className="w-12 h-12 text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
