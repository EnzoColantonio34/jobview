import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <div className="absolute left-4 top-20 z-40 md:hidden">
      <Button variant="ghost" size="icon" onClick={onClick} className="h-10 w-10">
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  )
}
