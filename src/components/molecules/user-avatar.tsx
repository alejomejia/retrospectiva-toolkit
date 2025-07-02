import { useUser } from '@/features/users/hooks/use-user'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/tooltip'
import { Image } from '@/components/atoms/image'

export function UserAvatar() {
  const { user } = useUser()
  const { username, avatarFilename } = user ?? {}

  const fallbackUsername = username?.split('')[0] ?? 'A'
  const displayedUsername = username ?? 'Anonimo'
  const avatarSrc = avatarFilename ? `/assets/${avatarFilename}.webp` : null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {avatarSrc ? (
            <Image src={avatarSrc} alt={displayedUsername} width={40} height={40} />
          ) : (
            <span className="flex items-center justify-center size-10 rounded-full uppercase font-bold bg-muted">
              {fallbackUsername}
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-sm capitalize">{displayedUsername}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
