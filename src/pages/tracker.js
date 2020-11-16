import React, { useState, useEffect } from "react"
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Input, Form, FormGroup, ModalFooter } from "reactstrap";
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
    { name: 'GE1101E Geographical Journeys: Exploring World Environments', modularCredits: '4', grade: '' },
    { name: 'GET1018 The Mathematics of Games', modularCredits: '4', grade: '' },
    { name: 'GET1002 Bridging East and West: Exploring Chinese Communication', modularCredits: '4', grade: '' },
    { name: 'GEM1052T Understanding The Changing Global Economic Landscape', modularCredits: '4', grade: '' },
    { name: 'UTC2402 Environment and Civil Society in Singapore', modularCredits: '4', grade: '' },
    { name: 'GE2202 Economy & Space', modularCredits: '4', grade: '' },
    { name: 'GET1042 Sky and Telescopes', modularCredits: '4', grade: '' },
    { name: 'GEH1002 Economic Issues in Dev World', modularCredits: '4', grade: '' },
    { name: 'GES1000 Singapore Employment Law', modularCredits: '4', grade: '' },
    { name: "GES1002 Global EC Dimensions of S'pore", modularCredits: '4', grade: '' },
  ]

  const compulsoryULR = [
    { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
  ]

  const UER = [
    { name: 'LAT4202 Thai 6', modularCredits: '4', grade: '' },
    { name: 'LAF1201 French 1', modularCredits: '4', grade: '' },
    { name: 'LAT1201 Thai 1', modularCredits: '4', grade: '' },
    { name: 'LSM1306 Forensic Science', modularCredits: '4', grade: '' },
    { name: 'LAC1201 Chinese 1', modularCredits: '4', grade: '' },
  ]

  const PR = [
    { name: 'CS4211 Formal Methods for Software Engineering', modularCredits: '4', grade: '' },
    { name: 'CS4216 Constraint Logic Programming', modularCredits: '4', grade: '' },
    { name: 'CS4218 Software Testing', modularCredits: '4', grade: '' },
    { name: 'CS4222 Wireless Networking', modularCredits: '4', grade: '' },
    { name: 'CS4224 Distributed Databases', modularCredits: '4', grade: '' },
    { name: 'CS4226 Internet Architecture', modularCredits: '4', grade: '' },
    { name: 'CS4232 Theory of Computation', modularCredits: '4', grade: '' },
    { name: 'CS4235 Computational Geometry', modularCredits: '4', grade: '' },
    { name: 'CS4239 Software Security', modularCredits: '4', grade: '' },
  ]

  const compulsoryPR = [
    { name: 'IS1103  Ethics in Computing', modularCredits: '4', grade: '' },
    { name: 'CS2101 Effective Communication for Computing Professionals', modularCredits: '4', grade: '' },
    { name: 'ST2334 Probability and Statistics', modularCredits: '4', grade: '' },
    { name: 'CS1010 Programming Methodology', modularCredits: '4', grade: '' },
    { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
    { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
    { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: '' },
    { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: '' },
    { name: 'CS2100 Computer Organisation', modularCredits: '4', grade: '' },
    { name: 'CS2103T Software Engineering', modularCredits: '4', grade: '' },
    { name: 'CS2106 Introduction to Operating Systems', modularCredits: '4', grade: '' },
    { name: 'CS3230 Design and Analysis of Algorithms', modularCredits: '4', grade: '' },
  ]

  const allModules = ULR.concat(UER).concat(PR)

  const [semesterArray, setSemesterArray] = useState([])

  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => { if (activeTab !== tab) setActiveTab(tab); }
  const { className } = 0;
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [activePlan, setActivePlan] = useState(getCurrentPlan())
  const [moduleToAdd, setModuleToAdd] = useState(null)

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

  function findModuleByName(name) {
    for (const mod of allModules) {
      if (mod.name = name) {
        return mod
      }
    }
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

  function isModInPlan(moduleName) {
    console.log(moduleName)
    for (const year of activePlan.years) {
      for (const semester of year.semesters) {
        for (const mod of semester.modules) {
          console.log(mod.name)
          if (mod.name == moduleName) {
            return true
          }
        }
      }
    }
    return false
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
                  return (<p style={{marginBottom: 0, width:'100%'}}>{mod}</p>)
                }
                )}
                </Row>
              </Col>
              <Col>
                <Row><b>Modules Left</b></Row> 
                {/* Change this to MODAL */}
                <Row>
                {modulesLeftFrom(ULR).map((mod) => {
                  return (<a style={{marginBottom: 0, width:'100%'}} href="#" onClick={(e) => {
                    toggleModal(mod); 
                    e.preventDefault()
                    setModuleToAdd(mod)
                  }
                  }>{mod}</a>)
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
                  return (<p style={{marginBottom: 0, width:'100%'}}>{mod}</p>)
                }
                )}
                </Row>

              </Col>
              <Col>
                <Row><b>Modules Left</b></Row>
                {/* Change this to MODAL */}
                <Row>
                {modulesLeftFrom(UER).map((mod) => {
                  return (<p style={{marginBottom: 0, width:'100%'}}>{mod}</p>)
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
                  return (<p style={{marginBottom: 0, width:'100%'}}>{mod}</p>)
                }
                )}
                </Row>
              </Col>
              <Col>
                <Row><b>Modules Left</b></Row>
                {/* Change this to MODAL */}
                <Row>
                {modulesLeftFrom(PR).map((mod) => {
                  return (<p style={{marginBottom: 0, width:'100%'}}>{mod}</p>)
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

      {moduleToAdd &&
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add {moduleToAdd.split(" ", 1)[0]} to "{activePlan.planName}"</ModalHeader>
          <ModalBody>
            {
              activePlan.years.map((year) => (
                <div>
                  <h5>{year.yearName}</h5>
                  {year.semesters.map((semester) => {
                    console.log(moduleToAdd)
                    return (
                    <div>
                      <b style={{ marginBottom: '15px' }}>{semester.semesterName}</b>
                      {
                        semester.modules.map((mod) => (
                          <p style={{ margin: 0 }}>{mod.name}</p>
                        ))
                      }
                      {
                        !isModInPlan(moduleToAdd) &&
                        <a href='#' onClick={() => props.onAddSpecifiedModule(activePlan.planName, year.yearName, semester.semesterName, findModuleByName(moduleToAdd))}>
                          Add {moduleToAdd.split(" ", 1)[0]}
                        </a>}
                    </div>

                  )}
                  )
                  }
                </div>
              )
              )
            }

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
      }

      <hr />

      <h5>Cumulative Average Point Calculator</h5>

      <div style={{ paddingTop: '8px' }}>


        <Row>
          <Col lg={5}>
            <Select
            defaultValue={getNamesOfSemesters()}
            onChange={(newSemesterArray) => {
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
    </Layout>
  )
}


function mapState(state) {
  return { plans: state.plans, profile: state.profile }
}

function mapDispatch(dispatch) {
  return {
    onAddSpecifiedModule: (planName, yearName, semesterName, module) => dispatch({ type: 'addSpecifiedModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'module': module } }),
  }
}

export default connect(mapState, mapDispatch)(Tracker)