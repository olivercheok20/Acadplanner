import React, { useState } from 'react';

import Layout from "../components/layout";
import {data} from "./search/data";
import SearchResult from "./search/SearchResult";
import FilterResults from "./search/FilterResults";

import { Form, FormGroup, Label, FormText, Collapse, CardBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input, Button, Row, Container } from 'reactstrap';

export default function Community() {
  const [search, setSearch] = useState('');
  const searchResults = data.filter(searchResult => {
    return searchResult.title.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <Layout>
      <Container>
        <InputGroup className="my-2">
          <Input
            type="search"
            name="search"
            id="planSearch"
            placeholder="Search for a plan by title here"
            onChange={(e) => setSearch(e.target.value)}
            />
          <InputGroupAddon addonType="append"><Button color="primary"><i class="pe-7s-search pe-lg"></i></Button></InputGroupAddon>
        </InputGroup>
        <Row>
          <Button color="secondary ml-3">Sort By</Button>
          <FilterResults />
        </Row>
        <section className="searchResultsList">
          {searchResults.map((searchResult) => {
            return <SearchResult {...searchResult}></SearchResult>;
          })}
        </section>
      </Container>
    </Layout>
  )
}
