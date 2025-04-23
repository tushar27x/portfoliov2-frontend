"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Building } from "lucide-react"
import { useEffect, useState } from "react"
import { getExperiences } from "@/app/lib/api"

export default function ExperienceContent() {
  
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState<Boolean>(true)

  const getExperienceData = async()=>{
    const token :string|null = localStorage.getItem("portfolio-admin-token")
        console.log(token)
        if (!token) {
          setExperiences([]);
          return;
        }
        const data = await getExperiences(token);
        setExperiences(data.experiences)
        setLoading(false);
  }
  useEffect(()=>{
    getExperienceData();
  },[])
  useEffect(()=>{
    console.log(experiences);
  },[experiences])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Experience</h2>
      </div>
      <Button className="flex items-center gap-2">  
        <PlusCircle className="h-4 w-4" />
        Add Experience
      </Button> 
      {
        loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="flex space-x-1 text-xl font-semibold text-gray-700 animate-pulse">
              <span className="animate-bounce [animation-delay:-0.3s]">.</span>
              <span className="animate-bounce [animation-delay:-0.15s]">.</span>
              <span className="animate-bounce">.</span>
            </span>
          </div>
        ):(
          <div className="space-y-4">
            {experiences.map((experience) => (
              <Card key={experience.id} className="bg-gray-100 text-black border-gray-600">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{experience.designation}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building className="h-4 w-4" />
                    <span>{experience.companyName}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-black">{experience.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
    }
    </div>
  )
}
