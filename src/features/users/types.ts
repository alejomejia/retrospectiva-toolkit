import { z } from 'zod'

const userRoles = ['admin', 'eu', 'col'] as const
type UserRole = (typeof userRoles)[number]

export type User = {
  username: string
  password: string
  role: UserRole
  avatarFilename?: string
}

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: 'El nombre de usuario es requerido'
  }),
  password: z.string().min(1, {
    message: 'La contraseña es requerida'
  })
})
