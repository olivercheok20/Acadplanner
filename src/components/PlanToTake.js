import React, { useState, useEffect } from "react";
import { Card, Button } from "reactstrap";
import { PlanToTakeModule } from './PlanToTakeModule';

export const PlanToTake = (props) => {

    const [modules, setModules] = useState([]);

    useEffect(() => {
        setModules(props.planToTakeModules);
    }, [])

    const addModuleRow = () => {
        setModules([...modules, { name: '', modularCredits: '' }])
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

    return (
        <Card style={{ padding: 30, paddingBottom: 5, borderWidth: '1px' }}>
            {modules.map((module, i) => (
                <PlanToTakeModule moduleData={module} key={i} />
            ))}
            <Button style={{ margin: 5, backgroundColor: 'rgb(237, 241, 247)', borderColor: 'white', color: "black" }} color='info' onClick={() => addModuleRow()}>Add module</Button>
            <div style={{ display: "flex", marginTop: 10 }}>
                <p style={{ marginLeft: "auto", fontWeight: 'bold' }}>MCs: {calculateMCs()}</p>
            </div>
        </Card>
    )
}

