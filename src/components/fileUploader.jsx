import React, { Component } from "react";
import {
  NavItem,
  Glyphicon,
  Modal,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Button,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
  Text,
} from "react-bootstrap";

class Fileuploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  render() {
    return (
      <Grid fluid className="offset-md-3 col-md-6">
        <Form name="imageUploader">
          <h1 className="text-center">Thumbnail Generator</h1>
          <FormGroup>
            <ControlLabel>Bucket Name</ControlLabel>                     
            <FormControl
              type="text"
              name="bucketname"
              id="bucketname"
              placeholder="AWS bucket name"
            />{" "}
          </FormGroup>
          <ControlLabel>AWS Region</ControlLabel>                     
          <FormControl
            type="text"
            name="awsregion"
            id="awsregion"
            placeholder="AWS Region"
          />
          <p>{"\n"}</p>
          <input
            type="file"
            id="file"
            name="file"
            onChange={this.onChangeHandler}
          />
        </Form>
        <Modal.Footer>
          <ButtonToolbar>
            <Button type="button" bsStyle="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button bsStyle="link" onClick={this.clearForm}>
              Clear
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Grid>
    );
  }

  onChangeHandler = (event) => {
    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      });
      console.log(event.target.files[0]);
    }
  };

  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.imageUploader;
    const imageDetails = {
      aws_bucket_name: form.bucketname.value,
      file: form.file.value,
    };
    console.log(imageDetails);
    <img src={imageDetails.file} width="500" height="600" align="center"></img>;
  }

  async clearForm(e) {}

  checkMimeType = (event) => {
    let file = event.target.files[0];
    let err = "";

    const types = ["image/png", "image/jpeg", "image/gif"];
    if (types.every((type) => file.type !== type)) {
      err = file.type + " is not a supported format\n";
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  checkFileSize = (event) => {
    let file = event.target.files[0];
    let size = 5242880;
    let err = "";
    if (file.size > size) {
      err = file.type + "is too large, please pick a smaller file\n";
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  };
}

export default Fileuploader;
