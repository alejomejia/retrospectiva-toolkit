'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/atoms/button'

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
  clothingStatusLabelsMap,
  clothingStatusValues,
  clothingTypesData,
  clothingTypesValues,
  isMeasurementRequired,
  type ClothingTypeValue
} from './const'

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'El nombre del producto debe tener al menos 5 caracteres'
  }),
  status: z.enum(['new', 'new-with-label', 'new-without-label', 'used'], {
    required_error: 'Debes seleccionar un estado'
  }),
  price: z.coerce.number().min(1, {
    message: 'El precio del producto debe ser mayor a 0'
  }),
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

export function CreateNewProductForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      status: 'new',
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('Form submitted successfully:', values)
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

        <FormRadioField
          control={form.control}
          name="status"
          label="Estado"
          options={clothingStatusValues.map((value) => ({ label: clothingStatusLabelsMap[value], value }))}
        />

        <FormNumberField control={form.control} name="price" label="Precio" placeholder="19.99" prefix="€" />
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
          options={clothingTypesData}
        />

        {isMeasurementRequired(form.watch('type'), 'shoulder') && (
          <FormNumberField control={form.control} name="size_shoulder" label="Hombro a hombro" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'chest') && (
          <FormNumberField control={form.control} name="size_chest" label="Pecho" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'waist') && (
          <FormNumberField control={form.control} name="size_waist" label="Cintura" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'hip') && (
          <FormNumberField control={form.control} name="size_hip" label="Cadera" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'rise') && (
          <FormNumberField control={form.control} name="size_rise" label="Tiro" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'leg') && (
          <FormNumberField control={form.control} name="size_leg" label="Pierna" suffix="cm" />
        )}
        {isMeasurementRequired(form.watch('type'), 'length') && (
          <FormNumberField control={form.control} name="size_length" label="Largo" suffix="cm" />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
