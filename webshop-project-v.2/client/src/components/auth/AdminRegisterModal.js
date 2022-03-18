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
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class AdminRegisterModal extends Component {
    state = {
        modal: false,
        userType: '',
        firstname: '',
        surname: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = { 
        isAdmin: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    toggle = () => {
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const  { firstname, surname, email, password, passwordValidation } = this.state

        if(password === passwordValidation && password >= 10) {
        const newUser = {
                userType: 'admin',
                firstname,
                surname,
                email,
                password
            }

            this.props.register(newUser)        
        } 
        else {
            this.setState({ msg: 'The Password doesn\'t match.'})
        }
          
        this.toggle()
    }

    render() {
        return(
            <div>
                <Button color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}
                >
                    Register Admin
                </Button>

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader
                    toggle={this.toggle}
                    >
                        Register Admin
                    </ModalHeader>
                        <ModalBody>
                            {this.state.msg ?
                            <Alert color='danger'>{ this.state.msg } </Alert> : null}
                            <Form onSubmit={this.onSubmit}>                
                                <FormGroup>
                                    
                                    <Label for='firstname'>First Name</Label>
                                    <Input
                                    type='text'
                                    required
                                    name='firstname'
                                    id='firstname'
                                    placeholder='Firstname'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Label for='surname'>Surname</Label>
                                    <Input
                                    type='text'
                                    required
                                    name='surname'
                                    id='surname'
                                    placeholder='Surname'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Label for='email'>Email</Label>
                                    <Input
                                    type='email'
                                    required
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Label for='password'>Password</Label>
                                    <Input
                                    type='password'
                                    required
                                    name='password'
                                    id='password'
                                    placeholder='Minimum of 10 characters'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Label for='password'>Confirm Password</Label>
                                    <Input
                                    type='password'
                                    required
                                    name='passwordValidation'
                                    id='passwordValidation'
                                    placeholder='Type Your Password Again'
                                    className='mb-3'
                                    onChange={this.onChange}
                                    >
                                    </Input>

                                    <Button
                                    color='dark'
                                    style={{marginTop: '2rem'}}
                                    block
                                    >
                                        Register
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

export default connect(mapStateToProps, { register, clearErrors })(AdminRegisterModal)