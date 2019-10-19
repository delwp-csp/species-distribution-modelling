import React from "react"

import "./entry.styles.css"
import EntryDetail from "./entry-detail.component"

const Entry = props => {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <div className="report">
      <div className="entries">
        <div className="entry-container" onClick={() => setOpen(!isOpen)}>
          <p className="entryId"> {props.entryId}</p>
          <p className="userId">{props.userId}</p>
          <p className="reliability">{props.reliability}</p>
        </div>
        <div className="detail">
          {/* <h1>Details</h1> */}
          {isOpen && <EntryDetail specieId={props.entryId} />}
        </div>
      </div>
    </div>
  )
}

export default Entry
