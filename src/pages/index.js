import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg1 from "../assets/utils/images/originals/nus1.jpg";
import bg2 from "../assets/utils/images/originals/nus2.jpg";
import bg3 from "../assets/utils/images/originals/nus3.jpg";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

import "../assets/base.scss";

export default class Login extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 100,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className="h-100 hello">
          <Row className="h-100 no-gutters">
            <Col lg="5" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Plan your modules in advance!</h3>
                      <p>
                        Acadplanner provides an easy way for you to plan out your 
                        modules throughout your undergraduate career in NUS
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Share your plans with others!</h3>
                      <p>
                        Easily share your academic plans with others to get feedback
                        or look through some of the many plans that others have shared
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}/>
                    <div className="slider-content">
                      <h3>Track your degree progress!</h3>
                      <p>
                        View your consolidated degree progress at the press of a button
                        to see how on track you are to graduate with First Class Honours
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="7" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <h3>Acadplanner</h3>
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className="mt-3">
                  No account?{" "}
                  <a href="/register" className="text-primary">
                    Sign up now
                  </a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input type="email" name="email" id="exampleEmail" placeholder="Email here..."/>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input type="password" name="password" id="examplePassword" placeholder="Password here..."/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <a href="/forgot" className="btn-lg btn btn-link" >
                          Recover Password
                        </a>{" "}
                        <Button color="primary" size="lg" href="/plans">
                          Log In
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
