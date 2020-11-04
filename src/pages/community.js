import React from 'react';

import Layout from "../components/layout"

import { InputGroup, InputGroupAddon, Input, Button, Col, Row, Container } from 'reactstrap';

export default function Community() {
  return (
    <Layout>
      <Container>
        <InputGroup>
          <Input
              type="search"
              name="search"
              id="planSearch"
              placeholder="Search for a plan here"
            />
          <InputGroupAddon addonType="append"><Button color="primary"><i class="pe-7s-search pe-lg"></i></Button></InputGroupAddon>
        </InputGroup>
        <Row>
          <button color="secondary">sort by</button>
          <button color="secondary">filter results</button>
        </Row>
        <section className="searchResultsList">
          {data.map((searchResult) => {
            return <SearchResult {...searchResult}></SearchResult>;
          })}
        </section>
      </Container>
    </Layout>
  )
}

const SearchResult = ({ title, date, numLikes, numComments, username, desc }) => {

  return (
    <article className="searchResult">
      <Container>
        <Row>
          <Col xs="9">
            <a href="#">{title}</a>
            {/* <h5>{title}</h5> */}
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
  );

};

const data = [
  {
    title: "title 1",
    date: "date 1",
    numLikes: 1,
    numComments: 1,
    username: "thelegend27",
    desc: "this is a description"
  },
  {
    title: "title 2",
    date: "date 2",
    numLikes: 2,
    numComments: 2,
    username: "thelegend28",
    desc: "this is a description"
  },
  {
    title: "title 3",
    date: "date 3",
    numLikes: 3,
    numComments: 3,
    username: "thelegend29",
    desc: "this is a description"
  },
  {
    title: "title 4",
    date: "date 4",
    numLikes: 4,
    numComments: 4,
    username: "thelegend30",
    desc: "this is a description"
  },
  {
    title: "title 5",
    date: "date 5",
    numLikes: 5,
    numComments: 5,
    username: "thelegend31",
    desc: "this is a description"
  },
];