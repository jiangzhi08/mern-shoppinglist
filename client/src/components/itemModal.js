import React, { Component } from 'react';
import { v4 as uuid}  from 'uuid'
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleChangeName = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        this.props.addItem(newItem);
        this.toggle(); 
    }

    render() {
        return(
            <div>
                <Button
                color="dark"
                style={{margin: '2rem 2rem'}}
                onClick = {this.toggle}
                >
                    Add Item
                </Button>
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleOnSubmit}>
                        <FormGroup>
                        <Label for="item">Item</Label>
                        <Input
                            type="text"
                            name="name"
                            id="item"
                            placeholder="Add shopping item"
                            onChange={this.handleChangeName}
                        />
                        <Button color="dark" style={{ marginTop: '2rem' }} block>
                            Add Item
                        </Button>
                        </FormGroup>
                    </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item
  });
  
export default connect(mapStateToProps, { addItem })(ItemModal);

