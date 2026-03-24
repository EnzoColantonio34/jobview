interface MobileOverlayProps {
  isOpen: boolean
  onClick: () => void
}

export function MobileOverlay({ isOpen, onClick }: MobileOverlayProps) {
  if (!isOpen) return null
  
  return <div className="fixed inset-0 top-16 z-20 bg-black/50 md:hidden" onClick={onClick} />
}
