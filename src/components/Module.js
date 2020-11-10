import React, { useState, useEffect, } from "react";
import { Input } from "reactstrap";
import Select from "react-select";

import { Draggable } from 'react-beautiful-dnd';

export const Module = (props) => {

    const [modularCredits, setModularCredits] = useState('');
    const [grade, setGrade] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);

    const dummyAllModulesData = [
        { value: 'CS1010', label: 'CS1010 Programming Methodology' },
        { value: 'CS1231', label: 'CS1231 Discrete Structures' },
        { value: 'CS2030', label: 'CS2030 Programming Methodology II' },
        { value: 'CS2040', label: 'CS2040 Data Structures and Algorithms' },
        { value: 'GER1000', label: 'GER1000 Quantitative Reasoning' },
    ]

    useEffect(() => {
        let moduleData = props.moduleData;
        setModularCredits(moduleData.modularCredits)
        setGrade(moduleData.grade);
    }, [])

    const onChangeGrade = e => {
        setGrade(e.target.value);
    }

    return (
        <Draggable draggableId={props.yearName + props.semesterName + props.moduleData.name} index={props.index}>
            {(provided) => (
                <div {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* <div>{props.moduleData.name}</div> */}
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 5, margin: 5 }}>
                            <Select
                                defaultValue={props.moduleData.name ? { value: props.moduleData.name, label: props.moduleData.name } : { value: 'Add a module..', label: 'Add a module..' }}
                                onChange={setSelectedOption}
                                options={dummyAllModulesData}
                            />
                        </div>
                        <Input
                            type="text"
                            name="state"
                            id="exampleState"
                            placeholder="0"
                            value={modularCredits}
                            disabled
                            style={{ flex: 1, margin: 5, textAlign: 'center' }}
                        />
                        <Input
                            type="text"
                            name="zip"
                            id="exampleZip"
                            placeholder="Grade"
                            value={grade}
                            onChange={onChangeGrade}
                            style={{ flex: 1, margin: 5, textAlign: 'center' }}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

