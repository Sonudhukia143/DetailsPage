import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Profile() {
  const state = useSelector(state => state.user?.currentUser?.user);

  return (
    <>
    {
        state
        ?
        <Container className="mt-5">
        <Row>
          <Col md={12} className="text-center">
            <Card className="shadow-sm">
              <Card.Body>
                <Image
                  src={state?.profile?state?.profile:'assets/profile.webp'}
                  roundedCircle
                  alt="Profile Picture"
                  className="mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <Card.Title>{state?.username}</Card.Title>
                <Card.Text>{state?.gmail}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      :
      <Container className="mt-5 text-center">
      <Card className="shadow-sm">
        <Card.Body>
          <Image
            src="assets/profile.webp"
            roundedCircle
            alt="Profile Placeholder"
            className="mb-3"
            style={{ width: '150px', height: '150px' }}
          />
          <Card.Title>No user data available</Card.Title>
          <Card.Text>Please log in to see your profile.</Card.Text>
          <NavLink to="/login"><Button variant="primary">Login</Button></NavLink>
        </Card.Body>
      </Card>
    </Container>
    }
    </>
  );
}