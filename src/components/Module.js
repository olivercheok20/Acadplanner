import React, { useState, useEffect, } from "react";
import { Input, Button } from "reactstrap";
import Select from "react-select";

import { Draggable } from 'react-beautiful-dnd';
import { FaTrashAlt, FaTh } from 'react-icons/fa';

export const Module = (props) => {

    const dummyModules = [
        { name: 'CS1010 Programming Methodology', modularCredits: '4', grade: '' },
        { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
        { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: '' },
        { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: '' },
        { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
        { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
    ];

    const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D+', 'D', 'F', 'S', 'U'];

    const formatModulesToSelectOptions = (modules) => {
        let selectOptions = [];
        for (let module of modules) {
            selectOptions.push({ value: module.name, label: module.name });
        }
        return selectOptions;
    }

    const formatGradesToSelectOptions = (grades) => {
        let selectOptions = [];
        for (let grade of grades) {
            selectOptions.push({ value: grade, label: grade });
        }
        return selectOptions;
    }

    const onReplaceModule = (e) => {
        if (props.isPlanToTakeModule) {
            props.onReplacePlanToTakeModule(props.planName, props.module.name, e.value)
        } else {
            props.onReplaceModule(props.planName, props.yearName, props.semesterName, props.module.name, e.value);
        }
    }

    const onChangeGrade = (e) => {
        props.onChangeGrade(props.planName, props.yearName, props.semesterName, props.module.name, e.value);
    }

    const onDeleteModule = () => {
        if (props.isPlanToTakeModule) {
            props.onDeletePlanToTakeModule(props.planName, props.module.name)
        } else {
            props.onDeleteModule(props.planName, props.yearName, props.semesterName, props.module.name)
        }
    }

    return (
        <Draggable draggableId={props.yearName + props.semesterName + props.module.name} index={props.index}>
            {(provided) => (
                <div {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 10, margin: 5 }}>
                            <Select
                                defaultValue={props.module.name != '' ? { value: props.module.name, label: props.module.name } : { value: 'Add a module..', label: 'Add a module..' }}
                                onChange={onReplaceModule}
                                options={formatModulesToSelectOptions(dummyModules)}
                            />
                        </div>
                        <Input
                            type="text"
                            name="state"
                            id="exampleState"
                            placeholder="0"
                            value={props.module.modularCredits}
                            disabled
                            style={{ flex: 1, margin: 5, textAlign: 'center' }}
                        />
                        {!props.isPlanToTakeModule && <div style={{ flex: 2, margin: 5 }}>
                            <Select
                                defaultValue={props.module.grade != '' ? { value: props.module.grade, label: props.module.grade } : { value: 'Grade', label: 'Grade' }}
                                onChange={onChangeGrade}
                                options={formatGradesToSelectOptions(grades)}
                                isSearchable={false}
                            />
                        </div>}
                        <div style={{ margin: 5 }}>
                            <Button color="danger" size="lg" onClick={onDeleteModule}>
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

