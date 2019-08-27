import React, { Component } from "react";
import Home from "./components/home.component";
import Add_Species from "./components/add_species.component";
import Report from "./components/report.component";
import ListElement from "./components/list.component";

// https://www.styled-components.com/

// function Heading({ children, color }) {
//   return <h1 style={{ color }}>{children}</h1>
// }

function App() {
  // const currentPage = this.state.currentPage;
  const [hash, setHash] = React.useState(window.location.hash)
  React.useEffect(() => {
    function handler() {
      setHash(window.location.hash)
    }

    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  },[])
  const matches = hash.match(/#\/([A-Za-z-]*)\/?(.*)/)
  let page
  if (!matches) page = 'home'
  else page = matches[1]
  const metadata = matches && matches[2]
  console.log('metadata', metadata)
  // let Content = null;

  // switch(currentPage){
  //   case
  // }


  return (
    <div className="App">
      {page === 'home' && <Home metadata={metadata}/>}
      {/* <Add_Species /> */}
      {page === 'report' && <Report metadata={metadata}/>}
    </div>
  );
}

export default App;
