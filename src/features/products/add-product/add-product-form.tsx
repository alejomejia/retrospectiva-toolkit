'use client'

import {
  Form,
  FormNumberField,
  FormRadioField,
  FormSelectField,
  FormSwitchField,
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
  const { form, onFormSubmit, onError, productType } = useAddProductForm({ onSubmit })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit, onError)} className="space-y-8">
        <FormTextField
          control={form.control}
          name="name"
          label="Nombre del producto"
          placeholder="Camisa vintage hawaiana"
        />

        <FormRadioField control={form.control} name="status" label="Estado" options={clothingStatus} />

        <FormNumberField control={form.control} name="price" label="Precio" placeholder="19.99" prefix="€" />

        <FormSelectField
          form={form}
          control={form.control}
          name="condition"
          label="Condición"
          initialPlaceholder="Selecciona una condición"
          placeholder="Buscar condición..."
          options={clothingConditions}
        />

        <FormSelectField
          form={form}
          control={form.control}
          name="size"
          label="Talla"
          initialPlaceholder="Selecciona una talla"
          placeholder="Buscar talla..."
          options={clothingSizes}
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

        <div className="flex flex-col gap-3">
          <Button type="submit">Agregar</Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
