'use client'

import {
  Form,
  FormNumberField,
  FormSelectField,
  FormTextareaField,
  FormTextField
} from '@/components/molecules/form-fields'
import { Button } from '@/components/atoms/button'

import {
  clothingConditions,
  clothingSizes,
  clothingStatus,
  clothingTypes,
  isClothingMeasurementRequired
} from '../utils'
import { useAddProductForm } from './hooks/use-add-product-form'

type AddProductFormProps = {
  onSubmit?: () => void
  onCancel?: () => void
}

export function AddProductForm({ onSubmit, onCancel }: AddProductFormProps) {
  const { form, onFormSubmit, onError, productType, isSubmitting } = useAddProductForm({ onSubmit })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit, onError)} className="space-y-8">
        <FormTextField
          control={form.control}
          name="name"
          label="Nombre del producto"
          placeholder="Camisa vintage hawaiana"
        />

        <FormSelectField
          form={form}
          control={form.control}
          name="status"
          label="Estado"
          initialPlaceholder="Selecciona el estado de la prenda"
          placeholder="Buscar estado..."
          options={clothingStatus}
        />

        <FormSelectField
          form={form}
          control={form.control}
          name="condition"
          label="Condición"
          initialPlaceholder="Selecciona una condición"
          placeholder="Buscar condición..."
          options={clothingConditions}
        />

        <div className="h-px w-full bg-input" />

        <FormSelectField
          form={form}
          control={form.control}
          name="type"
          label="Tipo de prenda"
          description="Necesario para desplegar los campos para las tallas en caso de ser necesario"
          initialPlaceholder="Selecciona un tipo de prenda"
          placeholder="Buscar tipo de prenda..."
          options={clothingTypes}
        />

        {isClothingMeasurementRequired(productType, 'shoulder') && (
          <FormNumberField control={form.control} name="size_shoulder" label="Hombro a hombro" suffix="cm" />
        )}
        {isClothingMeasurementRequired(productType, 'chest') && (
          <FormNumberField
            control={form.control}
            name="size_chest"
            label="Pecho"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isClothingMeasurementRequired(productType, 'waist') && (
          <FormNumberField
            control={form.control}
            name="size_waist"
            label="Cintura"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isClothingMeasurementRequired(productType, 'hip') && (
          <FormNumberField
            control={form.control}
            name="size_hip"
            label="Cadera"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isClothingMeasurementRequired(productType, 'rise') && (
          <FormNumberField control={form.control} name="size_rise" label="Tiro" suffix="cm" />
        )}
        {isClothingMeasurementRequired(productType, 'leg') && (
          <FormNumberField
            control={form.control}
            name="size_leg"
            label="Pierna"
            description="El valor automaticamente se multiplica por 2"
            suffix="cm"
          />
        )}
        {isClothingMeasurementRequired(productType, 'length') && (
          <FormNumberField control={form.control} name="size_length" label="Largo" suffix="cm" />
        )}

        <div className="h-px w-full bg-input" />

        <FormNumberField control={form.control} name="price" label="Precio" placeholder="19.99" prefix="€" />

        <FormSelectField
          form={form}
          control={form.control}
          name="size"
          label="Talla"
          initialPlaceholder="Selecciona una talla"
          placeholder="Buscar talla..."
          options={clothingSizes}
        />

        <FormTextareaField
          control={form.control}
          name="description"
          label="Descripción de la prenda"
          placeholder="Su tela es viscosa y poliamida. Su color es muy lindo. Es súper fresco, perfecto para la temporada."
        />

        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Agregar
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
