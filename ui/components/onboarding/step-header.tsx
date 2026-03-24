import type { LucideIcon } from "lucide-react"

interface StepHeaderProps {
  icon: LucideIcon
  title: string
  description: string
}

export function StepHeader({ icon: Icon, title, description }: StepHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
