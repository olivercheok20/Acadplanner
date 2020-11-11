import React from "react"

import "./SearchResult.css"

import { Button, Col, Row } from "reactstrap"

const SearchResult = ({
  id,
  title,
  date,
  numLikes,
  numComments,
  username,
  desc,
}) => {
  let url = "/publicplan?id=" + id

  return (
    <article className="mb-4">
      <Row className="mx-0">
        <Col className="px-0">
          <a href={url} className="link">
            {title}
          </a>
          <Row className="plan-details">
            <p className="mr-2">{date}</p>
            <i class="pe-7s-like2 pe-lg pe-va pe-fw icon"></i>
            <p>{numLikes}</p>
            <i class="pe-7s-comment pe-lg pe-va pe-fw icon ml-1"></i>
            <p>{numComments}</p>
            <span className="middot">·</span>Made by
            <Button color="link" className="username-link">
              {username}
            </Button>
          </Row>
        </Col>
      </Row>
      <p className="text-justify">{desc}</p>
      <hr />
    </article>
  )
}

export default SearchResult
