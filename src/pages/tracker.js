import React, { useState, useEffect } from "react"
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Input, Form, FormGroup } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Layout from "../components/layout"
import classnames from 'classnames';
import Select from 'react-select';

import { connect, Provider } from "react-redux";
import store from '../state/createStore';

import makeAnimated from 'react-select/animated'


function Tracker(props) {

  const ULR = [
    { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
  ]

  const compulsoryULR = [
    { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
  ]

  const UER = [

  ]

  const PR = [
    { name: 'CS1010 Programming Methodology', modularCredits: '4', grade: '' },
    { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
    { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
  ]

  const compulsoryPR = [
    { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: '' },
    { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: '' },
  ]

  const [semesterArray, setSemesterArray] = useState([])

  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => { if (activeTab !== tab) setActiveTab(tab); }
  const { className } = 0;
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [activePlan, setActivePlan] = useState(getCurrentPlan())

  const animatedComponents = makeAnimated();

  function getCurrentPlan() {
    let currentPlan;
    for (const plan of props.plans) {
      if (plan.current) {
        currentPlan = plan
        break;
      }
    }
    return currentPlan
  }

  function makeSemesterOptions() {
    let options = [];
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        options.push({'value': semester.semesterName, 'label': semester.semesterName})
      }
    }
    return options
  }

  function getCareer() {
    switch (props.profile.year) {
      case 'AY 15/16':
        return 'Undergraduate Year 5 Semester 1'
      case 'AY 16/17':
        return 'Undergraduate Year 4 Semester 1'
      case 'AY 17/18':
        return 'Undergraduate Year 3 Semester 1'
      case 'AY 18/19':
        return 'Undergraduate Year 2 Semester 1'
      case 'AY 19/20':
        return 'Undergraduate Year 1 Semester 1'
      case 'AY 20/21':
        return 'Undergraduate Year 1 Semester 1'
    }
  }

  function handleChangePlan(planName) {
    var newActivePlan = null

    props.plans.forEach(function (plan, index) {
      if (plan.planName == planName) {
        newActivePlan = plan
      }
    })
    setActivePlan(newActivePlan)
  }

  function getNumberOfMCs() {
    let MCs = 0;
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        for (const mod of semester.modules) {
          MCs += parseInt(mod.modularCredits)
        }
      }
    }
    return MCs
  }

  function takenModsFrom(requirement) {
    let taken = []
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        for (const mod of semester.modules) {
          for (const req of requirement) {
            if (mod.name == req.name) {
              taken.push(mod.name)
            }
          }
        }
      }
    }
    return taken
  }

  function modulesLeftFrom(requirement) {
    let left = []
    for (const req of requirement) {
      let taken = false;
      for (const year of activePlan.years) {
        for (const semester of year.semesters) {
          for (const mod of semester.modules) {
            if (req.name == mod.name) {
              taken = true
            }
          }
        }
      }
      if (!taken) {
        left.push(req.name)
      }
    }
    return left
  }

  // Fix this one
  function getNamesOfSemesters() {
    let names = []
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        names.push(semester.name)
      }
    }
    return names
  }

  function calculateCoreCAP() {
    let total = 0
    let num = 0
    for (const checkSemester of semesterArray) {
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        if (checkSemester.value == semester.semesterName ){
        for (const mod of semester.modules) {
          for (const req of PR) {
            if (mod.name == req.name) {
              if (mod.grade) {
                if (mod.grade != 'S' && mod.grade != 'U') {
                  num += 1
                }
                switch (mod.grade) {
                  case 'A+':
                  case 'A':
                    total += 5
                    break;
                  case 'A-':
                    total += 4.5
                    break;
                  case 'B+':
                    total += 4
                    break;
                  case 'B':
                    total += 3.5
                    break;
                  case 'B-':
                    total += 3
                    break;
                  case 'C+':
                    total += 2.5
                    break;
                  case 'C':
                    total += 2
                    break;
                  case 'D+':
                    total += 1.5
                    break;
                  case 'D':
                    total += 1
                    break;
                  case 'F':
                  case 'S':
                  case 'U':
                    total += 0
                    break;                                                                                                      
                }
              }
            }
          }
        }
      }
      }
    }
  }
    return Math.round(total / num * 100) / 100
  }

  function calculateCAP() {
    let total = 0
    let num = 0
    for (const checkSemester of semesterArray) {
      for (const year of activePlan.years) {
        for (const semester of year.semesters) {
          if (checkSemester.value == semester.semesterName ){
          for (const mod of semester.modules) {
                if (mod.grade) {
                  if (mod.grade != 'S' && mod.grade != 'U') {
                    num += 1
                  }
                  switch (mod.grade) {
                    case 'A+':
                    case 'A':
                      total += 5
                      break;
                    case 'A-':
                      total += 4.5
                      break;
                    case 'B+':
                      total += 4
                      break;
                    case 'B':
                      total += 3.5
                      break;
                    case 'B-':
                      total += 3
                      break;
                    case 'C+':
                      total += 2.5
                      break;
                    case 'C':
                      total += 2
                      break;
                    case 'D+':
                      total += 1.5
                      break;
                    case 'D':
                      total += 1
                      break;
                    case 'F':
                    case 'S':
                    case 'U':
                      total += 0
                      break;                                                                                                      
                  }
                }
              
          }
        }
        }
      }
    }
    return Math.round(total / num * 100) / 100
  }

  function calculateRemainingSUs() {
    let SUsRemaining = 32
    for (const year of activePlan.years) {
      if (year.yearName == 'Year 1') {
        for (const semester of year.semesters) {
          for (const mod of semester.modules) {
            if (mod.grade == 'S' || mod.grade == 'U') {
              SUsRemaining -= 4
            }
          }
        }
      } else {
        if (SUsRemaining > 12) {
          SUsRemaining = 12
        }
        for (const semester of year.semesters) {
          for (const mod of semester.modules) {
            if (mod.grade == 'S' || mod.grade == 'U') {
              SUsRemaining -= 4
            }
          }
        }
      }
    }
    return SUsRemaining
  }

  {
    // function addMod(r) {
    //   toggleModal();
    //   global = r;
    // }

    // function myFunction(r, s) {
    //   var ul = document.getElementById(r).parentNode.previousSibling.previousSibling;
    //   var li = document.createElement("li");
    //   var children = ul.children.length + 1
    //   li.setAttribute("id", "element" + children)
    //   li.appendChild(document.createTextNode("" + global));
    //   ul.appendChild(li);
    //   toggleModal();
    //   updateMC(s);
    //   if (global === "UEM8000") {
    //     document.getElementById(global).style.display = 'none';
    //     document.getElementById(global).nextSibling.style.display = "block";
    //     updateuebadge()
    //   } else {
    //     document.getElementById(global).style.display = 'none';
    //     document.getElementById(global).nextSibling.style.display = "block";
    //     updatemajbadge()
    //   }
    // }

    // function updateMC(s) {
    //   var ele = document.getElementById(s);
    //   var str = ele.innerText;
    //   var val = str.substring(12);
    //   val = parseInt(val) + 4;
    //   ele.innerHTML = "Total MCs : " + val + "";
    // }

    // function updateuebadge() {
    //   var ele = document.getElementById("uebadge");
    //   ele.innerHTML = "&#x2713;";
    //   ele.style.backgroundColor = "#545cd8";

    //   var ueUnitsPlanned = document.getElementById("ueplan");
    //   var planstr = ueUnitsPlanned.innerText;
    //   var planval = planstr.substring(15, 16);
    //   planval = parseInt(planval) + 4;
    //   ueUnitsPlanned.innerHTML = "Units Planned: " + planval + "MCs";

    //   var ueUnitsNeeded = document.getElementById("ueneed");
    //   var needstr = ueUnitsNeeded.innerText;
    //   var needval = needstr.substring(14, 15);
    //   needval = parseInt(needval) - 4;
    //   ueUnitsNeeded.innerText = "Units Needed: " + needval + "MCs";
    // }

    // function updatemajbadge() {
    //   var ele = document.getElementById("majbadge");
    //   ele.innerHTML = parseInt(ele.innerHTML) - 4;

    //   var majUnitsPlanned = document.getElementById("majplan");
    //   var planstr = majUnitsPlanned.innerText;
    //   var planval = planstr.substring(15, 17);
    //   planval = parseInt(planval) + 4;
    //   majUnitsPlanned.innerHTML = "Units Planned: " + planval + "MCs";

    //   var majUnitsNeeded = document.getElementById("majneed");
    //   var needstr = majUnitsNeeded.innerText;
    //   var needval = needstr.substring(14, 17);
    //   needval = parseInt(needval) - 4;
    //   majUnitsNeeded.innerText = "Units Needed: " + needval + "MCs";
    // }
  }

  return (
    <Layout>
      <h4>Degree Tracker</h4>

      <hr />

      <div>

        <Row style={{ marginBottom: '15px' }}>
          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Academic Year</h5>
            </div>
            <h6>2020/2021 Semester 1</h6>
          </Col>

          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Academic Programme</h5>
            </div>
            <h6>{props.profile.programme}</h6>
            <h6>{props.profile.special}</h6>
          </Col>

          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Major/Minor</h5>
            </div>
            <h6>{props.profile.major}</h6>
            <h6>{props.profile.minor}</h6>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Career</h5>
            </div>
            <h6>{getCareer()}</h6>
          </Col>

          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Enrollment Year</h5>
            </div>
            <h6>{props.profile.year}</h6>
          </Col>

          <Col md={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
              <h5>Completed MCs</h5>
            </div>
            <h6>{getNumberOfMCs()}</h6>
          </Col>
        </Row>

      </div>

      <hr />
      <Row style={{ margin: 0 }}>
        <Col lg={2} style={{ padding: 0 }}>
          <h5>Plan Selection</h5>
        </Col>
      </Row>

      <Row style={{ margin: 0, marginTop: '10px' }}>
        <Col lg={7} style={{ padding: 0 }}>
          <Input
            type="select"
            name="text"
            id="planselection"
            defaultValue={activePlan.planName}
            onChange={(e) => { handleChangePlan(document.getElementById("planselection").value) }}
          >
            {props.plans.map((plan, i) => (
              <option key={i}>{plan.planName} </option>
            ))}
          </Input>
        </Col>
      </Row>

      <br />

      <div>
        <Nav tabs style={{ marginBottom: '0px' }}>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1') }}
            >
              University Level Requirements
              {!(20 - takenModsFrom(ULR).length * 4) && <Badge color="primary">&#x2713;</Badge>}
              {(20 - takenModsFrom(ULR).length * 4) && <Badge color="danger">{20 - takenModsFrom(ULR).length * 4}</Badge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2') }}
            >
              Unrestricted Electives Requirements
              {!(32 - takenModsFrom(UER).length * 4) && <Badge color="primary">&#x2713;</Badge>}
              {(32 - takenModsFrom(UER).length * 4) && <Badge color="danger">{32 - takenModsFrom(UER).length * 4}</Badge>}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3') }}
            >
              Programme Requirements
              
              {!(108 - takenModsFrom(PR).length * 4) && <Badge color="primary">&#x2713;</Badge>}
              {(108 - takenModsFrom(PR).length * 4) && <Badge color="danger">{108 - takenModsFrom(PR).length * 4}</Badge>}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} style={{
          paddingTop: '15px',
          borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px'

        }}>
          <TabPane tabId="1">
            <Row style={{ marginLeft: 0, marginRight: 0, marginBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
              <Col>
                <Row><b>Modules Taken</b></Row>
                <Row>
                {takenModsFrom(ULR).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}
                </Row>
              </Col>
              <Col>
                <Row><b>Modules Left</b></Row> 
                {/* Change this to MODAL */}
                <Row>
                {modulesLeftFrom(ULR).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}
                </Row>

              </Col>
              <Col>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    20 MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Taken:
                  </Col>
                  <Col>
                    {takenModsFrom(ULR).length * 4} MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    {20 - takenModsFrom(ULR).length * 4} MCs
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row style={{ marginLeft: 0, marginRight: 0, marginBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
              <Col>
                <Row><b>Modules Taken</b></Row>
                <Row>
                {takenModsFrom(UER).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}
                </Row>

              </Col>
              <Col>
                <Row><b>Modules Left</b></Row>
                {/* Change this to MODAL */}
                {modulesLeftFrom(UER).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}

              </Col>
              <Col>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    32 MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Taken:
                  </Col>
                  <Col>
                    {takenModsFrom(UER).length * 4} MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    {32 - takenModsFrom(ULR).length * 4} MCs
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row style={{ marginLeft: 0, marginRight: 0, marginBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
              <Col>
                <Row style={{marginBottom: '10px'}}><b>Modules Taken</b></Row>
                <Row>
                {takenModsFrom(PR).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}
                </Row>
              </Col>
              <Col>
                <Row><b>Modules Left</b></Row>
                {/* Change this to MODAL */}
                {modulesLeftFrom(PR).map((mod) => {
                  return (<p style={{marginBottom: 0}}>{mod}</p>)
                }
                )}

              </Col>
              <Col>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    108 MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Taken:
                  </Col>
                  <Col>
                    {takenModsFrom(PR).length * 4} MCs
                  </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                  <Col>
                    Units Required:
                  </Col>
                  <Col>
                    {108 - takenModsFrom(PR).length * 4} MCs
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>

      <hr />

      <h5>Cumulative Average Point Calculator</h5>

      <div style={{ paddingTop: '8px' }}>


        <Row>
          <Col lg={5}>
            <Select
            defaultValue={getNamesOfSemesters()}
            onChange={(newSemesterArray) => {
              console.log(newSemesterArray)
              setSemesterArray(newSemesterArray)
            }}
            options={makeSemesterOptions()}
            isMulti={true}
            components={animatedComponents}
            />
          </Col>
          <Col lg={1}></Col>
          <Col lg={6}>
            <Row style={{ paddingBottom: '15px' }}>
              <Col>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
                  <h5>Overall CAP</h5>
                </div>
                {!isNaN(calculateCAP()) && <h6>{calculateCAP()}</h6>}
                {isNaN(calculateCAP()) && <h6>0</h6>}
              </Col>
            </Row>
            <Row style={{ paddingBottom: '15px' }}>
              <Col>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
                  <h5>Core CAP</h5>
                </div>
                {!isNaN(calculateCoreCAP()) && <h6>{calculateCoreCAP()}</h6>}
                {isNaN(calculateCoreCAP()) && <h6>0</h6>}
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8' }}>
                  <h5>Total SUs remaining</h5>
                </div>
                <h6>{calculateRemainingSUs()}</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>


      <div>
        {/* <div>
        <Form>
          <FormGroup>
            <Row>
              <Col sm={8}>
                <p style={{ fontSize: '16px' }}>Semesters to Include for CAP Calculation</p>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple onChange={() => calcCAP()}>
                  <option>y1 sem1</option>
                  <option>y1 sem2</option>
                  <option>y2 sem1</option>
                  <option>y2 sem2</option>
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <br></br>
        <p style={{ fontSize: '16px' }}>Cumulative CAP</p>
        <h5 id="CCAP">-</h5>
      </div>
      <br></br>

      <div style={{ margin: 50, marginTop: 0 }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              University Level Requirements <Badge color="primary">&#x2713;</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Unrestrictive Electives Requirements <Badge color="danger" id="uebadge">4</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Programme Requirements <Badge color="danger" id="majbadge">40</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div style={{ margin: 15 }}>
              <Row>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Taken</p>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 1 Sem 1</u></p>
                      <p>GER1000 4MC</p>
                      <p>GEQ1000 4MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 1 Sem 2</u></p>
                      <p>GES1000 4MC</p>
                      <p>GEH1000 4MC</p>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 2 Sem 1</u></p>
                      <p>GET1000 4MC</p>
                    </Col>
                  </Row>
                </Col>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Left</p>
                  <p>You have cleared the university level requirements.</p>
                </Col>
                <Col sm="4">
                  <p>Units Required: 20MCs</p>
                  <p>Units Taken: 20MCs</p>
                  <p>Units Planned: 0MCs</p>
                  <p>Units Needed: 0MCs</p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div style={{ margin: 15 }}>
              <Row>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Taken</p>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 1 Sem 1</u></p>
                      <p>UEM1000 4MC</p>
                      <p>UEM2000 4MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 1 Sem 2</u></p>
                      <p>UEM3000 4MC</p>
                      <p>UEM4000 4MC</p>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 2 Sem 1</u></p>
                      <p>UEM5000 4MC</p>
                    </Col>
                  </Row>
                </Col>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Left</p>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 3 Sem 1</u></p>
                      <p>UEM6000 4MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 3 Sem 2</u></p>
                      <p>UEM7000 4MC</p>
                    </Col>
                  </Row>
                  <a href="#/" onClick={() => addMod("UEM8000")} id="UEM8000">Add UEM8000 to your academic plan</a>
                  <p style={{ display: "none" }}>UEM8000 has been successfully added!</p>
                  <Modal isOpen={modal} toggle={toggleModal} className={className} size="lg" unmountOnClose={false}>
                    <ModalHeader toggle={toggleModal}>Choose Semester</ModalHeader>
                    <ModalBody>
                      <Row>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 1 Sem 1</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>GER1000</li>
                            <li>GEQ1000</li>
                            <li>UEM1000</li>
                            <li>UEM2000</li>
                            <li>CS1010</li>
                            <li>CS1231</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc1">Total MCs : 24</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add1", "mc1")} id="add1">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 2 Sem 1</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>GET1000</li>
                            <li>UEM5000</li>
                            <li>MA1101R</li>
                            <li>CS2100</li>
                            <li>CS2102</li>
                            <li>CS2105</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc2">Total MCs : 24</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add2", "mc2")} id="add2">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 3 Sem 1</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>UEM6000</li>
                            <li>CS3240</li>
                            <li>CS3203</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc3">Total MCs : 16</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add3", "mc3")} id="add3">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 4 Sem 1</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc4">Total MCs : 0</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add4", "mc4")} id="add4">Add +</Button>
                          </div>
                        </Col>
                      </Row>
                      <br></br>
                      <hr />
                      <Row>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 1 Sem 2</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>GES1000</li>
                            <li>GEH1000</li>
                            <li>UEM3000</li>
                            <li>UEM4000</li>
                            <li>CS2030</li>
                            <li>CS2040</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc5">Total MCs : 24</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add5", "mc5")} id="add5">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 2 Sem 2</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>MA1521</li>
                            <li>ST2334</li>
                            <li>CS2113</li>
                            <li>CS3230</li>
                            <li>CS2106</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc6">Total MCs : 20</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add6", "mc6")} id="add6">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 3 Sem 2</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                            <li>UEM7000</li>
                            <li>CS3241</li>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc7">Total MCs : 8</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add7", "mc7")} id="add7">Add +</Button>
                          </div>
                        </Col>
                        <Col sm="3">
                          <p style={{ textAlign: "center", fontSize: '14px' }}>Year 4 Sem 2</p>
                          <ul style={{ listStyleType: "square", marginLeft: "20px" }}>
                          </ul>
                          <p style={{ textAlign: "center", fontSize: '14px' }} id="mc8">Total MCs : 0</p>
                          <div style={{ textAlign: "center" }}>
                            <Button color="primary" onClick={() => myFunction("add8", "mc8")} id="add8">Add +</Button>
                          </div>
                        </Col>
                      </Row>
                    </ModalBody>
                  </Modal>
                </Col>
                <Col sm="4">
                  <p>Units Required: 32MCs</p>
                  <p>Units Taken: 20MCs</p>
                  <p id="ueplan">Units Planned: 8MCs</p>
                  <p>Units Needed: 4MCs</p>
                </Col>
              </Row>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div style={{ margin: 15 }}>
              <Row>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Taken</p>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 1 Sem 1</u></p>
                      <p>CS1010 4MC</p>
                      <p>CS1231 4MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 1 Sem 2</u></p>
                      <p>CS2030 4MC</p>
                      <p>CS2040 4MC</p>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 2 Sem 1</u></p>
                      <p>MA1101R 4MC</p>
                      <p>CS2100 4MC</p>
                      <p>CS2102 4MC</p>
                      <p>CS2105 4MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 2 Sem 2</u></p>
                      <p>MA1521 4MC</p>
                      <p>ST2334 4MC</p>
                      <p>CS2113 4MC</p>
                      <p>CS3230 4MC</p>
                      <p>CS2106 4MC</p>
                    </Col>
                  </Row>
                </Col>
                <Col sm="4">
                  <p style={{ fontSize: '16px' }}>Modules Left</p>
                  <Row>
                    <Col sm="6">
                      <p><u>Year 3 Sem 1</u></p>
                      <p>CS3240 4MC</p>
                      <p>CS3203 8MC</p>
                    </Col>
                    <Col sm="6">
                      <p><u>Year 3 Sem 2</u></p>
                      <p>CS3241 4MC</p>
                    </Col>
                  </Row>
                  <p>
                    <a href="#/" onClick={() => addMod("IS1103")} id="IS1103">Add IS1103 to your academic plan</a>
                    <span style={{ display: "none" }}>IS1103 has been successfully added!</span>
                  </p>
                  <p>
                    <a href="#/" onClick={() => addMod("ES2660")} id="ES2660">Add ES2660 to your academic plan</a>
                    <span style={{ display: "none" }}>ES2660 has been successfully added!</span>
                  </p>
                  <p>
                    <a href="#/" onClick={() => addMod("CP3209")} id="CP3209">Add CP3209 to your academic plan</a>
                    <span style={{ display: "none" }}>CP3209 has been successfully added!</span>
                  </p>
                </Col>
                <Col sm="4">
                  <p>Units Required: 108MCs</p>
                  <p>Units Taken: 52MCs</p>
                  <p id="majplan">Units Planned: 16MCs</p>
                  <p>Units Needed: 40MCs</p>
                </Col>
              </Row>
            </div>
          </TabPane>
        </TabContent>
      </div> */}
      </div>
    </Layout>
  )
}


function mapState(state) {
  return { plans: state.plans, profile: state.profile }
}

function mapDispatch(dispatch) {
  return {
    onAddModule: (planName, yearName, semesterName) => dispatch({ type: 'addModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName } }),
  }
}

export default connect(mapState, mapDispatch)(Tracker)