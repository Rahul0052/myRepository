import React, { Component } from 'react';

import axios from 'axios';
// import ReactTable from 'react-table'

import { Navbar, Nav, NavDropdown, FormControl, Button, Modal, ButtonToolbar /*Row, Col, Container*/ } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
// import Media from 'react-bootstrap/Media'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from 'react-bootstrap/Navbar'
import Grid from './Grid'

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            addModalShow: false
        }
        console.log(this.state.data)
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/item1`)
            .then(res => {
                const person = res.data;
                this.setState({ data: person });
            })

    }

    render() {
        const handleClose = () => this.setState({ handleShow: false })
        return (
            <div>
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">Movie Database</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <NavDropdown title="Sort by" id="basic-nav-dropdown">
                                    <NavDropdown.Item >Year</NavDropdown.Item>
                                    <NavDropdown.Item>Movie</NavDropdown.Item>
                                    <NavDropdown.Item>Something</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <ButtonToolbar >
                                <Button onClick={() => this.setState({ handleShow: true })}>Add Data</Button>

                                <Modal show={this.state.handleShow} onHide={handleClose}>
                                    <Modal.Dialog >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal title</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>title</Form.Label>
                                                    <Form.Control
                                                        type="name" onChange={(e) => this.saveNameFun(e)} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>description</Form.Label>
                                                    <Form.Control type="number" onChange={(e) => this.saveAgeFun(e)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>rating</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => this.saveStatusFun(e)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>languageIDs</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => this.saveEmailFun(e)} />
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>genres</Form.Label>
                                                        <Form.Control type="text" onChange={(e) => this.saveAddressFun(e)} />
                                                    </Form.Group>
                                                </Form.Group>
                                            </Form>

                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                                            <Button variant="primary" onClick={(e) => this.addSavedData(e)}>Save changes</Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                                </Modal>

                            </ButtonToolbar>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>

                    </Navbar> <br />

                </div>


                <Grid
                    myData={this.state.data}
                />
            </div>

        )
    }
}

export default Topbar