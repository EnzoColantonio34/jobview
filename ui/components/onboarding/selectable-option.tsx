import { cn } from "@/lib/utils"

interface SelectableOptionProps {
  selected: boolean
  onClick: () => void
  label: string
  icon?: string
  children?: React.ReactNode
}

export function SelectableOption({ selected, onClick, label, icon, children }: SelectableOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all duration-200",
        selected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border bg-card hover:border-primary/40 hover:bg-primary/5",
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {!icon && (
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-primary" : "border-muted-foreground/30",
          )}
        >
          {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </div>
      )}
      {children ?? (
        <span className={cn("text-sm font-medium", selected ? "text-foreground" : "text-muted-foreground")}>
          {label}
        </span>
      )}
    </button>
  )
}
