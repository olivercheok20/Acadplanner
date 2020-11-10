import React, { useState } from "react"
import { Semester } from "./Semester";
// import { PlanToTake } from "../../components/PlanToTake";
import { Row, Col, Button, Input, Form } from "reactstrap";

export const Year = (props) => {

    const [editYearName, setEditYearName] = useState(false);

    return (
        <div style={{ border: '1px solid #ced4da', borderRadius: 5, margin: 30 }}>

            <div style={{ margin: 20, marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <Button close onClick={() => props.onDeleteYear(props.planName, props.yearName)} />
                </div>

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
            </div>

            <Row>
                {props.semesters.map((semester, i) => (
                    <Col md={6} key={i}>
                        <div style={{ margin: 20 }}>
                            <Semester
                                semester={semester}
                                yearName={props.yearName}
                                planName={props.planName}
                                onAddModule={props.onAddModule}
                                onChangeSemesterName={props.onChangeSemesterName}
                                onDeleteSemester={props.onDeleteSemester}
                                onDeleteModule={props.onDeleteModule}
                                onReplaceModule={props.onReplaceModule}
                            />
                        </div>
                    </Col>
                ))}
                <Col md={6}>
                    <div style={{ margin: 20, flex: 1 }}>
                        <Button style={{ width: '100%' }} color="info" onClick={() =>
                            props.onAddSemester(props.planName, props.yearName)
                        }>Add Semester</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )

}