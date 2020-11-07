import React, { useState, useRef } from "react"

import { data } from "./search/data"
import Layout from "../components/layout"
import Comment from "./search/Comment"

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
  Label,
  Input,
} from "reactstrap"

export default function PublicPlan() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const plan = data[id]

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
  const [comments, setComments] = useState([])
  setComments(plan.comments)

  const [textAreaInput, setTextAreaInput] = useState("")

  const handleTextAreaChange = e => setTextAreaInput(e.target.value)

  const handlePostComment = () => {
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
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    const newComment = {
      username: "Me",
      date: dateString,
      content: textAreaInput,
      numLikes: 0,
    }

    // add new comment to the plan
    // plan.comments.push(newComment)
    setComments(comments.push(newComment))

    console.log("after posting comment")
    console.log(comments)
    console.log(Array.isArray(comments))
    // console.log(comments[0])
    // re-render?
  }

  const convertCommentsToArray = () => {
    if (!Array.isArray(comments)) {
      setComments(Object.entries(comments))
      console.log("converting comments")
      console.log(comments)
    }
  }

  return (
    <Layout>
      <Container className="p-3">
        <h3>{plan.title}</h3>
        <Col className="mx-3">
          <Row>
            <Col xs="9">
              <Row>
                <p>{plan.date + " "}</p>
                <p>{plan.numLikes + " "}</p>
                <i class="pe-7s-like2 pe-lg"></i>
                <p>{plan.numComments + " "}</p>
                <i class="pe-7s-comment pe-lg"></i>
              </Row>
            </Col>
            <Col xs="3">
              <i class="pe-7s-user pe-lg"></i>
              <h6>{plan.username}</h6>
            </Col>
          </Row>
          <p>{plan.desc}</p>
        </Col>
        <Row>
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
        <div>this is where the plan would go</div>
        <br />
        <br />
        <section style={{ width: "50%" }}>
          <h5>Comments</h5>
          <br />
          {/* {console.log("before render: " + Array.isArray(comments))} */}
          {convertCommentsToArray}
          {comments.map(comment => {
            return <Comment {...comment}></Comment>
          })}

          <Form>
            <FormGroup>
              <Input
                onChange={e => handleTextAreaChange(e)}
                type="textarea"
                name="text"
                placeholder="Write your comment here..."
              />
            </FormGroup>
            <Button color="primary" onClick={handlePostComment}>
              Post Comment
            </Button>
          </Form>
        </section>
      </Container>
    </Layout>
  )
}
