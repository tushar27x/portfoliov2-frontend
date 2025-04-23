"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getSkills, updateSkill } from "@/app/lib/api"

export default function SkillsContent() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editSkill, setEditSkill] = useState<any>(null)

  const getSkillsData = async () => {
    const token: string | null = localStorage.getItem("portfolio-admin-token")
    if (!token) {
      setSkills([])
      setLoading(false)
      return
    }
    const data = await getSkills(token)
    setSkills(data.skills)
    setLoading(false)
  }

  const handleEditClick = (skill: any) => {
    setEditSkill({ ...skill }) // clone for local editing
    setIsDialogOpen(true)
  }

  const handleUpdate = async () => {
    const token: string | null = localStorage.getItem("portfolio-admin-token")
    if (!token || !editSkill) return

    await updateSkill(token, editSkill)
    setIsDialogOpen(false)
    setEditSkill(null)
    getSkillsData()
  }

  useEffect(() => {
    getSkillsData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Skills</h2>
      </div>
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Skill
      </Button>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="flex space-x-1 text-xl font-semibold text-gray-700 animate-pulse">
            <span className="animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="animate-bounce">.</span>
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <Card key={skill.id} className="bg-gray-100 text-black border-gray-600">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{skill.name}</span>
                  <span className="text-gray-300">{skill.score}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={skill.score} className="h-2" />
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditClick(skill)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          {editSkill && (
            <div className="space-y-4">
              <Input
                value={editSkill.name}
                onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
                placeholder="Skill Name"
              />
              <Input
                type="number"
                value={editSkill.score}
                onChange={(e) => setEditSkill({ ...editSkill, score: Number(e.target.value) })}
                placeholder="Score"
              />
            </div>
          )}
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
