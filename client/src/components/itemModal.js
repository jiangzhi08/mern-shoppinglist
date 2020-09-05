import React, { Component } from "react";
// import { v4 as uuid } from "uuid";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    order: "",
    serial: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      msg: null,
    });
  };

  handleChangeName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    if (this.state.order === "" || this.state.serial === "") {
      this.setState({ msg: "please enter all fields" });
      return;
    }

    const newItem = {
      order: this.state.order,
      serial: this.state.serial,
    };

    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ margin: "2rem 2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <h2 className="m-3 ml-4">Please Log in to manage items</h2>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Item List</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <Label for="order">Work Order #</Label>
                <Input
                  type="text"
                  name="order"
                  id="item1"
                  placeholder=""
                  onChange={this.handleChangeName}
                />
                <br />
                <br />
                <Label for="serial">Serial #</Label>
                <Input
                  type="text"
                  name="serial"
                  id="item2"
                  placeholder=""
                  onChange={this.handleChangeName}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
