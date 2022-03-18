import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        description: '',
        image: '',
        price: '',
        price_code: ''
    }

    static propTypes = {
        isAdmin: PropTypes.bool,
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newItem = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            price_code: this.state.price_code

        }

        this.props.addItem(newItem)

        this.toggle()
    }

    render() {
        return(
            <div>
                {this.state.msg ? <Alert color='danger'>{ this.state.msg } </Alert> : null}
                
                <Button color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >
                    Add Item
                </Button>
                                
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader
                    toggle={this.toggle}
                    >
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} >
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input
                                type="text"
                                required
                                name="name"
                                id="name"
                                placeholder="Name of the product"
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Description</Label>
                                <Input
                                type="text"
                                required
                                name="description"
                                id="description"
                                placeholder="Description of the product"
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Image</Label>
                                <Input
                                type="text"
                                required
                                name="image"
                                id="image"
                                placeholder="Enter the image URL here"
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Price</Label>
                                <Input
                                type="text"
                                required
                                name="price"
                                id="price"
                                placeholder="Set the price"
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Price Code</Label>
                                <Input
                                type="text"
                                required
                                name="price_code"
                                id="price_code"
                                placeholder="Set the price code"
                                onChange={this.onChange}
                                >
                                </Input>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >
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
    item: state.item,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal)