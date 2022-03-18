import React, { Component } from 'react'
import {
    Container,
    Toast,
    ToastBody,
    ToastHeader
} from 'reactstrap'
import  { connect } from 'react-redux'
import ItemModal from '../../components/ItemModal'
import AdminRegisterModal from '../../components/auth/AdminRegisterModal'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import ShoppingList from '../ShoppingList'
// import ImageComponent from './ImageComponent'

class Admin extends Component {

    state = {
        isOpen: false
    }

    static propTypes = {
        isAdmin: PropTypes.bool,
        isAuthenticated: PropTypes.bool
    }
    
    render() {

        return (
            <div>
            { this.props.isAdmin
            ?
            <Container>
                <div className="p-3 bg-info my-2 rounded">
                    <Toast>
                    <ToastHeader>
                        Product Management
                    </ToastHeader>
                    <ToastBody>
                        <ItemModal />
                        {/* <ImageComponent /> */}
                        <ShoppingList />
                        If any flaws are detected kindly report at once to your closest technical advisor.
                    </ToastBody>
                    </Toast>
                </div>
                <div className="p-3 bg-success my-2 rounded">
                    <Toast className='mb-5'>
                    <ToastHeader>
                        User Management
                    </ToastHeader>
                    <ToastBody>
                        <AdminRegisterModal />
                        If any flaws are detected kindly report at once to your closest technical advisor.
                    </ToastBody>
                    </Toast>
                </div>
                
            </Container>
            : <Redirect to="#" /> }
            
        </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {  })(Admin)

