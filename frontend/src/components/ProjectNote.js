import React from 'react'
import {useParams} from 'react-router-dom'

const NoteItem = ({note}) => {
    return (
        <tr>
           <td>
               {note.name}
           </td>
           <td>
               {note.text}
           </td>
           <td>
               {note.user}
           </td>
           <td>
               {note.created_data}
           </td>
       </tr>

    )
}

const ProjectNoteList = ({notes}) => {
    var {id} = useParams()
    var filtered_notes = notes.filter((note) => [note.project.id].includes(parseInt(id)))
    return (
        <table>
           <th>
               Name
           </th>
           <th>
               Text
           </th>
           <th>
               User
           </th>
           <th>
               Created_data
           </th>
           {filtered_notes.map((note) => <NoteItem note={note} />)}
       </table>

    )
}

export default ProjectNoteList