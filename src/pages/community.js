import React, { useState } from 'react';

import Layout from "../components/layout";
import {data} from "./search/data";
import SearchResult from "./search/SearchResult";
import FilterResults from "./search/FilterResults";

import { InputGroup, InputGroupAddon, Input, Button, Row, Container } from 'reactstrap';

export default function Community() {

  /* search function */
  const [search, setSearch] = useState('');
  const searchResults = data.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  });

  /* filtering by tags */
  const [filters, setFilters] = useState([]);
  const filteredResults = data.filter(item => {
    for (let i = 0; i < filters.length; i++) {
      if (item.tags.includes(filters[i])) {
        // item tags contain this filter tag
        continue;
      } else {
        return false;
      }
    }
    // item tags contains all the filter tags
    return true;
  })

  // combining results from search and filter 
  const combinedResults = searchResults.filter(result => {
    return filteredResults.includes(result)
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
          <Button color="secondary ml-3">Sort by</Button>
          <FilterResults handleFilters={(filters) => setFilters(filters)}/>
        </Row>
        <section className="resultsList">
          {combinedResults.map((searchResult) => {
            return <SearchResult {...searchResult}></SearchResult>;
          })}
        </section>
      </Container>
    </Layout>
  )
}
