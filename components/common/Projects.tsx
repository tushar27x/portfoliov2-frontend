"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, TvMinimalPlay  } from 'lucide-react';
const Projects = () => {
    const [projects, setProject] = useState

  return (
    <div className='p-[6rem]'>
      <div className='flex flex-col items-center gap-[2rem]'>
        <div>
          <h1 className='text-3xl font-bold'>PROJECTS</h1>
        </div>
          <div className='flex flex-col items-center w-full gap-5 md:flex-row md:gap-[5rem] lg:flex-row lg:gap-[8rem]'>
            {
              projects.map((project) =>{
                return( 
                  <div key={project.id} className='w-full text-center'>
                    <div className='flex justify-between'>
                      <h3 className='font-semibold text-1xl'>{project.title}</h3>
                      <div className='flex gap-4 justify-between'>
                        <div className='hover:opacity-50'>
                          <Link href={project.gitHubUrl}><Github size={20}/></Link>
                        </div>
                        <div className='hover:opacity-50'>
                          {project.liveUrl && <Link href={project.liveUrl}><TvMinimalPlay size={20}/></Link>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
        </div>   
      </div>
    </div>
  )
}

export default Projects

