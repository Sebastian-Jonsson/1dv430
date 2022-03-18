const { describe, it } = require('mocha')
const request = require('supertest')
const { expect, assert } = require('chai')

const backend = request.agent('http://localhost:5000')

let token = ''
let id = ''
let secondId = ''

//**************************************************************************** */
// User testing part

describe('1.1 Testing Login', () => {
    it('Should send a 200 status if login succeeds', (done) => {
        backend
        .post('/api/auth')
        .send({
            email: 'Tester@gmail.com',
            password: '12345678910'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            token = res.header.token
            if(error) {
                console.log('Login failure: ', error)
            }
            expect(res.status).to.equal(200)
            done()
        })
    })

    it('Should send a 400 status if login fails', (done) => {
        backend
        .post('/api/auth')
        .send({
            email: 'Tester@gmail.com',
            password: 'TooShortAndWrong'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            if(error) {
                console.log('Login failure: ', error)
            }
            expect(res.status).to.equal(400)
            done()
        })
    })

    it('Should send a message object "msg: user does not exist" if the user is not found in the DB', (done) => {
        backend
        .post('/api/auth')
        .send({
            email: 'NonExistentUser@gmail.com',
            password: '12345678910'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            if(error) {
                console.log('Login failure: ', error)
            }
            expect(res.res.text).to.equal(`{"msg":"User does not exist"}`)
            done()
        })
    })

    it('Should send a message object "msg: Please enter all fields" if no fields have passed', (done) => {
        backend
        .post('/api/auth')
        .send({
            email: '',
            password: ''
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            if(error) {
                console.log('Login failure: ', error)
            }
            expect(res.res.text).to.equal(`{"msg":"Please enter all fields"}`)
            done()
        })
    })

    it('Should send a message object "msg: Invalid Credentials" if the user enters the wrong password', (done) => {
        backend
        .post('/api/auth')
        .send({
            email: 'Tester@gmail.com',
            password: 'TooShortAndWrong'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            if(error) {
                console.log('Login failure: ', error)
            }
            expect(res.res.text).to.equal(`{"msg":"Invalid Credentials"}`)
            done()
        })
    })

    it('Should respond with id, userType: basic, firstname and email if login success', (done) => {
        backend
          .post('/api/auth')
          .send({
            email: 'Tester@gmail.com',
            password: '12345678910'
          })
          .set('Accept', 'application/json')
          .end((error, res) => {
            if (error) {
                console.log('Login Failure: ', error)
            }
            // delete res.body.user.description
            const user = res.body.user
            expect(user).to.contain.property('id')
            expect(user).to.contain.property('userType', 'basic')
            expect(user).to.contain.property('firstname')
            expect(user).to.contain.property('email')
            done()
          })
      })

    it('Should respond with id, userType: admin, firstname and email if login success', (done) => {
        backend
          .post('/api/auth')
          .send({
            email: 'TestAdmin@gmail.com',
            password: '12345678910'
          })
          .set('Accept', 'application/json')
          .end((error, res) => {
            if (error) {
                console.log('Login Failure: ', error)
            }
            const user = res.body.user
            expect(user).to.contain.property('id')
            expect(user).to.contain.property('userType', 'admin')
            expect(user).to.contain.property('firstname')
            expect(user).to.contain.property('email')
            done()
          })
      })

})


//**************************************************************************** */
// Product admin user testing part

describe('2.1 Testing Products as Admin', () => {
    beforeEach((done) => {
        backend
        .post('/api/auth')
        .send({
            email: 'TestAdmin@gmail.com',
            password: '12345678910'
        })
        .set('Accept', 'application/json')
        .end((error, res) => {
            token = res.body.token
            if (expect(res.status).to.equal(200)) {
                done()
            }
            else {
                done(new Error('Login Failure: ', error))
            }
        })
    })

    it('Should create a new product and save it', (done) => {
        const newItem = {
            name: 'Test Product',
            description: 'A Test Description of the Product',
            image: 'https://www.prepscholar.com/toefl/blog/wp-content/uploads/sites/13/2017/03/feature_toefltest-300x228.jpg',
            price: 99.99,
            price_code: 'euro'
        } 
        
        backend
        .post('/api/items')
        .set('Accept', 'application/json')
        .set({'x-auth-token': token})
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Failed to create product: ', error)
            }
            id = res.body._id
            expect(res.body).to.have.property('name', 'Test Product')
            expect(res.body).to.have.property('description', 'A Test Description of the Product')
            expect(res.body).to.have.property('image', 'tests/testImage.png')
            expect(res.body).to.have.property('price', 99.99)
            expect(res.body).to.have.property('price_code', 'euro')
            done()
        })
    })

    it('Should edit the test product and save it', (done) => {
        const newItem = {
            name: 'Edited Test Product',
            description: 'An Edited Test Description of the Product',
            image: 'https://i.ya-webdesign.com/images/edit-png-files-4.png',
            price: 999,
            price_code: 'sek'
        }
        
        backend
        .put(`/api/items/update/${id}`)
        .set({'x-auth-token': token})
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Failed to edit product: ', error)
            }
            expect(res.body).to.have.property('name', 'Edited Test Product')
            expect(res.body).to.have.property('description', 'An Edited Test Description of the Product')
            expect(res.body).to.have.property('image', 'tests/editedTestImage.png')
            expect(res.body).to.have.property('price', 999)
            expect(res.body).to.have.property('price_code', 'sek')
            done()
        })
    })
    
    it('Should delete the test product', (done) => {
        const newItem = {
            name: 'Edited Test Product',
            description: 'An Edited Test Description of the Product',
            image: 'tests/editedTestImage.png',
            price: 999,
            price_code: 'sek'
        }
        
        backend
        .delete(`/api/items/delete/${id}`)
        .set({'x-auth-token': token})
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Failed to delete product: ', error)
            }
            expect(res.status).to.equal(200)
            done()
        })
    })
    it('Should be able to get all items with authorization', (done) => {        
        backend
        .get('/api/items')
        .set({'x-auth-token': token})
        .end((error, res) => {
            if (error) {
                console.log('Failed to get all products: ', error)
            }
            expect(res.status).to.equal(200)
            done()
        })
    })
})

