import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./home.css";
import s1 from "../Images/a.jpg";
import s2 from "../Images/a1.jpg";
import s3 from "../Images/a2.jpg";
const Services = () => {
  return (
    <div className="services-section">
      <Container>
        <h2>Services:</h2>
        <Row>
          <Col md={4} className="services-card">
            <div className="services-icon">
              <img
                src={s1}
                alt="Enhance Experience"
                className="services-image"
              />
            </div>
            <h3 className="services-title">
              Built to enhance your farming experience
            </h3>
            <p className="services-description">
              You'll always find the perfect product tailored to your farming
              needs. From essential seeds to specialized fertilizers, we offer a
              range of options that reflect your agricultural values.
            </p>
          </Col>
          <Col md={4} className="services-card">
            <div className="services-icon">
              <img src={s2} alt="Editable Tools" className="services-image" />
            </div>
            <h3 className="services-title">
              Editable from seed selection to harvest
            </h3>
            <p className="services-description">
              Feel free to customize your experience with our user-friendly
              tools designed for farmers and agricultural businesses.
            </p>
          </Col>
          <Col md={4} className="services-card">
            <div className="services-icon">
              <img
                src={s3}
                alt="Data at Fingertips"
                className="services-image"
              />
            </div>
            <h3 className="services-title">All data at your fingertips</h3>
            <p className="services-description">
              Stay informed with our comprehensive reports on crop yields and
              market trends. Access them anytime, anywhere, and make informed
              decisions to boost your agricultural success.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;
