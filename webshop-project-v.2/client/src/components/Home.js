import React, { Component } from 'react'
import HomeProductSale from '../components/HomeProductSale'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * Component for Home.
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {

    static propTypes = {
      auth: PropTypes.object.isRequired
    }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='slideSize'>
        <Container>
          <h1 className='mb-3 text-center'>Home</h1>
            {/* <div className="mb-4 manager-card padd"> */}
                <HomeProductSale />
            {/* </div> */}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
  })
  
  export default connect(mapStateToProps, null)(Home)