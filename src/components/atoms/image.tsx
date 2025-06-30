import NextImage, { type ImageProps } from 'next/image'

export function Image({ src, alt, ...props }: ImageProps) {
  return <NextImage src={src} alt={alt} {...props} />
}
