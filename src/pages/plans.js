import React, { Component } from "react"
import Layout from "../components/layout"
import { Card, Row, Col } from "reactstrap"
import { Router } from "@reach/router"

import PlanCard from '../components/PlanCard'

import { connect, Provider } from "react-redux";
import store from '../state/createStore';

class Plans extends Component {

  constructor(props) {
    super(props)
  }

  getCurrentPlan() {
    var currentPlan = null
    this.props.plans.forEach(function (plan, index) {
      if (plan.current) {
        currentPlan = plan
      }
    })
    return currentPlan
  }

  getOtherPlans() {
    var otherPlans = []
    this.props.plans.forEach(function (plan, index) {
      if (!plan.current) {
        otherPlans.push(plan)
      }
    })
    return otherPlans
  }

  getIndexOfPlan(planToCheck) {
    var indexOfPlan = null
    this.props.plans.forEach(function (plan, index) {
      if (plan == planToCheck) {
        indexOfPlan = index
      }
    })
    return indexOfPlan
  }

  render() {
    return (
      <Router basepath="/plans">
        <Layout path="">
          <Provider store={store()}>
            <h4>Plans</h4>
            <hr></hr>

            <h5>Current Plan</h5>
            <PlanCard plan={this.getCurrentPlan()} index={this.getIndexOfPlan(this.getCurrentPlan())} />

            <h5>Other Plans</h5>
            {this.getOtherPlans().map((plan, i) => (
              <PlanCard plan={plan} index={this.getIndexOfPlan(plan)} />
            ))}

            <div class="plans_container" onClick={(e => {
              this.props.addPlan();
              e.preventDefault();
            })}>
              <a href="#">

                <div class="plans_text">+</div>
                <div class="plans_overlay">
                  <div class="plans_text">+</div>
                </div>
              </a>
            </div>

          </Provider>
        </Layout>
      </Router>
    )
  }
}


function mapState(state) {
  return { plans: state.plans }
}

function mapDispatch(dispatch) {
  return {
    addPlan: () => dispatch({ type: 'addPlan' })
  }
}

export default connect(mapState, mapDispatch)(Plans)