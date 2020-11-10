import React, { useState } from "react"

import Layout from "../components/layout"
import { data } from "../components/data"
import SearchResult from "../components/SearchResult"
import FilterResults from "../components/FilterResults"
import SortBy from "../components/SortBy"

import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Row,
  Container,
} from "reactstrap"

export default function Community() {
  /* search function */
  const [search, setSearch] = useState("")
  const searchResults = data.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  })

  /* filtering by tags */
  const [filters, setFilters] = useState([])
  const filteredResults = data.filter(item => {
    for (let i = 0; i < filters.length; i++) {
      if (item.tags.includes(filters[i])) {
        // item tags contain this filter tag
        continue
      } else {
        return false
      }
    }
    // item tags contains all the filter tags
    return true
  })

  /* sorting the results */
  const [sorting, setSorting] = useState("newest")

  function sortBy(result1, result2) {
    if (sorting === "oldest") {
      return new Date(result1.date) - new Date(result2.date)
    } else if (sorting === "newest") {
      return new Date(result2.date) - new Date(result1.date)
    } else {
      // sorting is by title
      const title1 = result1.title.toLowerCase()
      const title2 = result2.title.toLowerCase()

      if (title1 < title2) {
        return -1 // result1 comes first
      } else if (title1 > title2) {
        return 1 // result2 comes first
      } else {
        return 0 // both result titles are equal
      }
    }
  }

  // combining results from search and filter
  const combinedResults = searchResults
    .filter(result => {
      return filteredResults.includes(result)
    })
    .sort(sortBy)

  return (
    <Layout>
      <h4>Community</h4>

      <hr></hr>
      <Container style={{padding: 0, margin: 0, maxWidth: 'none'}}>
        <InputGroup>
          <Input
            type="search"
            name="search"
            id="planSearch"
            placeholder="Search for a plan by title here"
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button color="primary">
              <i class="pe-7s-search pe-lg"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Row className="my-2">
          <SortBy handleSorting={sorting => setSorting(sorting)} />
          <FilterResults handleFilters={filters => setFilters(filters)} />
        </Row>
        <br />
        <section>
          {combinedResults.map(searchResult => {
            return <SearchResult {...searchResult}></SearchResult>
          })}
        </section>
      </Container>
    </Layout>
  )
}
