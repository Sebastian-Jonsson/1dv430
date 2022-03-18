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
    NavLink,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = { 
        isAdmin: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated, isAdmin } = this.props

        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }

        if(this.state.modal) {
            if(isAdmin) {
                this.toggle()
            }
        }
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

        const { email, password } = this.state

        const user = {
            email,
            password
        }

        this.props.login(user)
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href ='#'>
                    Login
                </NavLink>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader
                    toggle={this.toggle}
                    >
                        Login
                    </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? // if state msg (?)do   ':'(else) null 
                        <Alert color='danger'>{ this.state.msg } </Alert> : null} 
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                
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
                                placeholder='Password'
                                className='mb-3'
                                onChange={this.onChange}
                                >
                                </Input>

                                <Button
                                color='dark'
                                style={{marginTop: '2rem'}}
                                block
                                >
                                    Login
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
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)