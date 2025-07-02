'use client'

import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

import { createProductDescription } from './utils'
import type { ProductSheetRecord } from '../types'

type Props = {
  product: ProductSheetRecord
}

export function CopyProductDescription({ product }: Props) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: 'Descripción copiada al portapapeles'
  })

  const handleCopy = () => {
    const description = createProductDescription(product)
    copyToClipboard(description)
  }

  return (
    <Button className="h-8 w-8 p-0" variant="ghost" onClick={handleCopy} disabled={isCopied}>
      <span className="sr-only">Copiar mensaje</span>
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  )
}
