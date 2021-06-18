import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withAuth } from './../context/auth-context';

import NavBar from './../Components/NavBar';
import './../styles/landing.css';

function NoMatches() {

    return (
        <Container fluid={true} className="landing-container">
            <Row>
                <Col xs="12" className="no-summoners-left">
                    <p>Lo sentimos, no hay más posibles matches en este momento. Vuelve a intentarlo más tarde.</p>
                </Col>
            </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(NoMatches)
