import React, { useState } from "react";

import { Form, FormGroup, Label, FormText, Collapse, CardBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input, Button, Row, Container } from 'reactstrap';

function FilterResults() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <Dropdown className="ml-2" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Filter
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
        setMaxHeight: {
          enabled: true,
          order: 890,
          fn: (data) => {
            return {
                ...data,
                styles: {
                ...data.styles,
                overflow: 'auto',
                maxHeight: '600px',
                },
            };
            },
        },
        }}
      >
        <DropdownItem header>Faculties</DropdownItem>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox" onChange={(e) => console.log(e.target.checked)}/> Arts and Social Sciences
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox" onChange={(e) => console.log(e.target.checked)}/> Computing
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox" onChange={(e) => console.log(e.target.checked)}/> Dentistry
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox" onChange={(e) => console.log(e.target.checked)}/> Design and Environment
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/> Law
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/>Medicine
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/> Music
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/> NUS Business School
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/> Science
          </Label>
        </FormGroup>
        <FormGroup check inline className="mx-3 my-1">
          <Label check>
              <Input type="checkbox"/> Yale-NUS College
          </Label>
        </FormGroup>
        <DropdownItem divider />
      </DropdownMenu>
      </Dropdown>
    </>
  );

}

export default FilterResults