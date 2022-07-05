import logo from './logo.svg';
import './App.css';
import  React from 'react'
import UserList from './components/UserList.js'
import ProjectNoteList from './components/ProjectNote.js'
import UserProjectList from './components/UserProject.js'
import ProjectList from "./components/ProjectList.js"
import NoteList from "./components/NoteList.js"
import LoginForm from "./components/LoginForm.js"
import NoteForm from "./components/NoteForm.js"
import ProjectForm from "./components/ProjectForm.js"
import ProjectSearchForm from "./components/ProjectSearch.js"
import axios from 'axios'
import {HashRouter, BrowserRouter, Route, Link, Routes, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        'users': [],
        'projects': [],
        'notes':[],
        'token': '',
         }
    }

    getData() {
        let headers = this.getHeader()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results

                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })

        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })

        axios
            .get('http://127.0.0.1:8000/api/notes/', {headers})
            .then(response => {
                const notes = response.data.results
                this.setState({
                    'notes': notes
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'notes': []
                })
            })

   }

   componentDidMount(){
       let token = localStorage.getItem('token')
       this.setState({
            'token': token
        }, this.getData)

   }

    isAuth(){
        return !!this.state.token
    }

    getHeader(){
        if (this.isAuth()){
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''}, this.getData)
    }

    deleteNote(id){
        let headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/notes/${id}`, {headers})
            .then(response => {
                const filtered = this.state.notes.filter((note) => note.id == id)
                filtered.active = 'False'
                this.setState({
                    'notes': this.state.notes
                }, this.getData)
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteProject(id){
        let headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    'projects': this.state.projects.filter((project) => project.id != id)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


    newProject(name, users){
        let headers = this.getHeader()
        axios
            .post('http://127.0.0.1:8000/api/projects/', {'name': name, 'users': users}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    searchProject(name){
        var filtered_project = this.state.projects.filter((project) => project.name == name)
        return filtered_project
    }

    newNote(name, project, user){
        let headers = this.getHeader()
        axios
            .post('http://127.0.0.1:8000/api/notes/', {'name': name, 'project': project, 'user': user}, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
            })
    }


   getToken(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {"username": login, "password": password})
            .then(response => {
                const token = response.data.token
                const name = response.data.name
                localStorage.setItem('token', token)
                localStorage.setItem('name', name)
                this.setState({
                    'token': token, 'name': name},
                     this.getData)
                    }
                )
            .catch(error => console.log(error))
   }


    render (){
        return(
            <div class="container">
                <BrowserRouter>
                    <nav class="navbar navbar-light bg-light">
                        <div>
                            { this.isAuth()
                                ? <div>
                                    < h3 > Логин пользователя: {localStorage.getItem('name')}  <button class="btn btn-primary" onClick={()=>this.logout()} >Logout</button> < / h3 >
                                  </div>
                                : <Link to="/login"> Зарегистрируйся </Link>}
                        </div>
                        <li><Link to="/"> Users </Link> </li>
                        <li><Link to="/projects"> Projects </Link> </li>
                        <li><Link to="/projects/create"> New Project </Link> </li>
                        <li><Link to="/projects/search"> Search Project </Link> </li>
                        <li><Link to="/notes"> Notes </Link> </li>
                        <li><Link to="/notes/create"> New Notes </Link> </li>
                        <li>
                            { this.isAuth() ? <button class="btn btn-primary" onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link> }
                        </li>
                    </nav>
                    <Routes>
                        <Route exact path='/' element = {<UserList users={this.state.users}/>}/>
                        <Route exact path='/users' element = {<Navigate to='/' />} />
                        <Route path='/users/:id' element = {<UserProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />}/>
                        <Route exact path='/projects/create' element = {<ProjectForm users={this.state.users} newProject={(name, users)=> this.newProject(name, users)} />}/>
                        <Route exact path='/projects/search' element = {<ProjectSearchForm users={this.state.projects} searchProject={(name)=> this.searchProject(name)}/>}/>
                        <Route exact path='/notes/create' element = {<NoteForm projects={this.state.projects} users={this.state.users} newNote={(name, project, user)=> this.newNote(name, project, user)} />}/>
                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)}/>}/>
                        <Route exact path='/notes' element = {<NoteList notes={this.state.notes} deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route path='/projects/:id' element = {<ProjectNoteList notes={this.state.notes}/>}/>
                        <Route path='*' element = {<NotFound/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
