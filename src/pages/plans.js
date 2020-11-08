import React from "react"
import Layout from "../components/layout"
import { Card, Row, Col } from "reactstrap"

export default function Plans() {

  return (
    <Layout>
      <h4>Plans</h4>
      <hr></hr>

      <h5>Current Plan</h5>

      <Card style={{ padding: '20px', margin: '20px 0px' }}>
        <Row style={{ margin: '0px' }}>
          <b style={{ color: '#545cd8', marginBottom: '10px' }}>Name</b>
        </Row>
        <Row style={{ margin: '0px' }}>
          <h5>CS + USP + Israel + Exchange</h5>
        </Row>
        <Row style={{ margin: '0px' }}>
          <Col style={{ padding: '0px' }}>
          <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px'}}>Description</b>
            </Row>
            <Row style={{ margin: '0px' }}>
            <Col style={{ padding: '0px'}}>
            This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Israel in Y3S2.
          </Col>
          </Row>
          </Col>
          <Col style={{ padding: '0px' }}>
            <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px'}}>Public</b>
            </Row>
            <Row style={{ margin: '0px' }}>
              No
            </Row>
            <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px', marginTop: '10px'}}>Tags</b>
            </Row>
            <Row style={{ margin: '0px' }}>
            AI, Computer Security, USP, Israel, Exchange
        </Row>
          </Col>
        </Row>
      </Card>

      <h5>Other Plans</h5>

      <Card style={{ padding: '20px', margin: '20px 0px' }}>
        <Row style={{ margin: '0px' }}>
          <b style={{ color: '#545cd8', marginBottom: '10px' }}>Name</b>
        </Row>
        <Row style={{ margin: '0px' }}>
          <h5>CS + USP + Israel + Exchange</h5>
        </Row>
        <Row style={{ margin: '0px' }}>
          <Col style={{ padding: '0px' }}>
          <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px'}}>Description</b>
            </Row>
            <Row style={{ margin: '0px' }}>
            <Col style={{ padding: '0px'}}>
            This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Israel in Y3S2.
          </Col>
          </Row>
          </Col>
          <Col style={{ padding: '0px' }}>
            <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px'}}>Public</b>
            </Row>
            <Row style={{ margin: '0px' }}>
              No
            </Row>
            <Row style={{ margin: '0px' }}>
            <b style={{ color: '#545cd8', marginBottom: '10px', marginTop: '10px'}}>Tags</b>
            </Row>
            <Row style={{ margin: '0px' }}>
            AI, Computer Security, USP, Israel, Exchange
        </Row>
          </Col>
        </Row>
      </Card>
    </Layout>
  )
}
