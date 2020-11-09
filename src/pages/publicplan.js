import React, { useState, useRef } from "react"

import { data } from "../components/data"
import Layout from "../components/layout"
import Comment from "../components/Comment"

import "../components/publicplan.css"

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  FormGroup,
  Form,
  Input,
} from "reactstrap"

export default function PublicPlan() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const plan = data[id]

  /* for like button */
  const [like, setLike] = useState(false)
  const toggleLike = e => {
    setLike(!like)
    if (like) {
      plan.numLikes -= 1
    } else {
      plan.numLikes += 1
    }
  }

  /* for 'share plan' modal */
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
    if (!modal) {
      // if closing the nested modal, reset buttons to default
      setDownloaded("Download as PNG")
      setCopyLink("Copy Link")
    }
  }

  /* for buttons in 'share plan' modal */
  const [downloadButtonText, setDownloaded] = useState("Download as PNG")
  const [copyLinkButtonText, setCopyLink] = useState("Copy Link")

  const handleClickDownload = e => {
    e.target.style.backgroundColor = "#3ac47d" // success colour
    e.target.style.borderColor = "#3ac47d"

    setDownloaded("PNG Downloaded!")
  }

  const handleClickCopyLink = e => {
    e.target.style.backgroundColor = "#3ac47d" // success colour
    e.target.style.borderColor = "#3ac47d"

    setCopyLink("Link Copied!")
  }

  /* for import plan modal */
  const [importModal, setImportModal] = useState(false)
  // const importModalRef = useRef(importModal)
  // importModalRef.current = importModal

  const toggleImportModal = () => setImportModal(!importModal)

  /* for comments section */
  const [comments, setComments] = useState(plan.comments)

  const [textAreaInput, setTextAreaInput] = useState("")

  const handleTextAreaChange = e => setTextAreaInput(e.target.value)

  const handlePostComment = () => {
    // add new comment only if text area input is not empty
    if (textAreaInput !== "") {
      // create new comment object
      const date = new Date()
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      const dateString =
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getFullYear()
      const newComment = {
        username: "Me",
        date: dateString,
        content: textAreaInput,
        numLikes: 0,
      }

      // add new comment to the plan and update state
      setComments(comments.concat([newComment]))

      // reset the input
      setTextAreaInput("")
    }
  }

  return (
    <Layout>
      <Container className="p-3">
        <h3>{plan.title}</h3>
        <hr />
        <Col className="px-0">
          <div className="plan-details">
            <Col className="px-0">
              <div className="plan-subtitle">
                <p className="mr-2 ml-0">{plan.date}</p>
                <Row
                  className={like ? "btn-like-liked" : "btn-like-default"}
                  onClick={e => toggleLike(e)}
                >
                  <i className="pe-7s-like2 pe-lg pe-fw icon"></i>
                  <p className="my-0">{plan.numLikes}</p>
                </Row>
                <i class="pe-7s-comment pe-lg pe-fw icon"></i>
                <p className="my-0">{plan.numComments}</p>
                <div className="user-info">
                  <span>·</span>Made by
                  {/* <i className="pe-7s-user pe-2x pe-va pe-fw px-2 "></i> */}
                  <Button color="link" className="username-link">
                    {plan.username}
                  </Button>
                </div>
              </div>
              <p className="text-justify">{plan.desc}</p>
            </Col>
          </div>
        </Col>
        <Row className="action-btns-row">
          <Button color="primary" onClick={toggleImportModal}>
            Import
          </Button>
          <Modal
            isOpen={importModal}
            toggle={toggleImportModal}
            fade="false"
            size="sm"
          >
            <ModalHeader
              isOpen={importModal}
              toggle={toggleImportModal}
              tag="h6"
              style={{ borderRadius: "5px" }}
              className="d-flex align-items-center justify-content-center"
            >
              Added <b>{plan.title}</b> to your plans!
            </ModalHeader>
          </Modal>
          <Button outline color="secondary" onClick={toggleModal}>
            Share Plan
          </Button>
          <Button outline color="secondary">
            Compare with One of My Plans
          </Button>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Share Plan</ModalHeader>
            <ModalBody>
              <Col className="justify-content-center">
                <h4>Choose how to share this plan</h4>
                <Row>
                  <Col className="justify-content-center">
                    <Button
                      color="primary"
                      onClick={e => handleClickDownload(e)}
                    >
                      {downloadButtonText}
                    </Button>{" "}
                    <p>Download the plan as an image to share with others.</p>
                  </Col>
                  <Col className="justify-content-center align-items-center">
                    <Button
                      color="primary"
                      onClick={e => handleClickCopyLink(e)}
                    >
                      {copyLinkButtonText}
                    </Button>{" "}
                    <p>Share the link to the plan with others.</p>
                  </Col>
                </Row>
              </Col>
            </ModalBody>
          </Modal>
        </Row>
        <br />
        <div>this is where the plan would go</div>
        <br />
        <hr />
        <section style={{ width: "60%" }}>
          <h5>Comments</h5>
          <br />
          {comments.map(comment => {
            return <Comment {...comment}></Comment>
          })}
          <Form>
            <FormGroup>
              <Input
                onChange={e => handleTextAreaChange(e)}
                type="textarea"
                name="text"
                value={textAreaInput}
                placeholder="Write your comment here..."
                className="text-area"
              />
            </FormGroup>
            <Button color="primary" onClick={handlePostComment}>
              Post Comment
            </Button>
          </Form>
        </section>
        <br />
        <br />
      </Container>
    </Layout>
  )
}
