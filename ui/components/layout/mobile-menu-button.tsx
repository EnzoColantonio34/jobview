import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  if (isOpen) return null
  
  return (
    <div className="fixed left-4 top-20 z-40 md:hidden">
      <Button variant="ghost" size="icon" onClick={onClick} className="h-10 w-10">
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  )
}
