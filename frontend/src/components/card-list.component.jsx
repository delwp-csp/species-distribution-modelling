import React from 'react';
import './card-list.styles.css';
import { Card } from './card.component';
import superagent from 'superagent';x 
import {withRouter} from 'react-router-dom';

class CardList extends React.Component {
  constructor() {
    super();
    this.state = {
      species: []
    }
  }

  componentDidMount(){
    superagent('get','./get_data')
      .then(data=>this.setState({species:data.body}))
      .catch(err=> console.log(err));
  }

  render() {
    let { history } = this.props;
    let specieList = null;
    if (this.state.species.length === 0){
      specieList = <h3>No specie has been added</h3>
    }else{
      specieList = this.state.species.map(specie => (
        <Card onClick={() => history.push(`/report/${specie.scientific_name}`)} key={specie.scientific_name} specie={specie} />
      ));
    }

    return (
      <div className='card-list'>
        {specieList}
      </div>
    )
  }
}

export default withRouter(CardList);

