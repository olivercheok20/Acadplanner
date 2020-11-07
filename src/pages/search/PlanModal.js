import React, { useState } from "react"

import { data } from "./data"

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

export default function PlanModal(props) {
  const id = props.id
  const plan = data[id]

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [nestedShareModal, setNestedModal] = useState(false)
  const toggleNested = () => {
    setNestedModal(!nestedShareModal)
    if (!nestedShareModal) {
      // if closing the nested modal, reset buttons to default
      setDownloaded("Download as PNG")
      setCopyLink("Copy Link")
    }
  }

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

  return (
    <>
      <Button color="link" onClick={toggle}>
        {plan.title}
      </Button>
      <Modal isOpen={modal} size="xl" toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>{plan.title}</ModalHeader>
        <ModalBody>
          <Col className="mx-3">
            <Row>
              <Col xs="10">
                <Row>
                  <p>{plan.date + " "}</p>
                  <p>{plan.numLikes + " "}</p>
                  <i class="pe-7s-like2 pe-lg"></i>
                  <p>{plan.numComments + " "}</p>
                  <i class="pe-7s-comment pe-lg"></i>
                </Row>
              </Col>
              <Col xs="2">
                <i class="pe-7s-user pe-lg"></i>
                <h6>{plan.username}</h6>
              </Col>
            </Row>
            <p>{plan.desc}</p>
          </Col>
          <Row>
            <Button color="primary">Import</Button>
            <Button outline color="secondary" onClick={toggleNested}>
              Share Plan
            </Button>
            <Modal isOpen={nestedShareModal} toggle={toggleNested}>
              <ModalHeader>Share Plan</ModalHeader>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
