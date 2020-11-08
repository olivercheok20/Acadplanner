import React, { useState, useEffect } from "react"
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Input, Form, FormGroup } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Layout from "../components/layout"
import classnames from 'classnames';

var global;

export default function Tracker() {
  
  const [user, setUser] = useState({});
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState('');

  useEffect(() => {
    let retrievedUser1 = {  // user who already has plans
      name: "Oliver Cheok",
      plans: [
        {
          planName: 'CS + USP + Israel Exchange',
          planDescription: 'This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Israel in Y3S2.',
          semesters: [
            { semesterName: 'sem1', modules: [{ name: 'CS1010', modularCredits: '4', grade: 'A' }, { name: 'CS2030', modularCredits: '4', grade: 'A' }] },
            { semesterName: 'sem2', modules: [{ name: 'CS2040', modularCredits: '4', grade: 'A' }] },
            { semesterName: 'sem3', modules: [{ name: 'MA1521', modularCredits: '4', grade: 'A' }] }
          ],
          planToTakeModules: [
            { name: 'CS1231', modularCredits: '4' }
          ]
        },
        {
          planName: 'Plan 2',
          planDescription: 'This is plan 2.',
          semesters: [
            { semesterName: 'sem1', modules: [{ name: 'GEQ1000', modularCredits: '4', grade: 'A' }, { name: 'GEH1000', modularCredits: '4', grade: 'A' }] },
            { semesterName: 'sem2', modules: [{ name: 'GET1000', modularCredits: '4', grade: 'A' }] },
            { semesterName: 'sem3', modules: [{ name: 'GER1000', modularCredits: '4', grade: 'A' }] }
          ],
          planToTakeModules: [
            { name: 'GES1000', modularCredits: '4' }
          ]
        }
      ]
    };

    // let retrievedUser2 = {  // new user who does not have any plans
    //   name: "Jefferson Low",
    //   plans: []
    // };

    setUser(retrievedUser1);
    setPlans(retrievedUser1.plans)
    // setPlanToTakeModules(retrievedUser1.plans[0].planToTakeModules);
    setPlanName(retrievedUser1.plans[0].planName);
    // setPlanDescription(retrievedUser1.plans[0].planDescription);
  }, [])


  const handleChangePlan = (planName) => {
    // let selectedPlan = plans.filter(plan => plan.planName == planName)[0];
    // console.log('before: ' + semesters[0].modules[0].name);
    // console.log('to change to: ' + selectedPlan.semesters[0].modules[0].name)
    // setSemesters(selectedPlan.semesters);
    // setPlanToTakeModules(selectedPlan.planToTakeModules);
    // setPlanName(selectedPlan.planName);
    // setPlanDescription(selectedPlan.planDescription);
  }

  
  function calcCAP () {
    var checked = document.querySelectorAll('#exampleSelectMulti :checked');
    var selected = [...checked].map(option => option.value);
    selected = String(selected);
    if (selected === "y1 sem1") {
      document.getElementById('CCAP').innerHTML = '3.12 (Honours)';
    } else if (selected === "y1 sem1,y1 sem2") {
      document.getElementById('CCAP').innerHTML = '3.33 (Honours)';
    } else if (selected === "y1 sem1,y1 sem2,y2 sem1") {
      document.getElementById('CCAP').innerHTML = '3.20 (Honours)';
    } else if (selected === "y1 sem1,y1 sem2,y2 sem1,y2 sem2") {
      document.getElementById('CCAP').innerHTML = '3.22 (Honours)';
    } else if (selected === "") {
      document.getElementById('CCAP').innerHTML = '-';
    }
  }

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const {className} = 0;

  const [modal, setModal] = useState(false);

  const togglemodal = () => setModal(!modal);

  function addMod (r) {
    togglemodal();
    global = r;
  }

  function myFunction (r, s) {
    var ul = document.getElementById(r).parentNode.previousSibling.previousSibling;
    var li = document.createElement("li");
    var children = ul.children.length + 1
    li.setAttribute("id", "element"+children)
    li.appendChild(document.createTextNode(""+global));
    ul.appendChild(li);
    togglemodal();
    updateMC(s);
    if (global === "UEM8000") {
      document.getElementById(global).style.display = 'none';
      document.getElementById(global).nextSibling.style.display = "block";
      updateuebadge()
    } else {
      document.getElementById(global).style.display = 'none';
      document.getElementById(global).nextSibling.style.display = "block";
      updatemajbadge()
    }
  }

  function updateMC (s) {
    var ele = document.getElementById(s);
    var str = ele.innerText;
    var val = str.substring(12);
    val = parseInt(val) + 4;
    ele.innerHTML = "<strong>Total MCs : " + val + "</strong>";
  }

  function updateuebadge() {
    var ele = document.getElementById("uebadge");
    ele.innerHTML = "&#x2713;";
    ele.style.backgroundColor = "#545cd8";

    var ueUnitsPlanned = document.getElementById("ueplan");
    var planstr = ueUnitsPlanned.innerText;
    var planval = planstr.substring(15,16);
    planval = parseInt(planval) + 4;
    ueUnitsPlanned.innerHTML = "Units Planned: " + planval + "MCs";

    var ueUnitsNeeded = document.getElementById("ueneed");
    var needstr = ueUnitsNeeded.innerText;
    var needval = needstr.substring(14,15);
    needval = parseInt(needval) - 4;
    ueUnitsNeeded.innerText = "Units Needed: " + needval + "MCs";
  }

  function updatemajbadge() {
    var ele = document.getElementById("majbadge");
    ele.innerHTML = parseInt(ele.innerHTML) - 4;

    var majUnitsPlanned = document.getElementById("majplan");
    var planstr = majUnitsPlanned.innerText;
    var planval = planstr.substring(15,17);
    planval = parseInt(planval) + 4;
    majUnitsPlanned.innerHTML = "Units Planned: " + planval + "MCs";

    var majUnitsNeeded = document.getElementById("majneed");
    var needstr = majUnitsNeeded.innerText;
    var needval = needstr.substring(14,17);
    needval = parseInt(needval) - 4;
    majUnitsNeeded.innerText = "Units Needed: " + needval + "MCs";
  }

  return (
    <Layout>

      <hr style={{ margin: 50, marginTop: 0 }} />

      <Row style={{ marginLeft: 60, marginBottom: 10, height: 70 }}>
        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Academic Year</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>2020/2021 Semester 1</p>
        </Col>

        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Academic Programme</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>Bachelor of Computing</p>
        </Col>

        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Major</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>Computer Science (Hons)</p>
        </Col>
      </Row>

      <Row style={{ marginLeft: 60, marginBottom: 30, height: 100 }}>
        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Career</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>Undergraduate Year 2</p>
        </Col>

        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Enrollment Year</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>AY2019/2020</p>
        </Col>

        <Col md={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#545cd8'}}>
            <h5><strong>Completed MCs</strong></h5>
          </div>
          <p style={{fontSize: '15px'}}>88</p>
        </Col>
      </Row>
      
      <hr style={{ margin: 50, marginTop: 0 }} />

      <p style={{fontSize: '16px', marginLeft: 60}}>Plan Selection</p>
      <UncontrolledDropdown style={{ marginLeft: 60, marginBottom: 50 }} >
        <DropdownToggle caret style={{ width: 500, backgroundColor: 'white', color: "black", textAlign: "left" }} >
          {planName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>My Plans</DropdownItem>
          {plans.map((plan, i) => (
            <DropdownItem onClick={() => handleChangePlan(plan.planName)} key={i}>{plan.planName} </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>

      <div style={{ marginLeft: 60}}>
        <Form>
          <FormGroup>
            <Row>
              <Col sm={8}>
              <p style={{fontSize: '16px'}}>Semesters to Include for CAP Calculation</p>
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
        <p style={{fontSize: '16px'}}><strong>Cumulative CAP</strong></p>
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
          <div style={{ margin: 15}}>
            <Row>
              <Col sm="4">
                <p style={{fontSize: '16px'}}><strong>Modules Taken</strong></p>
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
                <p style={{fontSize: '16px'}}><strong>Modules Left</strong></p>
                <p>You have cleared the university level requirements.</p>
              </Col>
              <Col sm="4">
                <p>Units Required: 20MCs</p>
                <p>Units Taken: 20MCs</p>
                <p>Units Planned: 0MCs</p>
                <p><strong>Units Needed: 0MCs</strong></p>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div style={{ margin: 15}}>
            <Row>
              <Col sm="4">
                <p style={{fontSize: '16px'}}><strong>Modules Taken</strong></p>
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
                <p style={{fontSize: '16px'}}><strong>Modules Left</strong></p>
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
                <p style={{display: "none"}}><strong>UEM8000 has been successfully added!</strong></p>
                <Modal isOpen={modal} toggle={togglemodal} className={className} size="lg" unmountOnClose={false}>
                  <ModalHeader toggle={togglemodal}>Choose Semester</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 1 Sem 1</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>GER1000</li>
                          <li>GEQ1000</li>
                          <li>UEM1000</li>
                          <li>UEM2000</li>
                          <li>CS1010</li>
                          <li>CS1231</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc1"><strong>Total MCs : 24</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add1","mc1")} id="add1">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 2 Sem 1</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>GET1000</li>
                          <li>UEM5000</li>
                          <li>MA1101R</li>
                          <li>CS2100</li>
                          <li>CS2102</li>
                          <li>CS2105</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc2"><strong>Total MCs : 24</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add2", "mc2")} id="add2">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 3 Sem 1</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>UEM6000</li>
                          <li>CS3240</li>
                          <li>CS3203</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc3"><strong>Total MCs : 16</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add3", "mc3")} id="add3">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 4 Sem 1</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc4"><strong>Total MCs : 0</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add4","mc4")} id="add4">Add +</Button>
                        </div>
                      </Col>
                    </Row>
                    <br></br>
                    <hr/>
                    <Row>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 1 Sem 2</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>GES1000</li>
                          <li>GEH1000</li>
                          <li>UEM3000</li>
                          <li>UEM4000</li>
                          <li>CS2030</li>
                          <li>CS2040</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc5"><strong>Total MCs : 24</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add5", "mc5")} id="add5">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                      <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 2 Sem 2</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>MA1521</li>
                          <li>ST2334</li>
                          <li>CS2113</li>
                          <li>CS3230</li>
                          <li>CS2106</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc6"><strong>Total MCs : 20</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add6", "mc6")} id="add6">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 3 Sem 2</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                          <li>UEM7000</li>
                          <li>CS3241</li>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc7"><strong>Total MCs : 8</strong></p>
                        <div style={{textAlign: "center"}}>
                          <Button color="primary" onClick={() => myFunction("add7", "mc7")} id="add7">Add +</Button>
                        </div>
                      </Col>
                      <Col sm="3">
                        <p style={{textAlign: "center", fontSize: '14px'}}><strong>Year 4 Sem 2</strong></p>
                        <ul style={{listStyleType: "square", marginLeft: "20px"}}>
                        </ul>
                        <p style={{textAlign: "center", fontSize: '14px'}} id="mc8"><strong>Total MCs : 0</strong></p>
                        <div style={{textAlign: "center"}}>
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
                <p><strong id="ueneed">Units Needed: 4MCs</strong></p>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div style={{ margin: 15}}>
            <Row>
              <Col sm="4">
                <p style={{fontSize: '16px'}}><strong>Modules Taken</strong></p>
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
                <p style={{fontSize: '16px'}}><strong>Modules Left</strong></p>
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
                  <span style={{display: "none"}}><strong>IS1103 has been successfully added!</strong></span>
                </p>
                <p>
                  <a href="#/" onClick={() => addMod("ES2660")} id="ES2660">Add ES2660 to your academic plan</a>
                  <span style={{display: "none"}}><strong>ES2660 has been successfully added!</strong></span>
                </p>
                <p>
                  <a href="#/" onClick={() => addMod("CP3209")} id="CP3209">Add CP3209 to your academic plan</a>
                  <span style={{display: "none"}}><strong>CP3209 has been successfully added!</strong></span>
                </p>
              </Col>
              <Col sm="4">
                <p>Units Required: 108MCs</p>
                <p>Units Taken: 52MCs</p>
                <p id="majplan">Units Planned: 16MCs</p>
                <p><strong id="majneed">Units Needed: 40MCs</strong></p>
              </Col>
            </Row>
          </div>
        </TabPane>
      </TabContent>
    </div>
    </Layout>
  )
}

