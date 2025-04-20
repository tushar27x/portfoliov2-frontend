import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Building } from "lucide-react"

export default function ExperienceContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Experience</h2>
        <Button className="flex items-center gap-2">  
          <PlusCircle className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id} className="bg-gray-700 text-white border-gray-600">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{experience.role}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>{experience.period}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Building className="h-4 w-4" />
                <span>{experience.company}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">{experience.description}</p>
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
    </div>
  )
}

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2020 - Present",
    description:
      "Leading the frontend development team, implementing modern React architectures and mentoring junior developers.",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2018 - 2020",
    description: "Developed and maintained full-stack applications using React, Node.js, and MongoDB.",
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Creative Web Agency",
    period: "2016 - 2018",
    description: "Created responsive websites and implemented UI designs for various clients.",
  },
]
