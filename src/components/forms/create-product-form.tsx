'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/atoms/button'
import { addProduct } from '@/lib/googleapis/actions'

import {
  Form,
  FormNumberField,
  FormRadioField,
  FormSelectField,
  FormSwitchField,
  FormTextareaField,
  FormTextField
} from '@/components/molecules/form-fields'

import {
  clothingStatusData,
  clothingSizesData,
  clothingTypesData,
  clothingTypesValues,
  clothingSizesValues,
  isMeasurementRequired,
  type ClothingTypeValue,
  type ClothingSizeValue
} from './const'

export const addProductFormSchema = z.object({
  name: z.string().min(5, {
    message: 'El nombre del producto debe tener al menos 5 caracteres'
  }),
  status: z.enum(['new', 'new-with-label', 'new-without-label', 'used'], {
    required_error: 'Debes seleccionar un estado'
  }),
  price: z.coerce.number().min(1, {
    message: 'El precio del producto debe ser mayor a 0'
  }),
  size: z.enum(clothingSizesValues as [ClothingSizeValue]),
  is_deadstock: z.boolean(),
  details: z.string().optional(),
  type: z.enum(clothingTypesValues as [ClothingTypeValue]),
  size_shoulder: z.coerce.number().optional(),
  size_chest: z.coerce.number().optional(),
  size_waist: z.coerce.number().optional(),
  size_hip: z.coerce.number().optional(),
  size_rise: z.coerce.number().optional(),
  size_leg: z.coerce.number().optional(),
  size_length: z.coerce.number().optional()
})

export function CreateProductForm() {
  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: '',
      status: 'new',
      price: 0,
      size: 'm',
      is_deadstock: false,
      details: '',
      type: 'shirt',
      size_shoulder: 0,
      size_chest: 0,
      size_waist: 0,
      size_hip: 0,
      size_rise: 0,
      size_leg: 0,
      size_length: 0
    }
  })

  function onSubmit(values: z.infer<typeof addProductFormSchema>) {
    addProduct(values)

    toast.success('Producto agregado correctamente')
    // form.reset()
  }

  function onError(errors: unknown) {
    console.log('Form validation errors:', errors)
    console.log('Form state:', form.formState)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        <FormTextField
          control={form.control}
          name="name"
          label="Nombre del producto"
          placeholder="Camisa vintage hawaiana"
        />

        <FormRadioField control={form.control} name="status" label="Estado" options={clothingStatusData} />

        <FormNumberField control={form.control} name="price" label="Precio" placeholder="19.99" prefix="€" />

        <FormSelectField
          form={form}
          control={form.control}
          name="size"
          label="Talla"
          initialPlaceholder="Selecciona una talla"
          placeholder="Buscar talla..."
          options={clothingSizesData}
        />

        <FormSwitchField control={form.control} name="is_deadstock" label="Es deadstock?" />

        <FormTextareaField
          control={form.control}
          name="details"
          label="Detalles de la prenda"
          placeholder="Su tela es viscosa y poliamida. Su color es muy lindo. Es súper fresco, perfecto para la temporada."
        />

        <FormSelectField
          form={form}
          control={form.control}
          name="type"
          label="Tipo de prenda"
          description="Necesario para desplegar los campos para las tallas en caso de ser necesario"
          initialPlaceholder="Selecciona un tipo de prenda"
          placeholder="Buscar tipo de prenda..."
          options={clothingTypesData}
        />

        {isMeasurementRequired(form.watch('type'), 'shoulder') && (
          <FormNumberField control={form.control} name="size_shoulder" label="Hombro a hombro" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'chest') && (
          <FormNumberField
            control={form.control}
            name="size_chest"
            label="Pecho"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isMeasurementRequired(form.watch('type'), 'waist') && (
          <FormNumberField
            control={form.control}
            name="size_waist"
            label="Cintura"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isMeasurementRequired(form.watch('type'), 'hip') && (
          <FormNumberField
            control={form.control}
            name="size_hip"
            label="Cadera"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isMeasurementRequired(form.watch('type'), 'rise') && (
          <FormNumberField control={form.control} name="size_rise" label="Tiro" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'leg') && (
          <FormNumberField
            control={form.control}
            name="size_leg"
            label="Pierna"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isMeasurementRequired(form.watch('type'), 'length') && (
          <FormNumberField control={form.control} name="size_length" label="Largo" suffix="cm" />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
