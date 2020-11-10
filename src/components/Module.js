import React, { useState, useEffect, } from "react";
import { Input, Button } from "reactstrap";
import Select from "react-select";

import { Draggable } from 'react-beautiful-dnd';
import { FaTrashAlt, FaTh } from 'react-icons/fa';

export const Module = (props) => {

    const [modularCredits, setModularCredits] = useState('');
    const [grade, setGrade] = useState('');

    const [selectedOption, setSelectedOption] = useState(null);


    const dummyModules = [
        { name: 'CS1010 Programming Methodology', modularCredits: '4', grade: '' },
        { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
        { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: '' },
        { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: '' },
        { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
        { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
    ]

    useEffect(() => {
        let moduleData = props.moduleData;
        setModularCredits(moduleData.modularCredits)
        setGrade(moduleData.grade);
    }, [])

    const onChangeGrade = e => {
        setGrade(e.target.value);
    }

    const convertToFormatRequiredBySelect = (dummyModules) => {
        let convertedFormat = [];
        for (let dummyModule of dummyModules) {
            convertedFormat.push({ value: dummyModule.name, label: dummyModule.name });
        }
        return convertedFormat;
    }

    const onReplaceModule = (e) => {
        setSelectedOption(e);
        props.onReplaceModule(props.planName, props.yearName, props.semesterName, props.moduleData.name, e.value)
    }

    return (
        <Draggable draggableId={props.yearName + props.semesterName + props.moduleData.name} index={props.index}>
            {(provided) => (
                <div {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 12, margin: 5 }}>
                            <Select
                                defaultValue={props.moduleData.name ? { value: props.moduleData.name, label: props.moduleData.name } : { value: 'Add a module..', label: 'Add a module..' }}
                                onChange={onReplaceModule}
                                options={convertToFormatRequiredBySelect(dummyModules)}
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
                            style={{ flex: 2, margin: 5, textAlign: 'center' }}
                        />
                        <div style={{ margin: 5 }}>
                            <Button outline style={{ borderColor: '#ced4da' }} size="lg" onClick={() => props.onDeleteModule(props.planName, props.yearName, props.semesterName, props.moduleData.name)}>
                                <FaTrashAlt />
                            </Button>
                        </div>
                        <div {...provided.dragHandleProps} style={{ marginLeft: 5 }}>
                            <FaTh />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

