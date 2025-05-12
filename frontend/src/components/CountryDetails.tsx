import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { GET_SINGLE_COUNTRY_BY_CODE } from "@/api/queries"


export default function CountryDetail() {
  const { code } = useParams<{ code: string }>()
  const { loading, error, data } = useQuery(GET_SINGLE_COUNTRY_BY_CODE, {
    variables: { code },
  })

  if (loading) {
    return <div>Loading country details...</div>
  }

  if (error) {
    return <div className="text-red-500">Error loading country: {error.message}</div>
  }

  if (!data.country) {
    return <div>Country not found</div>
  }

  const { country } = data

  return (
    <div className="space-y-6 py-18 px-8">
      <div className="flex items-center gap-4">
        <Link to="/" >
          <Button variant="outline" size="icon" className="cursor-pointer">
            <ArrowLeft className="h-4 w-4 cursor-pointer" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Country Details</h1>
      </div>

      <div className="max-w-md mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted">
            <CardTitle className="flex items-center gap-4">
              <span className="text-5xl">{country.emoji}</span>
              <span>{country.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Country Code</h3>
                <p className="text-lg font-medium">{country.code}</p>
              </div>
              {country.continent ? (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Continent</h3>
                <p className="text-lg font-medium">{country.continent.name}</p>
              </div>
              ) : (
                <h3 className="text-sm font-medium text-muted-foreground">Continent undefined</h3>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
