import React, { Component } from 'react';

import axios from 'axios';
// import ReactTable from 'react-table'

import { Navbar, Nav, NavDropdown, FormControl, Button, Modal, ButtonToolbar /*Row, Col, Container*/ } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
// import Media from 'react-bootstrap/Media'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from 'react-bootstrap/Navbar'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Grid from './Grid'
import Detail from './Detail'



function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}
class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: '',
            description: '',
            rating: '',
            released: '',
            language: '',
            genres: '',
            addModalShow: false,
            fileName: '',
            covers: ''
        }
        // console.log(this.props.match)
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/item1`)
            .then(res => {
                const person = res.data;
                this.setState({ data: person });
                // console.log(this.state.data)
            })
    }

    // }
    titleData = (event) => {
        this.setState({ title: event.target.value })
    }
    descData = (event) => {
        this.setState({ description: event.target.value })
    }
    releasedData = (event) => {
        this.setState({ released: event.target.value })
    }

    ratingData = (event) => {
        this.setState({ rating: event.target.value })
    }
    languageData = (event) => {
        this.setState({ language: event.target.value })
    }
    genresData = (event) => {
        this.setState({ genres: event.target.value })
    }
    uploadData = async e => {
        this.setState({ fileName: e.target.files[0].name })
        console.log(e.target.files[0].name)
        if (e.target.files && e.target.files.length > 0) {
            const imageDataUrl = await readFile(e.target.files[0]);
            // const base64 = await this.getBase64(imageDataUrl);
            this.setState({ covers: imageDataUrl })
            // console.log(imageDataUrl)
        }
    };


    addSavedData = (e) => {
        const myObj = {
            movieId: '',
            released: this.state.released,
            title: this.state.title,
            description: this.state.description,
            rating: this.state.rating,
            languageIDs: this.state.language,
            genres: this.state.genres,
            fileName: this.state.fileName,
            covers: this.state.covers
        }
        // console.log(myObj)
        axios.post(`http://localhost:5000/insert`, { myObj })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        this.setState({ handleShow: false})

    }

    render() {
        const handleClose = () => this.setState({ handleShow: false })
        return (
            <div>
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">Movie Database</Navbar.Brand>
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
                                                        type="text" onChange={(e) => this.titleData(e)} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>description</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => this.descData(e)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Released</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => this.releasedData(e)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>rating</Form.Label>
                                                    <Form.Control type="number" onChange={(e) => this.ratingData(e)} />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Language</Form.Label>
                                                    <Form.Control type="text" onChange={(e) => this.languageData(e)} />
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Genres</Form.Label>
                                                        <Form.Control type="text" onChange={(e) => this.genresData(e)} />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Upload</Form.Label>
                                                        <input type="file" onChange={(e) => this.uploadData(e)} />
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

                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Grid data={this.state.data} />
                        </Route>
                        <Route path="/:id" exact component={Detail} />
                    </Switch>

                </Router>

            </div>

        )
    }
}

export default Topbar