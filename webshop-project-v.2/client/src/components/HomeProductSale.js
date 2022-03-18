import React, { Component } from 'react'
import { UncontrolledCarousel } from 'reactstrap'

class HomeProductSale extends Component {

    render() {
        let items = [
            {
              src: require('../images/sales/boathouse.jpg'),
              altText: 'boathouse',
              caption: 'Have a look at our selection for your seaworthiness!',
              header: 'Lake sales!',
              key: '1'
            },
            {
              src: require('../images/sales/controller.png'),
              altText: 'Controller',
              caption: 'Game on with the best to offer from select sales!',
              header: 'Console sales!',
              key: '2'
            },
            {
              src: require('../images/sales/sport.jpg'),
              altText: 'football kick',
              caption: 'Show your athletic side with these top brands!',
              header: 'Sport sales!',
              key: '3'
            }
          ]
          
        return (
        <UncontrolledCarousel items={items} />
        )
    }
}

export default HomeProductSale