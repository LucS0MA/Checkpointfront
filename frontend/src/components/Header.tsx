import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-background shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-1xl mx-auto">
        <Link  to="/">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          🌍 Checkpoint: Frontend
        </h1>
        </Link>
        <Button asChild variant="outline">
          <Link to="/">Countries</Link>
        </Button>
      </div>
    </header>
  )
}
