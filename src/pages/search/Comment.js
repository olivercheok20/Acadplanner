import React from "react"

import { Button, Row, Col } from "reactstrap"

import "./Comment.css"

export default function Comment(props) {
  return (
    <>
      <Col className="comment-container">
        <Row className="comment-heading">
          <i className="pe-7s-user pe-2x pe-va pe-fw"></i>
          <h6>{props.username}</h6>
          <p>{props.date}</p>
        </Row>
        {/* <p style={{ wordBreak: "break-all" }}> */}
        {props.content}
        {/* </p> */}
        <Row className="actions-row">
          <i className="pe-7s-like2 pe-lg pe-va pe-fw"></i>
          {props.numLikes}
          <Button color="link">Reply</Button>
        </Row>
      </Col>
      <br />
    </>
  )
}
