import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function SkillsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="bg-gray-700 text-white border-gray-600">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{skill.name}</span>
                <span className="text-gray-300">{skill.level}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={skill.level} className="h-2" />
              <p className="mt-4 text-sm text-gray-300">{skill.description}</p>
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

const skills = [
  {
    id: 1,
    name: "React",
    level: 95,
    description: "Advanced knowledge of React, including hooks, context API, and performance optimization.",
  },
  {
    id: 2,
    name: "Next.js",
    level: 90,
    description: "Extensive experience with Next.js, including App Router, SSR, and ISR.",
  },
  {
    id: 3,
    name: "TypeScript",
    level: 85,
    description: "Strong typing skills with TypeScript, including advanced types and generics.",
  },
  {
    id: 4,
    name: "Node.js",
    level: 80,
    description: "Building RESTful APIs and microservices with Express and Node.js.",
  },
]
