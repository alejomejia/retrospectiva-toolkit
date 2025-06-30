'use client'

import { useState } from 'react'
import { FormProvider, type Control, type UseFormReturn } from 'react-hook-form'
import { Check, ChevronsUpDown, Eye, EyeClosed } from 'lucide-react'

import { Input } from '@/components/atoms/input'
import { Switch } from '@/components/atoms/switch'
import { Textarea } from '@/components/atoms/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/atoms/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/atoms/command'
import { Button } from '@/components/atoms/button'

import { cn } from '@/lib/utils'

export const Form = FormProvider

type FormTextFieldProps = {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  isPassword?: boolean
}

export function FormTextField({ control, name, label, description, placeholder, isPassword }: FormTextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className={cn({ 'pr-14': isPassword })}
                type={isPassword && !isPasswordVisible ? 'password' : 'text'}
                placeholder={placeholder}
                {...field}
              />

              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-0 bottom-0 right-0 flex items-center justify-center max-w-10 w-full border-l border-input rounded-none"
                  onClick={() => togglePasswordVisibility()}
                >
                  {isPasswordVisible ? <Eye /> : <EyeClosed />}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type FormNumberFieldProps = {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
  step?: number
  prefix?: string
  suffix?: string
}

export function FormNumberField({
  control,
  name,
  label,
  description,
  placeholder,
  step = 0,
  prefix,
  suffix
}: FormNumberFieldProps) {
  const fixClassnames =
    'pointer-events-none absolute top-0 bottom-0 flex items-center justify-center max-w-10 w-full text-sm'

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {prefix && <span className={cn(fixClassnames, 'left-0 border-r border-input')}>{prefix}</span>}
              <Input
                className={cn({
                  'pl-14': prefix,
                  'pr-14': suffix
                })}
                placeholder={placeholder}
                type="number"
                step={step}
                {...field}
              />
              {suffix && <span className={cn(fixClassnames, 'right-0 border-l border-input')}>{suffix}</span>}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type FormRadioOption = {
  label: string
  value: string
}

type FormRadioFieldProps = {
  control: Control<any>
  name: string
  label: string
  description?: string
  options: FormRadioOption[]
}

export function FormRadioField({ control, name, label, description, options }: FormRadioFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col">
              {options.map(({ label, value }, index) => (
                <FormItem key={`${name}-${index}`} className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type FormSwitchFieldProps = {
  control: Control<any>
  name: string
  label: string
  description?: string
}

export function FormSwitchField({ control, name, label, description }: FormSwitchFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <FormLabel className="block w-full">{label}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type FormTextareaFieldProps = {
  control: Control<any>
  name: string
  label: string
  description?: string
  placeholder?: string
}

export function FormTextareaField({ control, name, label, description, placeholder }: FormTextareaFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type FormSelectOption = {
  label: string
  value: string
}

type FormSelectFieldProps = {
  form: UseFormReturn<any>
  control: Control<any>
  name: string
  label: string
  description?: string
  initialPlaceholder?: string
  placeholder?: string
  options: FormSelectOption[]
}

export function FormSelectField({
  form,
  control,
  name,
  label,
  description,
  initialPlaceholder = '',
  placeholder,
  options
}: FormSelectFieldProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? options.find((type) => type.value === field.value)?.label : initialPlaceholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>El tipo de prenda no existe.</CommandEmpty>
                  <CommandGroup>
                    {options.map((type) => (
                      <CommandItem
                        value={type.label}
                        key={type.value}
                        onSelect={() => {
                          form.setValue(name, type.value)
                          setPopoverOpen(false)
                        }}
                      >
                        {type.label}
                        <Check className={cn('ml-auto', type.value === field.value ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
