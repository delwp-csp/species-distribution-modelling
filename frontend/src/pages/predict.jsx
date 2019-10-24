/*
  pages/predict.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React, { Component } from "react"
import InputField from "../components/input-field"
import Button from "../components/button"
import superagent from "superagent"
import { withRouter } from "react-router-dom"
import { DropzoneArea } from "material-ui-dropzone"

class Predict extends Component {
  constructor() {
    super()

    this.state = {
      name: "",
      files: null
    }
  }

  submitPost = () => {
    let {
      history,
      match: {
        params: { specie_name, balancer, model }
      }
    } = this.props
    
    history.push("/")
    superagent("post", "/predict")
      .attach("file", this.state.files[0])
      .set("specieName", specie_name)
      .set("balancer", balancer)
      .set("model", model)
      .set("name", this.state.name)
      .then(() => {})
  }

  handleChange = event => {
    let data = event.target.value.replace(/\n|\r/g, "")
    this.setState({ [event.target.id]: data })
  }

  attachFile = file => {
    this.setState({ files: file })
  }

  render() {

    return (
      <div className="add-species">
        <h1>Predict new data</h1>

        <div className="details-container" style={{ display: "flex" }}>
          <div className="details-form" style={{ marginRight: "20px" }}>
            <h3>Details for this set of predictions</h3>
            <InputField
              id="name"
              fieldName={"Name"}
              onChange={this.handleChange}
            />
          </div>
          <DropzoneArea
            onChange={this.attachFile}
            dropzoneText={"Drag and drop a csv file here or click to upload"}
            acceptedFiles={["text/csv"]}
            filesLimit={1}
          />
        </div>
        <div className="button-container" onClick={this.submitPost}>
          <Button buttonText="Save" />
        </div>
      </div>
    )
  }
}

export default withRouter(Predict)
