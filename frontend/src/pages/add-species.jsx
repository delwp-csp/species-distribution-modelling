/*
  pages/add-species.jsx

  FIT3162 - Team 10 - Final Year Computer Science Project
  Copyright Luke Silva, Aichi Tsuchihira, Harsil Patel 2019

*/

import React, { Component } from "react"
import "./add-species.css"
import InputField from "../components/input-field"
import MultiLineInput from "../components/multiline-input"
import Button from "../components/button"
import superagent from "superagent"
import { withRouter } from "react-router-dom"
import { DropzoneArea } from "material-ui-dropzone"


class Add_Species extends Component {
  constructor() {
    super()

    this.state = {
      scientific_name: "",
      common_name: "",
      description: "",
      files: []
    }
  }

  submitPost = () => {
    let { history } = this.props
    let specieName = this.state.scientific_name.replace(/ /g, '_').toLowerCase()
    history.push("/")
    superagent("post", "/")
      .send({
        scientific_name: specieName,
        common_name: this.state.common_name,
        description: this.state.description
      }).then(() => {})
    
    superagent("post", "/upload")
      .attach("file", this.state.files[0])
      .set("specieName", specieName)
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
        <h1>Add New Species</h1>

        <div className="details-container" style={{ display: "flex" }}>
          <div className="details-form" style={{ marginRight: "20px" }}>
            <h3>Specie Details</h3>
            <InputField
              id="scientific_name"
              fieldName={"Scientific Name"}
              onChange={this.handleChange}
              autoFocus
            />
            <InputField
              id="common_name"
              fieldName={"Common Name"}
              onChange={this.handleChange}
            />
            <MultiLineInput
              id="description"
              fieldName="Description"
              onChange={this.handleChange}
            />
          </div>
          <DropzoneArea
            onChange={this.attachFile}
            dropzoneText={"Drag and drop a csv file here or click to upload"}
            acceptedFiles={[".csv,text/csv"]}
            filesLimit={1}
            maxFileSize={Infinity}
          />
        </div>
        <div className="button-container" onClick={this.submitPost}>
          <Button disabled={this.state.files.length===0} buttonText="Save" />
        </div>
      </div>
    )
  }
}

export default withRouter(Add_Species)
