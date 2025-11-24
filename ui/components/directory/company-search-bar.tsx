import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { THEME_TEMPLATES } from "@/config/theme-templates"

interface CompanySearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onAdd: () => void
}

export function CompanySearchBar({ searchTerm, onSearchChange, onAdd }: CompanySearchBarProps) {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className={`absolute left-3 top-3 h-5 w-5 ${THEME_TEMPLATES.text.muted}`} />
        <input
          type="text"
          placeholder="Rechercher une entreprise..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-input pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
      </div>
      <Button className="gap-1 bg-gradient-to-r from-primary to-secondary" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        Ajouter
      </Button>
    </div>
  )
}
