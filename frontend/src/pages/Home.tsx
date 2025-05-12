import CountryList from "../components/CountryList"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
      <div className="container mx-auto py-18 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Countries of the World</h1>
          <Link to="/add">
            <Button className="flex items-center gap-4 cursor-pointer bg-black text-white ml4">
              <PlusCircle className="h-4 w-4" />
              Add Country
            </Button>
          </Link>
        </div>
        <CountryList />
      </div>
  )
}
