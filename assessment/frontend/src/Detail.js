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
                this.setState({ user, description: user.description, rating: user.rating, title: user.title, released: user.released, language: user.languageIDs, genres: user.genres, movieId: user.movieId, fileName: user.fileName, covers: user.covers });
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
            movieId: this.state.user.movieId,
            title: this.state.user.title,
            covers: this.state.user.covers,
            released: this.state.user.released,
            description: this.state.user.description,
            rating: this.state.user.rating,
            languageIDs: this.state.user.language,
            genres: this.state.user.genres,
            fileName: this.state.user.fileName,
        }
        console.log(this.state.user.released)
        this.setState({ handleShow: false, user: myObj })
        axios.put(`http://localhost:5000/${this.props.match.params.id}`, { myObj })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

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
                                            <Form.Label>Released</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.user.released} onChange={(e) => this.releasedData(e)} />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>description</Form.Label>
                                            <Form.Control type="text" defaultValue={this.state.user.description} onChange={(e) => this.descData(e)} />
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
                    <h1>{this.state.user.title}</h1>
                    <img src={this.state.user.covers} alt="" className="rounded" width='250px' height='400px' /><br /><br />
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