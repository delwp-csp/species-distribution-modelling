import React from "react";
import Home from "./components/home.component";
import Add_Species from "./components/add_species.component";
import Report from "./components/report.component";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// https://www.styled-components.com/

// function Heading({ children, color }) {
//   return <h1 style={{ color }}>{children}</h1>
// }

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-species" component={Add_Species} />
          <Route path = "/report/:specie_name" component={Report} />
        </Switch>
      </BrowserRouter>

      {/* {page === 'home' && <Home metadata={metadata}/>}
      {page === 'add-species' && <Add_Species metadata={metadata}/>}      
      {page === 'report' && <Report metadata={metadata}/>} */}
    </div>
  );
}

export default App;
