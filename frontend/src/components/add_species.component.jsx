import React, { Component } from 'react';
import './add_species.styles.css';
import InputField from './input-field.component';
import MultiLineInput from './multiline-input.component';
import AddButton from './button.component';
import superagent from 'superagent';
import { withRouter } from 'react-router-dom';
import {DropzoneArea} from 'material-ui-dropzone';



//this can be a functional component.
class Add_Species extends Component {

  constructor() {
    super();

    this.state = {

      scientific_name: "",
      common_name: "",
      description: "",
      files: null,
    }
  }

  submitPost = () => {
    let { history } = this.props;
    let specieName = this.state.scientific_name.replace(" ","_").toLowerCase()
    history.push("/");
    superagent('post', '/').send({ scientific_name: specieName, common_name: this.state.common_name, description: this.state.description }).then((data) => {
      console.log("The server has recieved", data.body);
    });
    superagent('post','/upload').attach('file', this.state.files[0]).set('specieName',`${this.state.scientific_name}`).then(res => console.log(res));
  }

  handleChange = event => {
    let data = event.target.value.replace(/\n|\r/g, "");
    this.setState({ [event.target.id]: data });
  }

  attachFile = file => {
    this.setState({ files: file });
  }

  render() {
    console.log(this.state.files) 
    return (
      <div className='add-species'>
        <h1>Add New Species</h1>

        <div className='details-container' style={{ display: "flex" }}>
          <div className='details-form' style={{ marginRight: "20px" }}>
            <h3>Specie Details</h3>
            <InputField id="scientific_name" fieldName={'Scientific Name'} onChange={this.handleChange} autoFocus />
            <InputField id="common_name" fieldName={'Common Name'} onChange={this.handleChange} />
            <MultiLineInput id="description" fieldName='Description' onChange={this.handleChange} />
          </div>
          <DropzoneArea
            onChange={this.attachFile}
            dropzoneText={'Drag and drop a csv file here or click to upload'}
            acceptedFiles={['text/csv']}
            filesLimit = {1}
          />
          {/* <FileUpload/> */}
        </div>
        <div className='button-container' onClick={this.submitPost}>
          <AddButton className='addButton' buttonText='Save' />
        </div>
      </div>

    );
  }
}

export default withRouter(Add_Species);