//**************************************************************************** */
// Product basic user testing part

// describe('2.2 Testing Products as a Basic User', () => {  //function for this.timeout
//     // this.timeout(10000)
//     beforeEach((done) => {
//         backend
//         .post('/api/auth')
//         .send({
//             email: 'Tester@gmail.com',
//             password: '12345678910'
//         })
//         .set('Accept', 'application/json')
//         .end((error, res) => {
//             // token = ''
//             token = res.body.token
//             if (expect(res.status).to.equal(200)) {
//                 done()
//             }
//             else {
//                 done(new Error('Login Failure: ', error))
//             }
//         })
//     })

//     it('Should fail to create a new product and save it', (done) => {
//         // return new Promise(function(resolve) {
//         //     assert.ok(true)
//         //     resolve()
//         // })

//         const newItem = {
//             name: 'Test Product',
//             description: 'A Test Description of the Product',
//             image: 'tests/testImage.png',
//             price: 99.99,
//             price_code: 'euro'
//         } 
        
//         backend
//         .post('/api/items')
//         .set('Accept', 'application/json')
//         .set({'x-auth-token': token})
//         .send(newItem)
//         .end((error, res) => {
//             if (error) {
//                 console.log('Succeeded to add product: ', error)   
//             }
//             expect(res.status).to.equal(401)
//             done()
//         })
//     })

//     it('Should fail to edit the test product and save it', (done) => {
//         const newItem = {
//             name: 'Edited Test Product',
//             description: 'An Edited Test Description of the Product',
//             image: 'tests/editedTestImage.png',
//             price: 999,
//             price_code: 'sek'
//         }
        
//         backend
//         .put(`/api/items/update/${id}`)
//         .set({'x-auth-token': token})
//         .send(newItem)
//         .end((error, res) => {
//             if (error) {
//                 console.log('Succeeded to edit product: ', error)
//             }
//             expect(res.status).to.equal(401)
//             done()
//         })
//     })
    
//     it('Should fail to delete the test product', (done) => {
//         const newItem = {
//             name: 'Edited Test Product',
//             description: 'An Edited Test Description of the Product',
//             image: 'tests/editedTestImage.png',
//             price: 999,
//             price_code: 'sek'
//         }
        
//         backend
//         .delete(`/api/items/delete/${id}`)
//         .set({'x-auth-token': token})
//         .send(newItem)
//         .end((error, res) => {
//             if (error) {
//                 console.log('Succeeded to delete product: ', error)
//             }
//             expect(res.status).to.equal(401)
//             done()
//         })
//     })

//     it('Should be able to get all items with authorization', (done) => {        
//         backend
//         .get('/api/items')
//         .set({'x-auth-token': token})
//         .end((error, res) => {
//             if (error) {
//                 console.log('Failed to get all products: ', error)
//             }
//             expect(res.status).to.equal(200)
//             done()
//         })
//     })
// })

//**************************************************************************** */
// Product non-Admin users testing part

describe('2.2 Testing Products as a non-Admin User', () => {
    it('Should fail to create a new product and save it', (done) => {

        const newItem = {
            name: 'Test Product',
            description: 'A Test Description of the Product',
            image: 'tests/testImage.png',
            price: 99.99,
            price_code: 'euro'
        } 
        
        backend
        .post('/api/items')
        .set('Accept', 'application/json')
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Succeeded to add product: ', error)
                
            }
            expect(res.status).to.equal(401)
            done()
        })
    })

    it('Should fail to edit the test product and save it', (done) => {
        const newItem = {
            name: 'Edited Test Product',
            description: 'An Edited Test Description of the Product',
            image: 'tests/editedTestImage.png',
            price: 999,
            price_code: 'sek'
        }
        
        backend
        .put(`/api/items/update/${id}`)
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Succeeded to edit product: ', error)
            }
            expect(res.status).to.equal(401)
            done()
        })
    })
    
    it('Should fail to delete the test product', (done) => {
        const newItem = {
            name: 'Edited Test Product',
            description: 'An Edited Test Description of the Product',
            image: 'tests/editedTestImage.png',
            price: 999,
            price_code: 'sek'
        }
        
        backend
        .delete(`/api/items/delete/${id}`)
        .send(newItem)
        .end((error, res) => {
            if (error) {
                console.log('Succeeded to delete product: ', error)
            }
            expect(res.status).to.equal(401)
            done()
        })
    })

    it('Should be able to get all items without authorization', (done) => {        
        backend
        .get('/api/items')
        .end((error, res) => {
            if (error) {
                console.log('Failed to get all products: ', error)
            }
            expect(res.status).to.equal(200)
            done()
        })
    })
})
