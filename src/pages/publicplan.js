import React, { useState, useRef } from "react"

import { data } from "./search/data"

import Layout from "../components/layout"

import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap"

export default function PublicPlan() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("id")
  const plan = data[id]

  // for 'share plan' modal
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
    if (!modal) {
      // if closing the nested modal, reset buttons to default
      setDownloaded("Download as PNG")
      setCopyLink("Copy Link")
    }
  }

  // for buttons in 'share plan' modal
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

  // for import plan modal
  const [importModal, setImportModal] = useState(false)
  const importModalRef = useRef(importModal)
  importModalRef.current = importModal

  const toggleImportModal = () => {
    setImportModal(!importModal)
    // if modal is open, set it to close in 3 seconds
    // console.log("before timeout: " + importModal)
    if (importModal) {
      const timer = setTimeout(
        () => setImportModal(importModalRef.current),
        1000
      )
      clearTimeout(timer)
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
            {/* <ModalBody className="align-items-center justify-content-center">
              
              <Button className="close"></Button>
            </ModalBody> */}
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
      </Container>
    </Layout>
  )
}
