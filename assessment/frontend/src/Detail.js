import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Modal, ButtonToolbar } from 'react-bootstrap';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
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
        axios.get(`http://localhost:5000/${this.props.match.params.id}`)
            .then(({ data: user }) => {
                console.log('user', user);
                this.setState({ user });
            });
    }

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
    addSavedData = (e) => {
        const myObj = {
            movieId: '',
            // covers:this.state.user.covers,
            released: this.state.released,
            title: this.state.title,
            description: this.state.description,
            rating: this.state.rating,
            languageIDs: this.state.language,
            genres: this.state.genres,
            fileName: this.state.fileName,
            covers: this.state.covers
        }
        console.log(this.state.user.released)
        this.setState({ handleShow: false, user: myObj })
    }
    render() {
        const handleClose = () => this.setState({ handleShow: false })

        return (
            <div>
                <div className="container-big">
                    <ButtonToolbar >
                        <Button variant="secondary" onClick={() => this.setState({ handleShow: true })}>Edit</Button>

                        <Modal show={this.state.handleShow} onHide={handleClose}>
                            <Modal.Dialog >
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Data</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>title</Form.Label>
                                            <Form.Control
                                                type="text" defaultValue={this.state.user.title} onChange={(e) => this.titleData(e)} />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>description</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.user.description} onChange={(e) => this.descData(e)} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Released</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.user.released} onChange={(e) => this.ratingData(e)} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>rating</Form.Label>
                                            <Form.Control type="number" defaultValue={this.state.user.rating} onChange={(e) => this.releasedData(e)} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Language</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.user.languageIDs} onChange={(e) => this.languageData(e)} />
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Genres</Form.Label>
                                                <Form.Control type="text" defaultValue={this.state.user.genres} onChange={(e) => this.genresData(e)} />
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
                    <h1>{this.state.user.title}</h1> <br />
                    <img src={this.state.user.covers} alt="" className="rounded" width='100px' height='150px' /><br />
                    Released : {this.state.user.released} <br />
                    Description : {this.state.user.description}<br />
                    Rating : {this.state.user.rating}<br />
                    Language : {this.state.user.languageIDs}<br />
                    Generes : {this.state.user.genres}<br />

                </div>
            </div>
        )
    }
}


export default Detail