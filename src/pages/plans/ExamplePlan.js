import React, { Component } from "react"
import Layout from "../../components/layout"
import { Semester } from "../../components/Semester";
import { PlanToTake } from "../../components/PlanToTake";
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Input, Button } from "reactstrap";

import { connect, Provider } from "react-redux";
import store from '../../state/createStore';

class ExamplePlan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editPlanDescription: false,
      editPlanName: false,
      activePlan: this.props.plans[0]
    }
  }

  getNamesFromPlans() {
    var names = []
    this.props.plans.forEach(function (plan, index) {
      names.push(plan.planName)
    })
    return names
  }

  handleChangePlan(planName) {
    var newActivePlan = null

    this.props.plans.forEach(function (plan, index) {
      if (plan.planName == planName) {
        newActivePlan = plan
      }
    }
    )
    this.setState({ activePlan: newActivePlan });
  }

  addSemester() {

  }

  render() {
    return (
      <Layout>
        <Provider store={store()}>
          <Input
            type="select"
            name="text"
            id="planselection"
            defaultValue={this.getNamesFromPlans[0]}
            onChange={(e) => { this.handleChangePlan(document.getElementById("planselection").value) }}
          >
            {this.props.plans.map((plan, i) => (
              <option key={i}>{plan.planName} </option>
            ))}
          </Input>


          <Row style={{ marginLeft: 60, marginBottom: 30, height: 100 }}>
            <Col md={3}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Name</h5>
                {!this.state.editPlanName && <Button color="link" onClick={() => this.setState({ editPlanName: true })}>edit</Button>}
                {this.state.editPlanName && <Button color="link" onClick={() => this.setState({ editPlanName: false })}>done</Button>}
              </div>
              {!this.state.editPlanName && this.state.activePlan && <p>{this.state.activePlan.planName}</p>}
              {this.state.editPlanName && <Input
                type="textarea"
                name="text"
                id="exampleText"
                value={this.state.activePlan.planName}
                onSubmit={this.props.onChangePlanName}
                rows={2}
              />}
            </Col>

            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Description</h5>
                {!this.state.editPlanDescription && <Button color="link" onClick={() => this.setState({ editPlanDescription: true })}>edit</Button>}
                {this.state.editPlanDescription && <Button color="link" onClick={() => this.setState({ editPlanDescription: false })}>done</Button>}
              </div>
              {!this.state.editPlanDescription && this.state.activePlan && <p>{this.state.activePlan.planDescription}</p>}
              {this.state.editPlanDescription && <Input
                type="textarea"
                name="text"
                id="exampleText"
                value={this.state.activePlan.planDescription}
                onChange={this.props.onChangePlanDescription}
                rows={3}
              />}
            </Col>
          </Row>

          <h3 style={{ marginLeft: 50 }}>Semesters</h3>

          <Row style={{ margin: 30, marginTop: 0 }}>
            {this.state.activePlan && this.state.activePlan.years[0].semesters.map((semester, i) => ( // THIS IS ONLY SHOWING THE SEMESTERS FOR THE FIRST YEAR, MUST USE FOREACH YEAR TO SHOW SEMESTERS FOR ALL YEARS
              <Col md={6} key={i}>
                <div style={{ margin: 20 }} >
                  <Semester semester={semester} />
                </div>
              </Col>
            ))}
            <Col md={6}>
              <div style={{ margin: 20, flex: 1 }}>
                <Button style={{ width: '100%' }} color="info" onClick={() => this.addSemester()}>Add Semester</Button>
              </div>
            </Col>
          </Row>

          <h3 style={{ marginLeft: 50 }}>Plan to take</h3>
          <Row style={{ margin: 30, marginTop: 0 }}>
            <Col md={6} style={{ margin: 20 }}>
              {this.state.activePlan && <PlanToTake planToTakeModules={this.state.activePlan.planToTakeModules} />}
            </Col>
          </Row>

          <hr style={{ margin: 50, marginBottom: 100 }} />
        </Provider>
      </Layout>
    )
  }
}

function mapState(state) {
  return { plans: state.plans }
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    onChangePlanName: (planName, newName) => dispatch ({type: 'changePlanName', payload: { 'planName': planName, 'newName': newName }}),
    onChangePlanDescription: (planName, newDescription) => dispatch ({type: 'changePlanName', payload: { 'planName': planName, 'newDescription': newDescription }})
  }
}

// Connect them:
export default connect(mapState, mapDispatch)(ExamplePlan)