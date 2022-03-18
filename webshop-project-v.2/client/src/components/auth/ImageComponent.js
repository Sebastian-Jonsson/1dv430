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
import PropTypes from 'prop-types'
import { addImage } from '../../actions/imageActions'
import { clearErrors } from '../../actions/errorActions'

class ImageComponent extends Component {
    state = {
        modal: false,
        image: null,
        msg: null
    }

    static propTypes = { 
        isAdmin: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addImage: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    importAll(r) {
        return r.keys().map(r)
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    /**
     * Additional Image name check required
     *
     * @memberof ImageComponent
     */
    onSubmit = (e) => {
        e.preventDefault()

        let newImage = new FormData()
        newImage.append('image', this.state.image, this.state.image.name)

        this.props.addImage(newImage)
          
        this.toggle()
    }

    render() {
        return(
            <div>
                <Button color='dark'
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >
                    Image Upload
                </Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader
                    toggle={this.toggle}
                    >
                        Upload
                    </ModalHeader>
                        <ModalBody>
                            {this.state.msg ? 
                            <Alert color='danger'>{ this.state.msg } </Alert> : null}
                            <Form onSubmit={this.onSubmit}>                
                                <FormGroup>
                                    
                                    <Label for='image'>Image Upload</Label>
                                    <Input
                                    type='file'
                                    required
                                    name='image'
                                    id='image'
                                    placeholder='Image'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                    >
                                        Upload
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
    isAdmin: state.auth.isAdmin,
    error: state.error
})

export default connect(mapStateToProps, { addImage, clearErrors })(ImageComponent)