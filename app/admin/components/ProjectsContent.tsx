"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from "react";
import { getProjects } from "@/app/lib/api";

export default function ProjectsContent() {
  const [projects, setProjects] = useState<any[]>([]);
  
  const getProjectsData = async() =>{
    const token :string|null = localStorage.getItem("portfolio-admin-token")
    console.log(token)
    if (!token) {
      setProjects([]);
      return;
    }
    const data = await getProjects(token);
    setProjects(data.projects)
  }
  useEffect(()=>{
    getProjectsData()
  },[])

  const handleEdit = async()=>{
    
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Projects</h2>
      </div>
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Project
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-100 text-black border-gray-600">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="text-gray-300">
              {project.stack.map((item: string) => (
              <Badge 
                key={item}
                variant={"outline"}
              >
                {item}
              </Badge>
            ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{project.escription}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="bg-red-400 text-white">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
