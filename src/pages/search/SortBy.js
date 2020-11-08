import React, { useState } from "react"

import {
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
} from "reactstrap"

function SortBy(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [selected, setSelected] = useState("") // keeps track of which radio button is selected

  const handleRadioButton = value => {
    setSelected(value)
    props.handleSorting(value)
  }

  return (
    <>
      <Dropdown className="ml-3" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle outline caret>
          Sort by
        </DropdownToggle>
        <DropdownMenu
          modifiers={{
            setMaxHeight: {
              enabled: true,
              order: 890,
              fn: data => {
                return {
                  ...data,
                  styles: {
                    ...data.styles,
                    overflow: "auto",
                    maxHeight: "60vh",
                  },
                }
              },
            },
          }}
        >
          <FormGroup check className="mx-3 my-1">
            <Label check>
              <Input
                type="radio"
                value="oldest"
                checked={selected === "oldest"}
                onChange={() => handleRadioButton("oldest")}
              />{" "}
              Oldest First
            </Label>
          </FormGroup>

          <FormGroup check className="mx-3 my-1">
            <Label check>
              <Input
                type="radio"
                value="newest"
                checked={selected === "newest"}
                onChange={() => handleRadioButton("newest")}
              />{" "}
              Newest First
            </Label>
          </FormGroup>

          <FormGroup check className="mx-3 my-1">
            <Label check>
              <Input
                type="radio"
                value="title"
                checked={selected === "title"}
                onChange={() => handleRadioButton("title")}
              />{" "}
              Title
            </Label>
          </FormGroup>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default SortBy
