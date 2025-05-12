import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { GET_COUNTRY_NAME_AND_EMOJI, GET_CONTINENTS } from "@/api/queries"
import { CREATE_NEW_COUNTRY } from "@/api/mutations"

export default function AddCountryForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    code: "",
    continentId: "",
  })

  // Récupérer la liste des continents
  const { loading: continentsLoading, error: continentsError, data: continentsData } = useQuery(GET_CONTINENTS)

  const [addCountry, { loading, error }] = useMutation(CREATE_NEW_COUNTRY, {
    onCompleted: (data) => {
      toast.success(`Added ${data.addCountry.name} to the database`)
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: GET_COUNTRY_NAME_AND_EMOJI }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addCountry({
      variables: {
        data: {
          name: formData.name,
          code: formData.code,
          emoji: formData.emoji,
          continent: { id: parseInt(formData.continentId, 10) },
        },
      },
    })
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Country</CardTitle>
        <CardDescription>Fill in the details to add a new country to the database.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Country Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. New Zealand"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Country Code</Label>
            <Input
              id="code"
              name="code"
              placeholder="e.g. NZ"
              value={formData.code}
              onChange={handleChange}
              required
              maxLength={3}
              minLength={2}
            />
            <p className="text-xs text-muted-foreground">2-3 letter country code (ISO 3166-1)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emoji">Country Flag Emoji</Label>
            <Input
              id="emoji"
              name="emoji"
              placeholder="e.g. 🇳🇿"
              value={formData.emoji}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nouveau select pour le continent */}
          <div className="space-y-2">
            <Label htmlFor="continentId">Continent</Label>
            {continentsLoading ? (
              <p>Loading continents…</p>
            ) : continentsError || !continentsData ? (
              <p className="text-red-500">Error loading continents</p>
            ) : (
              <select
                id="continentId"
                name="continentId"
                value={formData.continentId}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a continent</option>
                {continentsData.continents.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </CardContent>

        <CardFooter className="flex justify-center items-center">
          <Button type="submit" className="w-full text-white bg-black mt-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Country...
              </>
            ) : (
              "Add Country"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
