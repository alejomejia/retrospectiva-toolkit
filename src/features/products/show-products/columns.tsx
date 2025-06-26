'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/atoms/checkbox'

import { createProductDescription, formatPrice, formatSize } from './utils'
import type { ProductSheetRecord } from '../types'
import {
  getClothingConditionsLabel,
  getClothingSizeLabel,
  getClothingStatusLabel,
  getClothingTypeLabel
} from '../utils'

export const columns: ColumnDef<ProductSheetRecord>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'Producto'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as ProductSheetRecord['status']
      return getClothingStatusLabel(status)
    }
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = row.getValue('price') as ProductSheetRecord['price']
      return formatPrice(price)
    }
  },
  {
    accessorKey: 'condition',
    header: 'Condición',
    cell: ({ row }) => {
      const condition = row.getValue('condition') as ProductSheetRecord['condition']
      return getClothingConditionsLabel(condition)
    }
  },
  {
    accessorKey: 'size',
    header: 'Talla',
    cell: ({ row }) => {
      const size = row.getValue('size') as ProductSheetRecord['size']
      return getClothingSizeLabel(size)
    }
  },
  {
    accessorKey: 'is_deadstock',
    header: 'Deadstock?',
    cell: ({ row }) => {
      const isDeadstock = row.getValue('is_deadstock')
      return isDeadstock ? 'Sí' : 'No'
    }
  },
  {
    accessorKey: 'details',
    header: 'Detalles'
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as ProductSheetRecord['type']
      return getClothingTypeLabel(type)
    }
  },
  {
    accessorKey: 'size_shoulder',
    header: 'Medida hombro',
    cell: ({ row }) => {
      const size = row.getValue('size_shoulder') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_chest',
    header: 'Medida pecho',
    cell: ({ row }) => {
      const size = row.getValue('size_chest') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_waist',
    header: 'Medida cintura',
    cell: ({ row }) => {
      const size = row.getValue('size_waist') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_hip',
    header: 'Medida cadera',
    cell: ({ row }) => {
      const size = row.getValue('size_hip') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_rise',
    header: 'Medida tiro',
    cell: ({ row }) => {
      const size = row.getValue('size_rise') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_leg',
    header: 'Medida pierna',
    cell: ({ row }) => {
      const size = row.getValue('size_leg') as number
      return formatSize(size)
    }
  },
  {
    accessorKey: 'size_length',
    header: 'Medida largo',
    cell: ({ row }) => {
      const size = row.getValue('size_length') as number
      return formatSize(size)
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      const handleCopy = () => {
        const description = createProductDescription(product)

        navigator.clipboard.writeText(description)
        toast.success('Descripción copiada al portapapeles')
      }

      return (
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleCopy}>
          <span className="sr-only">Copiar mensaje</span>
          <Copy className="h-4 w-4" />
        </Button>
      )
    }
  }
]
