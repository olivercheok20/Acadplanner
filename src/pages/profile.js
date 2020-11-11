import React, { Component, useState } from "react"

import { Form, Row, Input, Button } from "reactstrap";
import Layout from "../components/layout"

import { connect, Provider } from "react-redux";
import store from '../state/createStore';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      editBio: false,
      editProgramme: false,
      editMajor: false,
      editYear: false
    }
  }

  render() {
    return (
      <Layout>
        <Provider store={store()}>
          <h4>Profile</h4>

          <hr></hr>

          <div class="profilecontainer">
            <a href="#">
              <img src={require('../assets/profile-picture.jpg')} alt="Avatar" class="profileimage" />
              <div class="profileoverlay">
                <div class="profiletext">+</div>
              </div>
            </a>
          </div>

          <div style={{ width: '500px', margin: 'auto' }}>

            {/* NAME */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>Name</h5>

              {!this.state.editName && <Button color="link" onClick={() => this.setState({ editName: true })}>edit</Button>}
              {this.state.editName && <Button color="link" onClick={() => {
                this.setState({ editName: false })
                this.props.onChangeName(document.getElementById("name").value)
              }
              }>done</Button>}
            </div>
            {!this.state.editName && <p>{this.props.profile.name}</p>}
            {this.state.editName &&
              <Form onSubmit={(e) => {
                this.props.onChangeName(document.getElementById("name").value)
                this.setState({ editName: false })
                e.preventDefault()
              }
              }>
                <Input
                  type="text"
                  name="text"
                  id="name"
                  defaultValue={this.props.profile.name}
                // onChange={() => this.props.onChangeName(document.getElementById("name").value)}
                />
              </Form>
            }
            <br />

            {/* BIO */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>Bio</h5>

              {!this.state.editBio && <Button color="link" onClick={() => this.setState({ editBio: true })}>edit</Button>}
              {this.state.editBio && <Button color="link" onClick={() => {
                this.setState({ editBio: false })
                this.props.onChangeBio(document.getElementById("bio").value)
              }
              }>done</Button>}
            </div>
            {!this.state.editBio && <p>{this.props.profile.bio}</p>}
            {this.state.editBio &&
              <Form onSubmit={(e) => {
                this.props.onChangeBio(document.getElementById("bio").value)
                this.setState({ editBio: false })
                e.preventDefault()
              }
              }>
                <Input
                  type="text"
                  name="text"
                  id="bio"
                  defaultValue={this.props.profile.bio}
                />
              </Form>
            }
            <br />

            {/* PROGRAMME */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>Programme</h5>

              {!this.state.editProgramme && <Button color="link" onClick={() => this.setState({ editProgramme: true })}>edit</Button>}
              {this.state.editProgramme && <Button color="link" onClick={() => {
                this.setState({ editProgramme: false })
                this.props.onChangeProgramme(document.getElementById("programme").value)
              }
              }>done</Button>}
            </div>
            {!this.state.editProgramme && <p>{this.props.profile.programme}</p>}
            {this.state.editProgramme &&
              <Form onSubmit={(e) => {
                this.props.onChangeProgramme(document.getElementById("programme").value)
                this.setState({ editProgramme: false })
                e.preventDefault()
              }
              }>
                <Input
                  type="select"
                  name="text"
                  id="programme"
                  defaultValue={this.props.profile.programme}
                >
                  <option>Bachelor of Computing</option>
                  <option>Bachelor of Business</option>
                  <option>Bachelor of Science</option>
                </Input>
              </Form>
            }
            <br />

            {/* MAJOR */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>Major</h5>

              {!this.state.editMajor && <Button color="link" onClick={() => this.setState({ editMajor: true })}>edit</Button>}
              {this.state.editMajor && <Button color="link" onClick={() => {
                this.setState({ editMajor: false })
                this.props.onChangeMajor(document.getElementById("major").value)
              }
              }>done</Button>}
            </div>
            {!this.state.editMajor && <p>{this.props.profile.major}</p>}
            {this.state.editMajor &&
              <Form onSubmit={(e) => {
                this.props.onChangeMajor(document.getElementById("major").value)
                this.setState({ editMajor: false })
                e.preventDefault()
              }
              }>
                <Input
                  type="select"
                  name="text"
                  id="major"
                  defaultValue={this.props.profile.major}
                >
                  <option>Computer Science (Hons)</option>
                  <option>Business Analytics (Hons)</option>
                  <option>Information Systems (Hons)</option>
                  <option>Information Security (Hons)</option>
                </Input>
              </Form>
            }
            <br />


            {/* YEAR */}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h5>Matriculation Year</h5>

              {!this.state.editYear && <Button color="link" onClick={() => this.setState({ editYear: true })}>edit</Button>}
              {this.state.editYear && <Button color="link" onClick={() => {
                this.setState({ editYear: false })
                this.props.onChangeYear(document.getElementById("year").value)
              }
              }>done</Button>}
            </div>
            {!this.state.editYear && <p>{this.props.profile.year}</p>}
            {this.state.editYear &&
              <Form onSubmit={(e) => {
                this.props.onChangeYear(document.getElementById("year").value)
                this.setState({ editYear: false })
                e.preventDefault()
              }
              }>
                <Input
                  type="select"
                  name="text"
                  id="year"
                  defaultValue={this.props.profile.year}
                >
                  <option>AY 15/16</option>
                  <option>AY 16/17</option>
                  <option>AY 17/18</option>
                  <option>AY 18/19</option>
                  <option>AY 19/20</option>
                  <option>AY 20/21</option>
                </Input>
              </Form>
            }
            <br />

          </div>
        </Provider>
      </Layout>
    )
  }



}

function mapState(state) {
  return { profile: state.profile }
}

function mapDispatch(dispatch) {
  return {
    onChangeName: (name) => dispatch({ type: 'changeName', payload: { 'name': name } }),
    onChangeBio: (bio) => dispatch({ type: 'changeBio', payload: { 'bio': bio } }),
    onChangeProgramme: (programme) => dispatch({ type: 'changeProgramme', payload: { 'programme': programme } }),
    onChangeMajor: (major) => dispatch({ type: 'changeMajor', payload: { 'major': major } }),
    onChangeYear: (year) => dispatch({ type: 'changeYear', payload: { 'year': year } }),

  }
}

export default connect(mapState, mapDispatch)(Profile)
