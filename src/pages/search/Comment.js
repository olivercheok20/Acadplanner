import React from "react"

import { Button, Row, Col } from "reactstrap"

export default function Comment(props) {
  return (
    <>
      <Col>
        <Row>
          <i class="pe-7s-user pe-lg"></i>
          <h6 className="pl-2 pr-3">{props.username}</h6>
          <p>{props.date}</p>
        </Row>
        <p style={{ wordBreak: "break-all" }}>{props.content}</p>
        <Row>
          <i class="pe-7s-like2"></i>
          {props.numLikes}
          <Button color="link">Reply</Button>
        </Row>
      </Col>
      <br />
    </>
  )
}
