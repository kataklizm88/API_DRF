import React from 'react'
import {HashRouter, BrowserRouter, Route, Link, Routes, useLocation} from 'react-router-dom'

const UserItem = ({user}) => {
    return (
        <tr>
           <td>
               <Link to={`/users/${user.id}`}> {user.first_name} </Link>
           </td>
           <td>
               {user.last_name}
           </td>
           <td>
               {user.email}
           </td>
       </tr>

    )
}

const UserList = ({users}) => {
    return (
        <div>
            <table>
               <th>
                   First name
               </th>
               <th>
                   Last Name
               </th>
               <th>
                   Email
               </th>
               {users.map((user) => <UserItem user={user} />)}
           </table>

        </div>

    )
}

export default UserList