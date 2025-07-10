type PageTitleProps = {
  title: string
  rightSlot?: React.ReactNode
}

export function PageTitle({ title, rightSlot }: PageTitleProps) {
  return (
    <header className="sticky z-10 bg-background top-0 flex justify-between gap-4 p-6 border-b border-input">
      <h1 className="text-2xl font-bold">{title}</h1>
      {rightSlot}
    </header>
  )
}
