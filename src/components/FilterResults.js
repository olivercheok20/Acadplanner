import React, { useState } from "react"

import {
  FormGroup,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap"

function FilterResults(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [checked, setChecked] = useState([]) // keeps track of checked checkboxes in dropdown

  // called when a checkbox is toggled
  const handleToggle = (tag, isChecked) => {
    const updatedChecked = [...checked]

    // if tag is checked but not inside checked array, add it into updated checked array
    if (isChecked && !checked.includes(tag)) {
      updatedChecked.push(tag)
    }

    // if tag is not checked but inside checked array, remove it from the updated checked array
    if (!isChecked && checked.includes(tag)) {
      const index = checked.indexOf(tag)
      updatedChecked.splice(index, 1) // remove the tag from checked array
    }

    setChecked(updatedChecked)
    props.handleFilters(updatedChecked)
  }

  return (
    <>
      <Dropdown className="ml-2" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle outline caret>
          Filter
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
          <DropdownItem header>Degree Type</DropdownItem>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="single-degree"
                checked={checked.includes("single-degree")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Single
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="double-degree"
                checked={checked.includes("double-degree")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Double
            </Label>
          </FormGroup>
          <DropdownItem divider />
          <DropdownItem header>Faculties</DropdownItem>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="arts"
                checked={checked.includes("arts")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Arts and Social Sciences
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="business"
                checked={checked.includes("business")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Business
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="computing"
                checked={checked.includes("computing")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Computing
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="sde"
                checked={checked.includes("sde")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Design and Environment
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="engineering"
                checked={checked.includes("engineering")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Engineering
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="law"
                checked={checked.includes("law")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Law
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="science"
                checked={checked.includes("science")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Science
            </Label>
          </FormGroup>
          <DropdownItem divider />
          <DropdownItem header>Overseas Programmes</DropdownItem>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="sep"
                checked={checked.includes("sep")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Student Exchange Programme
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="noc"
                checked={checked.includes("noc")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              NUS Overseas Colleges
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="winter"
                checked={checked.includes("winter")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Winter Exchange Programme
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="summer"
                checked={checked.includes("summer")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              Summer Exchange Programme
            </Label>
          </FormGroup>
          <DropdownItem divider />
          <DropdownItem header>Other Programmes</DropdownItem>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="utcp"
                checked={checked.includes("utcp")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              UTown College Programme
            </Label>
          </FormGroup>
          <FormGroup check inline className="mx-3 my-1">
            <Label check>
              <Input
                type="checkbox"
                id="usp"
                checked={checked.includes("usp")}
                onChange={e => handleToggle(e.target.id, e.target.checked)}
              />{" "}
              University Scholars Programme
            </Label>
          </FormGroup>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default FilterResults
