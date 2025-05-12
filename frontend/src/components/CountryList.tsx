import { useQuery } from "@apollo/client"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { GET_COUNTRY_NAME_AND_EMOJI } from "@/api/queries"

export default function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRY_NAME_AND_EMOJI)

  console.log("emoji:", data);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        List loading ...
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading countries: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.countries.map((country: any) => (
        <Link to={`/country/${country.code}`} key={country.code}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl emoji">{country.emoji}</div>
                <div className="font-medium">{country.name}</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
