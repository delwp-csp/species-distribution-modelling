import React, { Component } from 'react';
import './add_species.styles.css';
import InputField from './input-field.component';
import MultiLineInput from './multiline-input.component';
import AddButton from './button.component';
import superagent from 'superagent';
import {withRouter} from 'react-router-dom';

//this can be a functional component.
class Add_Species extends Component {

  constructor() {
    super();

    this.state = {

      scientific_name:"",
      common_name:"",
      description:"",

    }
  }

  submitPost = () => {
    let { history } = this.props;
    history.push("/");
    superagent('post', '/').send({ scientific_name: this.state.scientific_name, common_name: this.state.common_name, description:this.state.description }).then((data) => {
      console.log("The server has recieved", data.body);
    })
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }


  render() {
    return (
      <div className='add-species'>
        <h1>Add New Species</h1>

        <div className='details-container'>
          <h3>Specie Details</h3>
          <div className='details-form'>
            <InputField id="scientific_name" fieldName={'Scientific Name'} onChange={this.handleChange} autoFocu  s />
            <InputField id="common_name" fieldName={'Common Name'} onChange={this.handleChange}/>
            <MultiLineInput id="description" fieldName='Description' onChange={this.handleChange} />
          </div>
        </div>  
        <div className='button-container' onClick={this.submitPost}>
          <AddButton className='addButton' buttonText='Save' />
        </div>
      </div>

    );
  }
}

export default withRouter(Add_Species);