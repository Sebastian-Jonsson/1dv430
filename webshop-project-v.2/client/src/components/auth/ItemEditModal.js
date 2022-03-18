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
    Alert,
    Container
} from 'reactstrap'
import { connect } from 'react-redux'
import { editItem } from '../../actions/itemActions'

class ItemEditModal extends Component {
    state = {
        modal: false,
    }

    toggle = (e) => {
        console.log(e)
        this.setState({
            modal: !this.state.modal,
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (id) => {
        this.preventDefault()

        const updatedItem = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
            price_code: this.state.price_code
        }

        this.props.editItem(id, updatedItem)

        this.toggle()
    }

    render() {
        const { _id, name, description, image, price, price_code  } = this.props.item
        return(
            <Container>
                {this.state.msg ? <Alert color='danger'>{ this.state.msg } </Alert> : null}
                        <div>
                <Button className="EditButton" color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle.bind(this, this.props._id)}
                >
                    Edit Item
                </Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader
                    toggle={this.toggle}

                    >
                        Edit item
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit.bind(this, _id)} >
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input
                                type="text"
                                required
                                name="name"
                                id="name"
                                placeholder={name}
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Description</Label>
                                <Input
                                type="text"
                                required
                                name="description"
                                id="description"
                                placeholder={description}
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Image</Label>
                                <Input
                                type="text"
                                required
                                name="image"
                                id="image"
                                placeholder={image}
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Price</Label>
                                <Input
                                type="text"
                                required
                                name="price"
                                id="price"
                                placeholder={price}
                                onChange={this.onChange}
                                >
                                </Input>

                                <Label for="item">Price Code</Label>
                                <Input
                                type="text"
                                required
                                name="price_code"
                                id="price_code"
                                placeholder={price_code}
                                onChange={this.onChange}
                                >
                                </Input>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >
                                    Update
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
            </Container>
        )
    }
}

export default connect(null, { editItem })(ItemEditModal)