import React, { useState } from "react"
import { Semester } from "./Semester";
// import { PlanToTake } from "../../components/PlanToTake";
import { Row, Col, Button, Input, Form, Collapse, Modal, ModalHeader, ModalBody } from "reactstrap";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export const Year = (props) => {

    const [editYearName, setEditYearName] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div style={{ border: '1px solid #ced4da', borderRadius: 5, margin: 20 }}>
            <div style={{ margin: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', marginLeft: 20 }}>
                    {!editYearName && <h3 style={{ paddingTop: 5 }}>{props.yearName}</h3>}
                    {!editYearName && <Button color="link" onClick={() => setEditYearName(true)}>edit</Button>}
                    {editYearName && <Form onSubmit={() => {
                        setEditYearName(false)
                        props.onChangeYearName(props.planName, props.yearName, document.getElementById(props.yearName).value)
                    }}>
                        <Input
                            type="text"
                            name="text"
                            id={props.yearName}
                            defaultValue={props.yearName}
                            rows={1}
                        />
                    </Form>}
                    {editYearName && <Button color="link" onClick={() => {
                        setEditYearName(false)
                        props.onChangeYearName(props.planName, props.yearName, document.getElementById(props.yearName).value)
                    }}>done</Button>}
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 20 }}>
                        <Button close aria-label="Cancel" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen && <FaAngleUp />}
                            {!isOpen && <FaAngleDown />}
                        </Button>
                    </div>

                    <div>
                        <Button close onClick={toggle} />
                    </div>
                </div>
            </div>

            <Collapse isOpen={isOpen}>
                <Row style={{ marginLeft: 15, marginRight: 15 }}>
                    {props.semesters.map((semester, i) => (
                        <Col md={6} key={i} style={{ padding: 0 }}>
                            <div style={{ margin: 20 }}>
                                <Semester
                                    semester={semester}
                                    yearName={props.yearName}
                                    planName={props.planName}
                                    errorModules={props.errorModules}
                                    constraints={props.constraints}
                                    onAddModule={props.onAddModule}
                                    onChangeSemesterName={props.onChangeSemesterName}
                                    onDeleteSemester={props.onDeleteSemester}
                                    onDeleteModule={props.onDeleteModule}
                                    onReplaceModule={props.onReplaceModule}
                                    onChangeGrade={props.onChangeGrade}
                                />
                            </div>
                        </Col>
                    ))}
                    <Col md={6}>
                        <div style={{ margin: 5, flex: 1, marginBottom: 50, marginTop: 20 }}>
                            <Button style={{ width: '100%' }} color="info" onClick={() =>
                                props.onAddSemester(props.planName, props.yearName)
                            }>Add Semester</Button>
                        </div>
                    </Col>
                </Row>
            </Collapse>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
                <ModalBody>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: 50, marginBottom: 50 }}>Are you sure you want to delete this year?</div>
                        <div>
                            <Button color="primary" onClick={() => {
                                props.onDeleteYear(props.planName, props.yearName);
                                toggle();
                            }}>Confirm</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )

}