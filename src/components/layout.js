import React, { Fragment, Component } from "react";
import { Provider } from 'react-redux';
import store from '../state/createStore';
import loadable from '@loadable/component'

import { Navbar, Nav, NavbarBrand, NavItem, NavLink, Row, Col } from "reactstrap";

import { Link } from "gatsby";
import { connect } from "react-redux";

import {
    MainNav
} from "./NavItems";

const MetisMenu = loadable(() => import('react-metismenu'))

class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded : false
        }
        MetisMenu.load().then(() => {
            this.setState({loaded : true});
            console.log('Loaded, forcing update now...')
            this.forceUpdate()
        })
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                {this.state.loaded &&
                    <Provider store={store()}>
                        <Fragment>
                            <Row style={{ "margin": 0, "height": "8vh", "border-bottom": "1px solid #DDDDDD" }}>
                                <Col lg={2} style={{ "position": "relative" }}>
                                    <a href='/plans'>
                                        <h2 style={
                                            {
                                                "position": "absolute",
                                                "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)",
                                                "margin-bottom": 0,
                                                "color": '#495057'
                                            }
                                        }>
                                            Acadplanner
                                    </h2>
                                    </a>
                                </Col>
                                <Col lg={10} style={{ "padding": 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', 'padding-left': 20, 'padding-right': 20, alignItems: 'center', height: '8vh' }}>
                                        <div></div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <a href='/profile'>
                                                <a style={{ marginRight: 10, color: '#495057' }} href='/profile'>{this.props.profile.name}</a>
                                                <img src={require("../assets/avatar-icon.png")} height='50' />
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ "margin": 0 }}>
                                <Col lg={2} style={{ "padding-left": 15, "padding-right": 15, "padding-top": 10, "height": "92vh" }}>
                                    <MetisMenu content={MainNav} activeLinkFromLocation
                                        className="vertical-nav-menu" iconNamePrefix="" LinkComponent={Link} />
                                </Col>
                                <Col lg={10} style={{ "padding": 25, "border-left": "1.5px solid #DDDDDD" }}>
                                    {this.props.children}
                                </Col>
                            </Row>
                        </Fragment>
                    </Provider>}
                {!this.state.loaded && "Loading..."}
            </div>
        )
    }
}

function mapState(state) {
    return { profile: state.profile, plans: state.plans, community: state.community }
}

export default connect(mapState)(Layout)