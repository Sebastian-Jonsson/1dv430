import React, { Component, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import { NavLink as RRNavLink } from 'react-router-dom'


class AppNavbar extends Component {

    state = {
        isOpen: false
    }

    static propTypes = {
        isAdmin: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render() {
        const { isAuthenticated, isAdmin, user } = this.props.auth

        let renderRights = (() => {
            if (isAdmin && isAuthenticated) {
                return adminLinks
            }
            if (isAuthenticated && !isAdmin) {
                return authLinks
            }
            else {
                return guestLinks
            }
        })
       
        let adminLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{ user ? `Hello Admin ${user.firstname}` : ''}</strong>
                    </span>
                </NavItem>
                <RRNavLink name="products" className="nav-link" to="/products">Products</RRNavLink>
                <RRNavLink name="adminpanel" className="nav-link" to="/adminpanel">Admin Panel</RRNavLink>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )
    
        let authLinks = (
            <Fragment>
                <NavItem>
                <RRNavLink name="products" className="nav-link" to="/products">Products</RRNavLink>
                </NavItem>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{ user ? `Welcome ${user.firstname}` : ''}</strong>
                    </span>
                </NavItem>
                {/* <NavItem>
                <RRNavLink name="shoppingcart" className="nav-link" to="/shoppingcart">Cart</RRNavLink>
                </NavItem> */}
                <NavItem>
                <Logout />
                </NavItem>
            </Fragment>
        )

        let guestLinks = (
            <Fragment>
                <NavItem>
                <RRNavLink name="products" className="nav-link" to="/products">Products</RRNavLink>
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Burning Blueberry</NavbarBrand>

                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                             
                             {renderRights()}
                             
                            </Nav>
                        </Collapse>
                </Container>
            </Navbar>
        </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStatetoProps, null)(AppNavbar)