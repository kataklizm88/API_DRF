import React from 'react'

const NoteItem = ({note, deleteNote}) => {
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
               {note.active.toString()}
           </td>
           <td>
               <button onClick={() => deleteNote(note.id)}> Delete </button>
           </td>
       </tr>

    )
}

const NoteList = ({notes, deleteNote}) => {

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
               isActive
           </th>
           {notes.map((note) => <NoteItem note={note} deleteNote={deleteNote} />)}
       </table>

    )
}

export default NoteList