import React, { Fragment, Component } from "react";

import { Navbar, Nav, NavbarBrand, NavItem, NavLink, Row, Col } from "reactstrap";
import MetisMenu from "react-metismenu";

import {
    MainNav,
    ComponentsNav,
    FormsNav,
    WidgetsNav,
    ChartsNav,
  } from "./NavItems";

export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Row style={{"margin" : 0, "height" : "8vh", "border-bottom" : "1px solid #DDDDDD"}}>
                    <Col lg={2} style={{"position": "relative"}}>
                        <h2 style={
                            {"position" : "absolute", 
                            "top" : "50%", "left": "50%", "transform": "translate(-50%, -50%)", 
                            "margin-bottom" : 0}
                            }>
                            Acadplanner
                        </h2>
                    </Col>
                    <Col lg={10} style={{"padding" : 0}}>
                    </Col>
                </Row>
                <Row style={{"margin" : 0}}>
                    <Col lg={2} style={{"padding-left" : 15, "padding-right" : 15, "padding-top" : 10, "height" : "92vh"}}>
                        <MetisMenu content={MainNav} activeLinkFromLocation
                        className="vertical-nav-menu" iconNamePrefix=""/>
                    </Col>
                    <Col lg={10} style={{"padding" : 0, "border-left" : "1.5px solid #DDDDDD"}}>
                        {this.props.children}
                    </Col>
                </Row>
            </Fragment>
        )
    }
}