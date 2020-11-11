import React, { Component } from "react"
import Layout from "../../components/layout"
import { Year } from "../../components/Year";
import { Module } from "../../components/Module";
import { Row, Col, Input, Button, Card } from "reactstrap";

import { connect, Provider } from "react-redux";
import store from '../../state/createStore';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

import Select from "react-select";
import makeAnimated from 'react-select/animated';

class View extends Component {

  animatedComponents = makeAnimated();
  dummyTags = [
    'Computer Science',
    'FASS',
    'BIZ',
    'AI',
    'Engineering',
    'Student Exchange Programme',
    'Computing',
    'University Scholars Programme',
    'Economics',
    'SDE',
    'Science',
  ]

  formatTagsToSelectOptions(tags) {
    let selectOptions = [];
    for (let tag of tags) {
      selectOptions.push({ value: tag, label: tag });
    }
    return selectOptions;
  }

  constructor(props) {
    super(props);
    this.state = {
      editPlanDescription: false,
      editPlanName: false,
      activePlan: (typeof window !== `undefined`) ? this.props.plans[window.location.href.split('#')[window.location.href.split('#').length - 1]] : this.props.plans[0]
    }
    this.onAddModule = this.props.onAddModule.bind(this);
    this.onAddSemester = this.props.onAddSemester.bind(this);
    this.onChangeSemesterName = this.props.onChangeSemesterName.bind(this);
    this.onChangeYearName = this.props.onChangeYearName.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDeleteSemester = this.props.onDeleteSemester.bind(this);
    this.onDeleteModule = this.props.onDeleteModule.bind(this);
    this.onDeleteYear = this.props.onDeleteYear.bind(this);
    this.onReplaceModule = this.props.onReplaceModule.bind(this);
    this.onChangeGrade = this.props.onChangeGrade.bind(this);
    this.onDeletePlanToTakeModule = this.props.onDeletePlanToTakeModule.bind(this);
    this.onReplacePlanToTakeModule = this.props.onReplacePlanToTakeModule.bind(this);
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
      if (plan.planName === planName) {
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
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    this.props.onChangeModulePosition(source.droppableId, source.index, destination.droppableId, destination.index, this.state.activePlan.planName);
  }

  onChangeTags(selectOptions) {
    let tags = [];
    if (selectOptions) {
      for (let selectOption of selectOptions) {
        tags.push(selectOption.value);
      }
    }

    this.props.onChangeTags(this.state.activePlan.planName, tags)

  }

  render() {
    return (
      <Layout>
        <Provider store={store()}>

          <div style={{ display: 'flex', margin: 50, marginLeft: 60, alignItems: 'center', justifyContent: 'space-between' }}>
            <Input
              type="select"
              name="text"
              id="planselection"
              defaultValue={this.state.activePlan.planName}
              onChange={(e) => { this.handleChangePlan(document.getElementById("planselection").value) }}
              style={{ width: 500 }}
            >
              {this.props.plans.map((plan, i) => (
                <option key={i}>{plan.planName} </option>
              ))}
            </Input>

            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <h5 style={{ margin: 0, marginRight: 5 }}>Current Plan</h5>
                <Toggle
                  defaultChecked={this.state.activePlan.current}
                  onChange={() => this.props.onChangeCurrentPlan(this.state.activePlan.planName)} />
              </div>

              <div style={{ display: 'flex', marginLeft: 20 }}>
                <h5 style={{ margin: 0, marginRight: 5 }}>Public Plan</h5>
                <Toggle
                  defaultChecked={this.state.activePlan.public}
                  onChange={() => this.props.onChangePublicPlan(this.state.activePlan.planName)} />
              </div>
            </div>
          </div>

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

          <Row style={{ marginLeft: 60, marginBottom: 50 }}>
            <Col md={4}>
              <h5>Tags</h5>
              <Select
                defaultValue={this.formatTagsToSelectOptions(this.state.activePlan.tags)}
                onChange={(selectObjects) => this.onChangeTags(selectObjects)}
                options={this.formatTagsToSelectOptions(this.dummyTags)}
                isMulti={true}
                components={this.animatedComponents}
              />
            </Col>
          </Row>

          <h1 style={{ marginLeft: 40 }}>All Years</h1>

          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.activePlan.years.map((year, i) => (
              <Year
                semesters={year.semesters}
                yearName={year.yearName}
                planName={this.state.activePlan.planName}
                onAddModule={this.onAddModule}
                onAddSemester={this.onAddSemester}
                onChangeSemesterName={this.onChangeSemesterName}
                onChangeYearName={this.onChangeYearName}
                onDeleteSemester={this.onDeleteSemester}
                onDeleteModule={this.onDeleteModule}
                onDeleteYear={this.onDeleteYear}
                onReplaceModule={this.onReplaceModule}
                onChangeGrade={this.onChangeGrade}
              />
            ))}


            <div style={{ margin: 20, flex: 1 }}>
              <Button style={{ width: '100%' }} color="info" onClick={() => {
                this.props.onAddYear(this.state.activePlan.planName)
              }}>Add Year</Button>
            </div>

            <hr style={{ margin: 50, marginTop: 80 }} />

            <h3 style={{ marginLeft: 50 }}>Plan to take</h3>
            <Row style={{ margin: 30, marginTop: 0 }}>
              <Col md={6} style={{ margin: 20 }}>
                {/* {this.state.activePlan && <PlanToTake planToTakeModules={this.state.activePlan.planToTakeModules} />} */}
                <Card style={{ padding: 30, borderWidth: '1px' }}>
                  <Droppable droppableId={`<>` + 'planToTake'}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {this.state.activePlan.planToTakeModules.map((module, i) => (
                          <Module
                            module={module}
                            key={Math.random()}
                            index={i}
                            planName={this.state.activePlan.planName}
                            onDeletePlanToTakeModule={this.props.onDeletePlanToTakeModule}
                            onReplacePlanToTakeModule={this.props.onReplacePlanToTakeModule}
                            isPlanToTakeModule={true}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <Button style={{ margin: 5, backgroundColor: 'rgb(237, 241, 247)', borderColor: 'white', color: "black" }} color='info' onClick={() => {
                    this.props.onAddPlanToTakeModule(this.state.activePlan.planName)
                  }}>Add module</Button>
                </Card>
              </Col>
            </Row>
          </DragDropContext>

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
    onChangeYearName: (planName, yearName, newName) => dispatch({ type: 'changeYearName', payload: { 'planName': planName, 'yearName': yearName, 'newName': newName } }),
    onChangeSemesterName: (planName, yearName, semesterName, newName) => dispatch({ type: 'changeSemesterName', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'newName': newName } }),
    onAddModule: (planName, yearName, semesterName) => dispatch({ type: 'addModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName } }),
    onAddSemester: (planName, yearName) => dispatch({ type: 'addSemester', payload: { 'planName': planName, 'yearName': yearName } }),
    onAddYear: (planName) => dispatch({ type: 'addYear', payload: { 'planName': planName } }),
    onChangeModulePosition: (sourceSemester, sourceModuleIndex, destinationSemester, destinationModuleIndex, planName) =>
      dispatch({ type: 'changeModulePosition', payload: { 'sourceSemester': sourceSemester, 'sourceModuleIndex': sourceModuleIndex, 'destinationSemester': destinationSemester, 'destinationModuleIndex': destinationModuleIndex, 'planName': planName } }),
    onChangeCurrentPlan: (planName) => dispatch({ type: 'changeCurrentPlan', payload: { 'planName': planName } }),
    onChangePublicPlan: (planName) => dispatch({ type: 'changePublicPlan', payload: { 'planName': planName } }),
    onChangeTags: (planName, tagsArray) => dispatch({ type: 'changeTags', payload: { 'planName': planName, 'tagsArray': tagsArray } }),
    onDeleteModule: (planName, yearName, semesterName, moduleName) => dispatch({ type: 'deleteModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'moduleName': moduleName } }),
    onDeleteSemester: (planName, yearName, semesterName) => dispatch({ type: 'deleteSemester', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName } }),
    onDeleteYear: (planName, yearName) => dispatch({ type: 'deleteYear', payload: { 'planName': planName, 'yearName': yearName } }),
    onReplaceModule: (planName, yearName, semesterName, nameOfPreviousModule, nameOfNewModule) => dispatch({ type: 'replaceModule', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'nameOfPreviousModule': nameOfPreviousModule, 'nameOfNewModule': nameOfNewModule } }),
    onChangeGrade: (planName, yearName, semesterName, moduleName, newGrade) => dispatch({ type: 'changeGrade', payload: { 'planName': planName, 'yearName': yearName, 'semesterName': semesterName, 'moduleName': moduleName, 'newGrade': newGrade } }),
    onDeletePlanToTakeModule: (planName, moduleName) => dispatch({ type: 'deletePlanToTakeModule', payload: { 'planName': planName, 'moduleName': moduleName } }),
    onReplacePlanToTakeModule: (planName, nameOfPreviousModule, nameOfNewModule) => dispatch({ type: 'replacePlanToTakeModule', payload: { 'planName': planName, 'nameOfPreviousModule': nameOfPreviousModule, 'nameOfNewModule': nameOfNewModule } }),
    onAddPlanToTakeModule: (planName) => dispatch({ type: 'addPlanToTakeModule', payload: { 'planName': planName } }),
  }
}

export default connect(mapState, mapDispatch)(View)