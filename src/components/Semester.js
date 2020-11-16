import React, { useState } from "react";
import { Card, Button, Input, Form, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import { Module } from './Module';

import { Droppable } from 'react-beautiful-dnd';

export const Semester = (props) => {

    const [editSemesterName, setEditSemesterName] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    function isError() {
        for (const mod of props.semester.modules) {
            for (const errorMod of props.errorModules) {
                if (mod.name == errorMod) {
                    return true;
                }
            }
        }
        return false;
    }

    function errorModulesInSemester() {
        let errorMods = []
        for (const mod of props.semester.modules) {
            for (const errorMod of props.errorModules) {
                if (mod.name == errorMod) {
                    errorMods.push(errorMod)
                }
            }
        }
        return errorMods;
    }

    function findPrerequisiteModule(errorMod) {
        for (var i = 0; i < props.constraints.length; i++) {
            if (props.constraints[i][1] == errorMod) {
                return props.constraints[i][0]
            }
        }
    }

    const calculateMCs = () => {
        let credits = 0;
        for (module of props.semester.modules) {
            if (module.modularCredits != '') {
                credits += parseInt(module.modularCredits);
            }
        }
        return credits;
    }

    return (
        <>
            <Card style={{ padding: 15, paddingBottom: 5, borderWidth: '1px', paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                    <div style={{ display: 'flex', marginLeft: 5 }}>
                        {!editSemesterName && <h5 style={{ paddingTop: 5 }}>{props.semester.semesterName}</h5>}
                        {!editSemesterName && <Button color="link" onClick={() => setEditSemesterName(true)}>edit</Button>}
                        {editSemesterName && <Form onSubmit={() => {
                            setEditSemesterName(false)
                            props.onChangeSemesterName(props.planName, props.yearName, props.semester.semesterName, document.getElementById(props.semester.semesterName).value)
                        }}>
                            <Input
                                type="text"
                                name="text"
                                id={props.semester.semesterName}
                                defaultValue={props.semester.semesterName}
                                rows={1}
                            />
                        </Form>}
                        {editSemesterName && <Button color="link" onClick={() => {
                            setEditSemesterName(false)
                            props.onChangeSemesterName(props.planName, props.yearName, props.semester.semesterName, document.getElementById(props.semester.semesterName).value)
                        }}>done</Button>}
                    </div>

                    <div>
                        <Button close onClick={toggle} />
                    </div>
                </div>


                <Droppable droppableId={props.yearName + `<>` + props.semester.semesterName}>
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.semester.modules.map((module, i) => (
                                <Module
                                    module={module}
                                    key={Math.random()}
                                    index={i}
                                    planName={props.planName}
                                    yearName={props.yearName}
                                    semesterName={props.semester.semesterName}
                                    onDeleteModule={props.onDeleteModule}
                                    onReplaceModule={props.onReplaceModule}
                                    onChangeGrade={props.onChangeGrade}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Button style={{ margin: 5, backgroundColor: 'rgb(237, 241, 247)', borderColor: 'white', color: "black" }} color='info' onClick={() => {
                    props.onAddModule(props.planName, props.yearName, props.semester.semesterName)
                }}>Add module</Button>
                <div style={{ display: "flex", marginTop: 10 }}>
                    <p style={{ marginLeft: "auto", fontWeight: 'bold' }}>MCs: {calculateMCs()}</p>
                </div>
                {
                        isError() && (
                            <Alert color="danger">
                                {errorModulesInSemester().map((errorMod) => (
                                    <p>{errorMod.split(" ", 1)[0]} is missing requirement {findPrerequisiteModule(errorMod).split(" ",1)[0]}.</p>
                                )

                                )}

                            </Alert>

                        )
                    }
            </Card>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
                <ModalBody>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginTop: 50, marginBottom: 50 }}>Are you sure you want to delete this semester?</div>
                        <div>
                            <Button color="primary" onClick={() => {
                                props.onDeleteSemester(props.planName, props.yearName, props.semester.semesterName);
                                toggle();
                            }}>Confirm</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

