import React, { Component } from 'react'
import { Container,
        ListGroup,
        ListGroupItem,
        Button,
        Row,
        Col,
        Card,
        CardImg,
        CardText,
        CardBody,
        CardTitle,
        CardSubtitle
        } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import  { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import { addToCart } from '../actions/authActions'
import PropTypes from 'prop-types'
import ItemEditModal from './auth/ItemEditModal'

class ShoppingList extends Component {

    state = {
        isOpen: false,
        modal: false
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAdmin: PropTypes.bool,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems()
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }

    /**
     * Not Operational
     *
     * @memberof ShoppingList
     */
    onAddCartClick = (id) => {
        this.props.addToCart(id)
        console.log(id)
    }

    toggle = () => {        
        this.setState({
            modal: !this.state.modal,
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (id) => {
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
        const { items } = this.props.item

        return (
            <Container>
                
                <ListGroup style={{marginBottom: '4rem'}}>
                    
                    <TransitionGroup className="shopping-list">
                        { items.map(( item ) => (
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Row> 
                                        <Col className="centerize">
                                            <Card className="grid-item">
                                                <CardImg src={item.image} alt={item.name} />
                                                <CardBody>
                                                <CardTitle>{item.name}</CardTitle>
                                                <CardSubtitle>{item.price} {item.price_code}</CardSubtitle>
                                                <CardText>{item.description}</CardText>
                                                {/* <Button
                                                onClick={this.onAddCartClick.bind(this, item._id)}
                                            >Add to Cart</Button> */}
                                                </CardBody>
                                            </Card>
                                            {/* <div></div> */}
                                            { this.props.isAdmin 
                                            ? 
                                            <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this, item._id)}
                                            >Remove Item
                                            &times;
                                            </Button>
                                            : null}
                                            {this.props.isAdmin
                                            ? 
                                            <ItemEditModal item={ item }/>
                                            : null
                                            }
                                        </Col>
                                    </Row>                                   
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem, addToCart })(ShoppingList)