import  React from 'react'
import ProjectList from "./ProjectList.js"


class ProjectSearchForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {'project': '', 'result': []}
    }

    handleSubmit(event){
        this.setState(
            {'result' : this.props.searchProject(this.state.project)}
        )
        console.log(this.state.result[0])
        console.log(this.state)
        event.preventDefault()
    }

    handleNameChange(event){
        this.setState(
            {[event.target.name] : event.target.value}
        )
    }
    render(){
        return (
            <div>
                <form onSubmit = {(event) => this.handleSubmit(event)} >
                    <input
                        type='text'
                        name='project'
                        placeholder='name'
                        onChange={(event) => this.handleNameChange(event)}
                    />
                     <input
                        type='submit'
                        name = 'result'
                        value='Search Project'
                    />
                </form>
                <div>
                    <h3> Result of search </h3>
                    {this.state.result.length > 0
                    ? <ProjectList projects={this.props.searchProject(this.state.project)}/>
                     :
                     console.log('Проекта не найдено')
                    }
                </div>
            </div>
        )
    }
}

export default ProjectSearchForm