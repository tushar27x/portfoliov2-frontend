const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export async function validateToken(token: string): Promise<boolean> {
    try {
      const res = await fetch(`${SERVER_URL}/auth/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      return res.ok;
    } catch (err) {
      return false;
    }
}
  
  

export async function login(email: string, passwd: string) {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, passwd }),
  })

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  return res.json()
}

export async function getProjects(token: string) {
  const res = await fetch(`${SERVER_URL}/project/`, {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`
      }
  })

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to load projects");
  }
  return res.json()
}

export async function getExperiences(token: string) {
  const res = await fetch(`${SERVER_URL}/experience/`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to load experience");
  }

  return res.json();
}

export async function getSkills(token:string) {
  const res = await fetch(`${SERVER_URL}/skills/`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to load experience");
  }

  return res.json();
}

export async function updateSkill(token: string, skill: any){
  const res = await fetch(`${SERVER_URL}/skills/${skill.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: skill.name,
      score: skill.score
    })
  })

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update skill");
  }

  return res.json();
}
