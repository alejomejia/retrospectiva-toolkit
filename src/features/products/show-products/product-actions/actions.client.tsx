'use client'

import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import { createProductDescription } from '../utils'
import type { ProductSheetRecord } from '../../types'

type Props = {
  product: ProductSheetRecord
}

export function CopyDescriptionAction({ product }: Props) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: 'Descripción copiada al portapapeles'
  })

  const handleCopy = () => {
    const description = createProductDescription(product)
    copyToClipboard(description)
  }

  return (
    <Button className="size-8 p-0" variant="outline" onClick={handleCopy} disabled={isCopied}>
      <span className="sr-only">Copiar mensaje</span>
      {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  )
}
