import React, { Component } from 'react';
// import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Grid extends Component {

    render() {

        return (
            <div>
                <div>
                    <Container >
                        <Row>
                            {this.props.data.map((value, index) => {

                                return (
                                    <Col border="1" key={index}>
                                        <Container className="col-container"><br />
                                            <Link to={`/${value._id}`}><img src={value.covers} alt="Smiley face" className="rounded" width='100px' height='150px' /></Link>
                                            <br />
                                            Title : {value.title} <br />
                                            Released : {value.released} <br />
                                            {/* Description : {value.description}<br/> */}
                                            Rating : {value.rating}<br />
                                            Language : {value.languageIDs}<br />
                                            Generes : {value.genres}<br />
                                        </Container>
                                        <br />

                                    </Col>
                                )

                            })}
                        </Row>

                    </Container>


                </div>
                {/* {items} */}

            </div>

        )

    }

}

export default Grid