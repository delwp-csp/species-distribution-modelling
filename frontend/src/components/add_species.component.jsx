import React, { Component } from 'react';
import './add_species.styles.css';
import InputField from './input-field.component';
import MultiLineInput from './multiline-input.component';
import AddButton from './button.component';

//this can be a functional component.
class Add_Species extends Component {
  // constructor(props){
  //     super(props);
  // }

  render() {
    return (
      <div className='add-species'>
        <h1>Add New Species</h1>

        <div className='details-container'>
          <h3>Specie Details</h3>
          <div className='details-form'>
            <InputField fieldName={'Scientific Name'} />
            <InputField fieldName={'Common Name'} />
            <MultiLineInput fieldName='Description' />
          </div>
        </div>
        <div className='button-container'>
          <AddButton className='addButton' buttonText='Save' />
        </div>
      </div>

    );
  }
}

export default Add_Species;