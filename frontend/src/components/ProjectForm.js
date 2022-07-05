import  React from 'react'


class ProjectForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {'name': '', 'users': ''}
    }

    handleNameChange(event){
        this.setState(
            {[event.target.name] : event.target.value}
        )
    }

    handleUsersChange(event){
        if (! event.target.selectedOptions){
            return
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }
        this.setState({
            'users': users
        })
    }

    handleSubmit(event){
        this.props.newProject(this.state.name, this.state.users)
        event.preventDefault()
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
                <select multiple onChange={(event) => this.handleUsersChange(event)} >
                    {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <input
                    type='submit'
                    value='Create Project'
                />
            </form>

        )
    }
}

export default ProjectForm