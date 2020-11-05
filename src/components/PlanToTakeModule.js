import React, { useState, useEffect } from "react";
import { Input } from "reactstrap";

export const PlanToTakeModule = (props) => {

    const [name, setName] = useState('');
    const [modularCredits, setModularCredits] = useState('');
    const [grade, setGrade] = useState('');

    useEffect(() => {
        let moduleData = props.moduleData;
        setName(moduleData.name);
        setModularCredits(moduleData.modularCredits)
    }, [])

    const onChangeName = e => {
        setName(e.target.value);
    }

    // const onChangeModularCredits = e => {
    //     setModularCredits(e.target.value);
    // }

    return (
        <div style={{ display: 'flex' }}>
            <Input
                type="text"
                name="city"
                id="exampleCity"
                placeholder="Add a module.."
                value={name}
                onChange={onChangeName}
                style={{ flex: 5, margin: 5 }}
            />
            <Input
                type="text"
                name="state"
                id="exampleState"
                placeholder="0"
                value={modularCredits}
                disabled
                // onChange={onChangeModularCredits}
                style={{ flex: 1, margin: 5, textAlign: 'center' }}
            />
        </div>
    )
}

