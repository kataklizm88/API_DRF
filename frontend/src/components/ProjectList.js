import React from 'react'

const ProjectItem = ({project, deleteProject}) => {

    return (
        <tr>
           <td>
               {project.name}
           </td>
           <td>
               {project.users}
           </td>
           <td>
               {project.repo_link}
           </td>
           <td>
               <button onClick={() => deleteProject(project.id)}> Delete </button>
           </td>
       </tr>

    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
           <th>
               Names
           </th>
           <th>
               Users
           </th>
           <th>
               Repo_links
           </th>
           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
       </table>

    )
}

export default ProjectList