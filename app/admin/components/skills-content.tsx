"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { addSkill, deleteSkill, getSkills, updateSkill } from "@/app/lib/api"


type Skill = {
  id?: number
  name: string
  score: number
}


export default function SkillsContent() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editSkill, setEditSkill] = useState<Skill | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSkills, setNewSkills] = useState<Skill[]>([{ name: "", score: 0 }])


  const handleAddField = () => {
    setNewSkills([...newSkills, { name: "", score: 0 }]);
  };
  
  const handleNewSkillChange = (index: number, key: keyof Skill, value: string | number) => {
    const updated = [...newSkills];
    updated[index] = {
      ...updated[index],
      [key]: key === "score" ? Number(value) : value,
    };
    setNewSkills(updated);
  };
  
  
  const handleAddSkillsSubmit = async () => {
    const token: string | null = localStorage.getItem("portfolio-admin-token");
    if (!token || newSkills.length === 0) return;
    console.log(newSkills)
    await addSkill(token, newSkills);
    setIsAddDialogOpen(false);
    setNewSkills([{ name: "", score: 0 }]);
    getSkillsData();
  };
  

  const handleDelete= (skill: any) => {
    setSkillToDelete(skill)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    const token: string | null = localStorage.getItem("portfolio-admin-token")
    if (!token || !skillToDelete) return

    await deleteSkill(token, skillToDelete)
    setIsDeleteDialogOpen(false)
    setSkillToDelete(null)
    getSkillsData()
  }

  const getSkillsData = async () => {
    setLoading(true)
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
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    const token: string | null = localStorage.getItem("portfolio-admin-token")
    if (!token || !editSkill) return

    await updateSkill(token, editSkill)
    setIsEditDialogOpen(false)
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
      <Button className="flex items-center gap-2" onClick={() => setIsAddDialogOpen(true)}>
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
                <Button variant="destructive" size="sm" className="bg-red-400 text-white" onClick={()=>handleDelete(skill)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add Skills</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {newSkills.map((skill, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={skill.name}
                  onChange={(e) => handleNewSkillChange(idx, "name", e.target.value)}
                  placeholder="Skill Name"
                />
                <Input
                  type="number"
                  value={skill.score}
                  onChange={(e) => handleNewSkillChange(idx, "score", e.target.value)}
                  placeholder="Score"
                />
              </div>
            ))}
            <Button variant="outline" onClick={handleAddField}>
              + Add another
            </Button>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSkillsSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editSkill?.name}
              onChange={(e) => editSkill && setEditSkill({ ...editSkill, name: e.target.value })}
              placeholder="Skill Name"
            />
            <Input
              type="number"
              value={editSkill?.score}
              onChange={(e) => editSkill && setEditSkill({ ...editSkill, score: Number(e.target.value) })}
              placeholder="Score"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete <strong>{skillToDelete?.name}</strong>?</p>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="bg-red-400 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </div>
  )
}
