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
        { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
        { name: 'GE1101E Geographical Journeys: Exploring World Environments', modularCredits: '4', grade: '' },
        { name: 'GET1018 The Mathematics of Games', modularCredits: '4', grade: '' },
        { name: 'GET1002 Bridging East and West: Exploring Chinese Communication', modularCredits: '4', grade: '' },
        { name: 'GEM1052T Understanding The Changing Global Economic Landscape', modularCredits: '4', grade: '' },
        { name: 'UTC2402 Environment and Civil Society in Singapore', modularCredits: '4', grade: '' },
        { name: 'GE2202 Economy & Space', modularCredits: '4', grade: '' },
        { name: 'GET1042 Sky and Telescopes', modularCredits: '4', grade: '' },
        { name: 'GEH1002 Economic Issues in Dev World', modularCredits: '4', grade: '' },
        { name: 'GES1000 Singapore Employment Law', modularCredits: '4', grade: '' },
        { name: "GES1002 Global EC Dimensions of S'pore", modularCredits: '4', grade: '' },
        { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: '' },
        { name: 'LAT1201 Thai 1', modularCredits: '4', grade: '' },
        { name: 'LAF1201 French 1', modularCredits: '4', grade: '' },
        { name: 'LAT1201 Thai 1', modularCredits: '4', grade: '' },
        { name: 'LSM1306 Forensic Science', modularCredits: '4', grade: '' },
        { name: 'LAC1201 Chinese 1', modularCredits: '4', grade: '' },
        { name: 'CS4211 Formal Methods for Software Engineering', modularCredits: '4', grade: '' },
        { name: 'CS4216 Constraint Logic Programming', modularCredits: '4', grade: '' },
        { name: 'CS4218 Software Testing', modularCredits: '4', grade: '' },
        { name: 'CS4222 Wireless Networking', modularCredits: '4', grade: '' },
        { name: 'CS4224 Distributed Databases', modularCredits: '4', grade: '' },
        { name: 'CS4226 Internet Architecture', modularCredits: '4', grade: '' },
        { name: 'CS4232 Theory of Computation', modularCredits: '4', grade: '' },
        { name: 'CS4235 Computational Geometry', modularCredits: '4', grade: '' },
        { name: 'CS4239 Software Security', modularCredits: '4', grade: '' },
        { name: 'IS1103  Ethics in Computing', modularCredits: '4', grade: '' },
        { name: 'CS2101 Effective Communication for Computing Professionals', modularCredits: '4', grade: '' },
        { name: 'ST2334 Probability and Statistics', modularCredits: '4', grade: '' },
        { name: 'CS1010 Programming Methodology', modularCredits: '4', grade: '' },
        { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
        { name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: '' },
        { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: '' },
        { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: '' },
        { name: 'CS2100 Computer Organisation', modularCredits: '4', grade: '' },
        { name: 'CS2103T Software Engineering', modularCredits: '4', grade: '' },
        { name: 'CS2106 Introduction to Operating Systems', modularCredits: '4', grade: '' },
        { name: 'CS3230 Design and Analysis of Algorithms', modularCredits: '4', grade: '' },
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
                        <div style={{ flex: 14, margin: 3, marginBottom: 5 }}>
                            <Select
                                defaultValue={props.module.name != '' ? { value: props.module.name, label: props.module.name } : { value: 'Add a module..', label: 'Add a module..' }}
                                onChange={onReplaceModule}
                                options={formatModulesToSelectOptions(dummyModules)}
                                components={
                                    {
                                        IndicatorSeparator: () => null
                                    }
                                }
                            />
                        </div>
                        <Input
                            type="text"
                            name="state"
                            id="exampleState"
                            placeholder="0"
                            value={props.module.modularCredits}
                            disabled
                            style={{ flex: 1, margin: 3, textAlign: 'center' }}
                        />
                        {!props.isPlanToTakeModule && <div style={{ flex: 3, margin: 2 }}>
                            <Select
                                defaultValue={props.module.grade != '' ? { value: props.module.grade, label: props.module.grade } : { value: '-', label: '-' }}
                                onChange={onChangeGrade}
                                options={formatGradesToSelectOptions(grades)}
                                isSearchable={false}
                                components={
                                    {
                                        IndicatorSeparator: () => null,
                                    }
                                }
                            />
                        </div>}
                        <div style={{ margin: 3 }}>
                            <Button color="danger" size="md" onClick={onDeleteModule}>
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