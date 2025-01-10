import React from "react";
import "./home.css";
import { Container, Row, Col } from "reactstrap";
const About = () => {
  return (
    <Container className="team-section py-5">
      <Row className="text-center mb-4">
        <Col>
          <h2 className="team-title">Meet our team of agricultural experts</h2>
          <p className="team-subtitle">
            Dedicated professionals driving our farming success
          </p>
        </Col>
      </Row>
      <Row className="team-members">
        <Col md={6} className="team-member">
          <h3 className="member-name">Salma Al-amri</h3>
          <p className="member-role">Website Designer</p>
          <p className="member-description">
            Salma Al-amri is a website designer specializing in creating online
            platforms for selling agricultural products. She stands out for her
            creativity and deep understanding of the needs of both farmers and
            customers.
          </p>
        </Col>
        <Col md={6} className="team-member">
          <h3 className="member-name">Tafool Kashoob</h3>
          <p className="member-role">General Manager of a Company</p>
          <p className="member-description">
            Tafoo Kashoob is the general manager of a company that specializes
            in selling agricultural products directly from the farm. Growing up
            in a farming environment fueled his passion for agriculture.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
