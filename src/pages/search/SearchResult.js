import React from "react"

import { Button, Col, Row, Container } from "reactstrap"

const SearchResult = ({
  id,
  title,
  date,
  numLikes,
  numComments,
  username,
  desc,
}) => {
  const handleClick = () => {
    const url = "/publicplan?id=" + id
    window.open(url)
  }

  return (
    <article className="searchResult">
      <Container>
        <Row>
          <Col xs="9">
            <Button color="link" onClick={handleClick}>
              {title}
            </Button>
            <Row>
              <p>{date}</p>
              <p>{numLikes}</p>
              <i class="pe-7s-like2 pe-lg"></i>
              <p>{numComments}</p>
              <i class="pe-7s-comment pe-lg"></i>
            </Row>
          </Col>
          <Col xs="3">
            <i class="pe-7s-user pe-lg"></i>
            <h6>{username}</h6>
          </Col>
        </Row>
        <p>{desc}</p>
      </Container>
    </article>
  )
}

export default SearchResult
