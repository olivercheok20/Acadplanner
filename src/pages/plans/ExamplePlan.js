import React, { useState, useEffect } from "react"
import Layout from "../../components/layout"
import { Semester } from "../../components/Semester";
import { PlanToTake } from "../../components/PlanToTake";
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Input, Button } from "reactstrap";

export default function ExamplePlan() {

  const [user, setUser] = useState({});
  const [plans, setPlans] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [planToTakeModules, setPlanToTakeModules] = useState([]);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [editPlanName, setEditPlanName] = useState(false);
  const [editPlanDescription, setEditPlanDescription] = useState(false);

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
    setSemesters(retrievedUser1.plans[0].semesters);
    setPlanToTakeModules(retrievedUser1.plans[0].planToTakeModules);
    setPlanName(retrievedUser1.plans[0].planName);
    setPlanDescription(retrievedUser1.plans[0].planDescription);
  }, [])

  // const addPlan = () => {
  //   setPlans([...plans,
  //   {
  //     planName: 'Plan ' + plans.length,
  //     planDescription: 'New plan description',
  //     semesters: [{ semesterName: 'New semester', modules: [{ name: '', modularCredits: '', grade: '' }] }],
  //     planToTakeModules: [{ name: '', modularCredits: '', }]
  //   }
  //   ]);
  // }

  const onChangePlanName = e => {
    setPlanName(e.target.value);
  }

  const onChangePlanDescription = e => {
    setPlanDescription(e.target.value);
  }

  const addSemester = () => {
    setSemesters([...semesters, { semesterName: 'New semester', modules: [{ name: '', modularCredits: '', grade: '' }] }]);
  }

  const handleChangePlan = (planName) => {
    // let selectedPlan = plans.filter(plan => plan.planName == planName)[0];
    // console.log('before: ' + semesters[0].modules[0].name);
    // console.log('to change to: ' + selectedPlan.semesters[0].modules[0].name)
    // setSemesters(selectedPlan.semesters);
    // setPlanToTakeModules(selectedPlan.planToTakeModules);
    // setPlanName(selectedPlan.planName);
    // setPlanDescription(selectedPlan.planDescription);
  }

  return (
    <Layout>

      <UncontrolledDropdown style={{ marginLeft: 60, marginBottom: 50 }} >
        <DropdownToggle caret style={{ width: 500, backgroundColor: 'white', color: "black", textAlign: "left" }} >
          {planName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>My Plans</DropdownItem>
          {plans.map((plan, i) => (
            <DropdownItem onClick={() => handleChangePlan(plan.planName)} key={i}>{plan.planName} </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>Add new plan</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      <Row style={{ marginLeft: 60, marginBottom: 30, height: 100 }}>
        <Col md={3}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h5>Name</h5>
            {!editPlanName && <Button color="link" onClick={() => setEditPlanName(true)}>edit</Button>}
            {editPlanName && <Button color="link" onClick={() => setEditPlanName(false)}>done</Button>}
          </div>
          {!editPlanName && <p>{planName}</p>}
          {editPlanName && <Input
            type="textarea"
            name="text"
            id="exampleText"
            value={planName}
            onChange={onChangePlanName}
            rows={2}
          />}
        </Col>

        <Col md={5}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h5>Description</h5>
            {!editPlanDescription && <Button color="link" onClick={() => setEditPlanDescription(true)}>edit</Button>}
            {editPlanDescription && <Button color="link" onClick={() => setEditPlanDescription(false)}>done</Button>}
          </div>
          {!editPlanDescription && <p>{planDescription}</p>}
          {editPlanDescription && <Input
            type="textarea"
            name="text"
            id="exampleText"
            value={planDescription}
            onChange={onChangePlanDescription}
            rows={3}
          />}
        </Col>
      </Row>

      <h3 style={{ marginLeft: 50 }}>Semesters</h3>

      <Row style={{ margin: 30, marginTop: 0 }}>
        {semesters.map((semester, i) => (
          <Col md={6} key={i}>
            <div style={{ margin: 20 }} >
              <Semester semester={semester} />
            </div>
          </Col>
        ))}
        <Col md={6}>
          <div style={{ margin: 20, flex: 1 }}>
            <Button style={{ width: '100%' }} color="info" onClick={() => addSemester()}>Add Semester</Button>
          </div>
        </Col>
      </Row>

      <h3 style={{ marginLeft: 50 }}>Plan to take</h3>
      <Row style={{ margin: 30, marginTop: 0 }}>
        <Col md={6} style={{ margin: 20 }}>
          <PlanToTake planToTakeModules={planToTakeModules} />
        </Col>
      </Row>

      <hr style={{ margin: 50, marginBottom: 100 }} />
    </Layout>
  )
}
