import  React from 'react'


class NoteForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {'name': '', 'project': '', 'user': ''}
    }

    handleNameChange(event){
        this.setState(
            {[event.target.name] : event.target.value}
        )
    }

    handleSubmit(event){
        this.props.newNote(this.state.name, this.state.project, this.state.user)
        event.preventDefault()
    }

   handleProjectChange(event){
        if (! event.target.selectedOptions){
            return
        }
        this.setState({
            'project': parseInt(event.target.selectedOptions.item(0).value),
        })
    }

    handleUserChange(event){
        if (! event.target.selectedOptions){
            return
        }
        this.setState({
            'user': parseInt(event.target.selectedOptions.item(0).value)
        })
    }

    render(){
        return (
            <form onSubmit = {(event) => this.handleSubmit(event)} >
                <input
                    type='text'
                    name='name'
                    placeholder='name'
                    onChange={(event) => this.handleNameChange(event)}
                    value={this.state.name}
                />
                <select onChange={(event) => this.handleProjectChange(event)} >
                    {this.props.projects.map((project) => <option value={project.id}>{project.name} {project.users}</option>)}
                </select>
                <select onChange={(event) => this.handleUserChange(event)} >
                    {this.props.users.map((user) => <option value={user.id}>{user.first_name} </option>)}
                </select>
                <input
                    type='submit'
                    value='Create Note'
                />
            </form>
        )
    }
}

export default NoteForm