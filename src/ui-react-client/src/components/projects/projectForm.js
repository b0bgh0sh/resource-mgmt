import React from "react";

class ProjectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location:'',
            startDate:'',
            endDate:'',
            utilization:'',
            person:''
        };

        this.handleChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log('Change detected. State updated' + name + ' = ' + value);
    }

    handleSubmit(event) {
        alert('A form was submitted: ' + this.state.name + ' name ' + this.state.location + 'location ' + this.state.startDate.toString() + 'start '+ this.state.endDate.toString()+'end ');
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label for="nameInput">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" id="nameInput" placeholder="Project Name" />
                    </div>
                    <div className="form-group">
                        <label for="locationInput">Location</label>
                        <input name="location" type="text" value={this.state.location} onChange={this.handleChange} className="form-control" id="locationInput" placeholder="where" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startInput">Start Date</label>
                        <input name="start" type="date"  onChange={this.handleChange}
                               className="form-control" id="startInput" placeholder="MM/DD/YYYY"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="endInput">End Date</label>
                        <input name="start" type="date" onChange={this.handleChange}
                               className="form-control" id="endInput" placeholder="MM/DD/YYYY"/>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default ProjectForm;