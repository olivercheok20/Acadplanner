import React, { Component } from "react"
import { Card, Row, Col } from "reactstrap"

import { Link } from "gatsby";

export default class PlanCard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={"/plans/view#" + this.props.index}>

            <Card style={{ padding: '10px 15px 20px 15px', margin: '20px 0px', borderWidth: '1px', textDecoration: 'none' }}>

                <Row style={{ margin: '0px' }}>
                    <b style={{ color: '#545cd8', marginBottom: '10px' }}>Name</b>
                </Row>
                <Row style={{ margin: '0px', marginBottom: '5px', color: '#495057' }}>
                        <h5>{this.props.plan.planName}</h5>
                </Row>
                <Row style={{ margin: '0px' }}>
                    <Col style={{ padding: '0px' }}>
                        <Row style={{ margin: '0px' }}>
                            <b style={{ color: '#545cd8', marginBottom: '10px' }}>Description</b>
                        </Row>
                        <Row style={{ margin: '0px' }}>
                            <Col style={{ padding: '0px', paddingRight: '10px', color: '#495057' }}>
                                {this.props.plan.planDescription}
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ padding: '0px' }}>
                        <Row style={{ margin: '0px' }}>
                            <b style={{ color: '#545cd8', marginBottom: '10px' }}>Public</b>
                        </Row>
                        <Row style={{ margin: '0px', color: '#495057' }}>
                            {this.props.plan.public ? 'Yes' : 'No'}
                        </Row>
                        <Row style={{ margin: '0px' }}>
                            <b style={{ color: '#545cd8', marginBottom: '10px', marginTop: '10px' }}>Tags</b>
                        </Row>
                        <Row style={{ margin: '0px', color: '#495057' }}>
                            {this.props.plan.tags.join(', ')}
                        </Row>
                    </Col>
                </Row>

            </Card>
            </Link>


        )
    }

}