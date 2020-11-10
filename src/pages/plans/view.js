import React, { Component } from "react"
import Layout from "../../components/layout"
import { Semester } from "../../components/Semester";
import { PlanToTake } from "../../components/PlanToTake";
import { Row, Col, Input, Button } from "reactstrap";

import { connect, Provider } from "react-redux";
import store from '../../state/createStore';

import { DragDropContext } from 'react-beautiful-dnd';

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editPlanDescription: false,
      editPlanName: false,
      activePlan: (typeof window !== `undefined`) ? this.props.plans[window.location.href.split('#')[window.location.href.split('#').length - 1]] : this.props.plans[0]
    }
    this.onAddModule = this.props.onAddModule.bind(this)
    this.onChangeSemesterName = this.props.onChangeSemesterName.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (typeof window !== `undefined`) {
    this.setState({ activePlan: nextProps.plans[window.location.href.split('#')[window.location.href.split('#').length - 1]] });
    } else {
      this.setState({ activePlan: nextProps.plans[0] });
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

  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) { // Destination of the drop is not in a droppable
      return;
    }

    // Destination and source droppables are the same, index/position is also the same.
    // i.e. User dropped the item back into the position that it started 
    // droppableId is set to semester name for now, each semester should probably have an id in dummy data to prevent issues when semesters have the same names
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    this.props.onChangeModulePosition(source.droppableId, source.index, destination.droppableId, destination.index, this.state.activePlan.planName);
  }

  render() {
    return (
      <Layout>
        <Provider store={store()}>

          <Input
            type="select"
            name="text"
            id="planselection"
            defaultValue={this.state.activePlan.planName}
            onChange={(e) => { this.handleChangePlan(document.getElementById("planselection").value) }}
            style={{ marginLeft: 60, marginBottom: 50, width: 500, marginTop: 50 }}
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
                {this.state.editPlanName && <Button color="link" onClick={() => {
                  this.setState({ editPlanName: false })
                  this.props.onChangePlanName(this.state.activePlan.planName, document.getElementById("name").value)
                }}>done</Button>}
              </div>
              {!this.state.editPlanName && this.state.activePlan && <p>{this.state.activePlan.planName}</p>}
              {this.state.editPlanName &&
                <Input
                  type="textarea"
                  name="text"
                  id="name"
                  defaultValue={this.state.activePlan.planName}
                  rows={2}
                />}
            </Col>

            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5>Description</h5>
                {!this.state.editPlanDescription && <Button color="link" onClick={() => this.setState({ editPlanDescription: true })}>edit</Button>}
                {this.state.editPlanDescription && <Button color="link" onClick={() => {
                  this.setState({ editPlanDescription: false })
                  this.props.onChangePlanDescription(this.state.activePlan.planName, document.getElementById("description").value)
                }}>done</Button>}
              </div>
              {!this.state.editPlanDescription && this.state.activePlan && <p>{this.state.activePlan.planDescription}</p>}
              {this.state.editPlanDescription && <Input
                type="textarea"
                name="text"
                id="description"
                defaultValue={this.state.activePlan.planDescription}
                rows={3}
              />}
            </Col>
          </Row>

          <h1 style={{ marginLeft: 40 }}>All Years</h1>

          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.activePlan.years.map((year, i) => (
              <div style={{ border: '1px solid #ced4da', borderRadius: 5, margin: 30 }}>
                <h3 style={{ margin: 20, marginBottom: 0 }}>{year.yearName}</h3>

                <Row>
                  {this.state.activePlan && year.semesters.map((semester, i) => (
                    <Col md={6} key={i}>
                      <div style={{ margin: 20 }} >
                        <Semester semester={semester} yearName={year.yearName} planName={this.state.activePlan.planName} onAddModule={this.onAddModule} onChangeSemesterName={this.onChangeSemesterName} />
                      </div>
                    </Col>
                  ))}
                  <Col md={6}>
                    <div style={{ margin: 20, flex: 1 }}>
                      <Button style={{ width: '100%' }} color="info" onClick={() =>
                        this.props.onAddSemester(this.state.activePlan.planName, year.yearName)
                      }>Add Semester</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </DragDropContext>

          <div style={{ margin: 20, flex: 1 }}>
            <Button style={{ width: '100%' }} color="info" onClick={() => {
              this.props.onAddYear(this.state.activePlan.planName)
            }}>Add Year</Button>
          </div>

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

function mapDispatch(dispatch) {
  return {
    onChangePlanName: (planName, newName) => dispatch({ type: 'changePlanName', payload: { 'planName': planName, 'newName': newName } }),
    onChangePlanDescription: (planName, newDescription) => dispatch({ type: 'changePlanDescription', payload: { 'planName': planName, 'newDescription': newDescription } }),
    onChangeSemesterName: (planName, yearName, semesterName, newName) => dispatch({ type: 'changeSemesterName', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'newName': newName } }),
    onAddModule: (planName, yearName, semesterName) => dispatch({ type: 'addModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName } }),
    onAddSemester: (planName, yearName) => dispatch({ type: 'addSemester', payload: { 'planName': planName, 'yearName': yearName } }),
    onAddYear: (planName) => dispatch({ type: 'addYear', payload: { 'planName': planName } }),
    onChangeModulePosition: (sourceSemester, sourceModuleIndex, destinationSemester, destinationModuleIndex, planName) =>
      dispatch({ type: 'changeModulePosition', payload: { 'sourceSemester': sourceSemester, 'sourceModuleIndex': sourceModuleIndex, 'destinationSemester': destinationSemester, 'destinationModuleIndex': destinationModuleIndex, 'planName': planName } })
  }
}

export default connect(mapState, mapDispatch)(View)