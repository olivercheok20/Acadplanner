import React, { useState } from "react";
import { Card, Button, Input, Form } from "reactstrap";
import { Module } from './Module';

import { Droppable } from 'react-beautiful-dnd';

export const Semester = (props) => {

    const [editSemesterName, setEditSemesterName] = useState(false);

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
            <Card style={{ padding: 30, paddingBottom: 5, borderWidth: '1px', paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <Button close onClick={() => props.onDeleteSemester(props.planName, props.yearName, props.semester.semesterName)} />
                </div>

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
            </Card>
        </>
    )
}

