import React, { useState } from "react"

import { Button, Row, Col } from "reactstrap"

import "./Comment.css"

export default function Comment(props) {
  /* for like button */
  const [like, setLike] = useState(false)
  const toggleLike = () => {
    setLike(!like)
    if (like) {
      setNumLikes(numLikes - 1)
    } else {
      setNumLikes(numLikes + 1)
    }
  }

  const [numLikes, setNumLikes] = useState(props.numLikes)

  return (
    <>
      <Col className="comment-container">
        <Row className="comment-heading">
          <i className="pe-7s-user pe-2x pe-va pe-fw"></i>
          <h6>{props.username}</h6>
          <p>{props.date}</p>
        </Row>
        {props.content}
        <Row className="actions-row">
          <Row
            className={like ? "btn-like-liked" : "btn-like-default"}
            onClick={toggleLike}
          >
            <i className="pe-7s-like2 pe-lg pe-va pe-fw"></i>
            {numLikes}
          </Row>
          <Button color="link">Reply</Button>
        </Row>
      </Col>
      <br />
    </>
  )
}
