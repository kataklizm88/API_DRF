import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return (
        <tr>
           <td>
               {project.name}
           </td>
           <td>
               {project.users[0].username}
           </td>
           <td>
               {project.repo_link}
           </td>
       </tr>

    )
}

const UserProjectList = ({projects}) => {
    var {id} = useParams()
    var filtered_projects = projects.filter((project) => [project.users[0].id].includes(parseInt(id)))
    console.log(filtered_projects)
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
           {filtered_projects.map((project) => <ProjectItem project={project} />)}
       </table>

    )
}

export default UserProjectList