import React, {Component} from 'react';
import Form from '../form/form.component';

//this can be a functional component.
class Add_Species extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <div>
              <h1>Add New Species</h1>
              <Form />
            </div>
            
        );
    }
}

export default Add_Species;