import React, { useState, useEffect } from "react";
import { Card, Button, Input } from "reactstrap";
import { Module } from './Module';

export const Semester = (props) => {

    const [modules, setModules] = useState([]);
    const [semesterName, setSemesterName] = useState('');
    const [editSemesterName, setEditSemesterName] = useState(false);

    useEffect(() => {
        setSemesterName(props.semester.semesterName)
        setModules(props.semester.modules);
    }, [])

    const addModuleRow = () => {
        setModules([...modules, { name: '', modularCredits: '', grade: '' }])
    }

    const calculateMCs = () => {
        let credits = 0;
        for (module of modules) {
            if (module.modularCredits != '') {
                credits += parseInt(module.modularCredits);
            }
        }
        return credits;
    }

    const onChangeSemesterName = e => {
        setSemesterName(e.target.value);
    }

    return (
        <Card style={{ padding: 30, paddingBottom: 5, borderWidth: '1px' }}>
            <div style={{ display: 'flex', marginLeft: 5 }}>
                {!editSemesterName && <h5 style={{ paddingTop: 5 }}>{semesterName}</h5>}
                {!editSemesterName && <Button color="link" onClick={() => setEditSemesterName(true)}>edit</Button>}
                {editSemesterName && <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    value={semesterName}
                    onChange={onChangeSemesterName}
                    rows={1}
                />}
                {editSemesterName && <Button color="link" onClick={() => setEditSemesterName(false)}>done</Button>}
            </div>

            {modules.map((module, i) => (
                <Module moduleData={module} key={i} />
            ))}
            <Button style={{ margin: 5, backgroundColor: 'rgb(237, 241, 247)', borderColor: 'white', color: "black" }} color='info' onClick={() => addModuleRow()}>Add module</Button>
            <div style={{ display: "flex", marginTop: 10 }}>
                <p style={{ marginLeft: "auto", fontWeight: 'bold' }}>MCs: {calculateMCs()}</p>
            </div>
        </Card>
    )
}

