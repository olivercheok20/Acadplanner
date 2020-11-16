import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function profileReducer(
    profile = {
        'name': 'Oliver Cheok',
        'bio': 'Hi! My name is Oliver Cheok',
        'major': 'Computer Science (Hons)',
        'minor': 'Business',
        'programme': 'Bachelor of Computing',
        'special': 'University Scholars Programme',
        'year': 'AY 18/19'
    },
    action) {
    switch (action.type) {
        case 'changeName':
            return { ...profile, 'name': action.payload.name }
        case 'changeBio':
            return { ...profile, 'bio': action.payload.bio }
        case 'changeProgramme':
            return { ...profile, 'programme': action.payload.programme }
        case 'changeMajor':
            return { ...profile, 'major': action.payload.major }
        case 'changeMinor':
            return { ...profile, 'minor': action.payload.minor }
        case 'changeSpecial':
            return { ...profile, 'special': action.payload.special }
        case 'changeYear':
            return { ...profile, 'year': action.payload.year }
        default:
            return profile
    }
}

function plansReducer(plans =
    [
        {
            planName: 'CS + USP + Israel Exchange',
            planDescription: 'This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Israel in Y3S2.',
            public: false,
            current: true,
            tags: [
                'University Scholars Programme',
                'Computing',
                'AI',
                'Computer Science',
            ],
            years: [
                {
                    yearName: "Year 1",
                    semesters: [
                        {
                            semesterName: 'Semester 1',
                            modules: [
                                { name: 'IS1103 Ethics in Computing', modularCredits: '4', grade: 'S' },
                                { name: 'CS2101 Effective Communication for Computing Professionals', modularCredits: '4', grade: 'A' },
                                { name: 'GER1000 Quantitative Reasoning', modularCredits: '4', grade: 'A' },
                                { name: 'GET1018 The Mathematics of Games', modularCredits: '4', grade: 'B+' },
                                { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: 'C' }
                            ]
                        },
                        {
                            semesterName: 'Semester 2',
                            modules: [
                                { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: 'S' },
                                { name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: 'A' },
                                { name: 'CS2100 Computer Organisation', modularCredits: '4', grade: 'A' },
                                { name: 'LAF1201 French 1', modularCredits: '4', grade: 'A' },
                                { name: 'GE2202 Economy & Space', modularCredits: '4', grade: 'A' }
                            ]
                        }
                    ]
                },
                {
                    yearName: "Year 2",
                    semesters: [
                        {
                            semesterName: 'Semester 3',
                            modules: [
                                { name: 'CS2103T Software Engineering', modularCredits: '4', grade: 'S' },
                                { name: 'CS2106 Introduction to Operating Systems', modularCredits: '4', grade: 'A' },
                                { name: 'CS4218 Software Testing', modularCredits: '4', grade: 'C' },
                            ]
                        },
                    ]
                }
            ],
            planToTakeModules: [
                { name: 'CS1010 Programming Methodology', modularCredits: '4' }
            ]
        },
        {
            planName: 'CS + USP + Germany Exchange',
            planDescription: 'This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Germany in Y2S1.',
            public: false,
            current: false,
            tags: ['Computer Science', 'Student Exchange Programme', 'Computing', 'University Scholars Programme', 'AI', 'Germany'],
            years: [
                {
                    yearName: "Year 1",
                    semesters: [
                        { semesterName: 'Semester 1', modules: [{ name: 'CS1010 Programming Methodology', modularCredits: '4', grade: 'A' }, { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'Semester 2', modules: [{ name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'Semester 3', modules: [{ name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: 'A' }] }
                    ]
                },
            ],
            planToTakeModules: [
                { name: 'CS1231 Discrete Structures', modularCredits: '4', grade: '' },
            ]
        }
    ], action) {
    switch (action.type) {
        case 'changePlanName':
            plans.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.planName = action.payload.newName;
                }
            })
            return plans;
        case 'changePlanDescription':
            plans.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.planDescription = action.payload.newDescription;
                }
            })
            return plans;
        case 'changeYearName':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.yearName = action.payload.newName;
                        }
                    })
                }
            })
            return plansCopy;
        case 'changeSemesterName':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach((semester) => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    semester.semesterName = action.payload.newName;
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'addModule':
            var newModule = { name: '', modularCredits: '', grade: '' };
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach((semester) => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    semester.modules = semester.modules.concat([newModule]);
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'addPlanToTakeModule':
            var newModule = { name: '', modularCredits: '', grade: '' };
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.planToTakeModules = plan.planToTakeModules.concat([newModule]);
                }
            })
            return plansCopy;
        case 'addSpecifiedModule':
            var newModule = action.payload.module;
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach((semester) => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    let add = true;
                                    for (const mod of semester.modules) {
                                        if (mod.name == newModule.name) {
                                            add = false
                                        }
                                    }
                                    if (add) {
                                        semester.modules = semester.modules.concat([newModule]);
                                    }
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'deleteModule':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach((semester) => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    semester.modules = semester.modules.filter(module => module.name !== action.payload.moduleName);
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'deletePlanToTakeModule':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.planToTakeModules = plan.planToTakeModules.filter(module => module.name !== action.payload.moduleName);
                }
            })
            return plansCopy;
        case 'replaceModule':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach(semester => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    semester.modules.forEach(module => {
                                        if (module.name === action.payload.nameOfPreviousModule) {
                                            module.name = action.payload.nameOfNewModule;
                                            if (module.modularCredits === '') {
                                                module.modularCredits = '4';
                                            }
                                            module.grade = '';
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'replacePlanToTakeModule':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.planToTakeModules.forEach(module => {
                        if (module.name === action.payload.nameOfPreviousModule) {
                            module.name = action.payload.nameOfNewModule;
                            if (module.modularCredits === '') {
                                module.modularCredits = '4';
                            }
                            module.grade = '';
                        }
                    })
                }
            })
            return plansCopy;
        case 'changeGrade':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters.forEach(semester => {
                                if (semester.semesterName === action.payload.semesterName) {
                                    semester.modules.forEach(module => {
                                        if (module.name === action.payload.moduleName) {
                                            module.grade = action.payload.newGrade;
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
            return plansCopy;
        case 'addSemester':
            var newSemester = {
                semesterName: 'New semester', modules: [{ name: '', modularCredits: '', grade: '' }]
            };
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters = year.semesters.concat([newSemester]);
                        }
                    })
                }
            })
            return plansCopy;
        case 'deleteSemester':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years.forEach(year => {
                        if (year.yearName === action.payload.yearName) {
                            year.semesters = year.semesters.filter(semester => semester.semesterName !== action.payload.semesterName)
                        }
                    })
                }
            })
            return plansCopy;
        case 'addYear':
            var newYear = {
                yearName: "",
                semesters: [
                    { semesterName: 'New semester', modules: [{ name: 'dummy', modularCredits: '', grade: '' }] }
                ]
            };
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    newYear.yearName = "Year " + (plan.years.length + 1).toString();
                    plan.years = plan.years.concat([newYear])
                }
            })
            return plansCopy;
        case 'deleteYear':
            var plansCopy = plans.slice();
            plansCopy.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.years = plan.years.filter(year => year.yearName !== action.payload.yearName)
                }
            })
            return plansCopy;
        case 'changeModulePosition':
            let sourceYear = action.payload.sourceSemester.split('<>')[0]
            let sourceSemester = action.payload.sourceSemester.split('<>')[1]
            let sourceModuleIndex = action.payload.sourceModuleIndex;
            let destinationYear = action.payload.destinationSemester.split('<>')[0]
            let destinationSemester = action.payload.destinationSemester.split('<>')[1]
            let destinationModuleIndex = action.payload.destinationModuleIndex;
            let movedModule;
            var plansCopy = plans.slice();

            if (sourceSemester != 'planToTake' && destinationSemester != 'planToTake') { // movement from semester to semester
                // remove moved module from original pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        plan.years.forEach(year => {
                            if (year.yearName === sourceYear) {
                                year.semesters.forEach(semester => {
                                    if (semester.semesterName === sourceSemester) {
                                        movedModule = semester.modules[sourceModuleIndex];
                                        semester.modules.splice(sourceModuleIndex, 1);
                                    }
                                })
                            }
                        })
                    }
                })

                // add moved module to new pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        plan.years.forEach(year => {
                            if (year.yearName === destinationYear) {
                                year.semesters.forEach(semester => {
                                    if (semester.semesterName === destinationSemester) {
                                        semester.modules.splice(destinationModuleIndex, 0, movedModule)
                                    }
                                })
                            }
                        })
                    }
                })
            } else if (sourceSemester == 'planToTake') { // movement from planToTake section to semester
                // remove moved module from original pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        movedModule = plan.planToTakeModules[sourceModuleIndex];
                        plan.planToTakeModules.splice(sourceModuleIndex, 1);
                    }
                })

                // add moved module to new pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        plan.years.forEach(year => {
                            if (year.yearName === destinationYear) {
                                year.semesters.forEach(semester => {
                                    if (semester.semesterName === destinationSemester) {
                                        semester.modules.splice(destinationModuleIndex, 0, movedModule)
                                    }
                                })
                            }
                        })
                    }
                })
            } else { // movement from semester to planToTake section 
                // remove moved module from original pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        plan.years.forEach(year => {
                            if (year.yearName === sourceYear) {
                                year.semesters.forEach(semester => {
                                    if (semester.semesterName === sourceSemester) {
                                        movedModule = semester.modules[sourceModuleIndex];
                                        semester.modules.splice(sourceModuleIndex, 1);
                                    }
                                })
                            }
                        })
                    }
                })

                // add moved module to new pos
                plansCopy.forEach(plan => {
                    if (plan.planName === action.payload.planName) {
                        plan.planToTakeModules.splice(destinationModuleIndex, 0, movedModule)
                    }
                })
            }
            return plans;
        case 'addPlan':
            var newPlan = {
                planName: 'New Plan',
                planDescription: 'This is a new plan.',
                public: false,
                current: false,
                tags: [],
                years: [
                    {
                        yearName: "Year 1",
                        semesters: [
                        ]
                    }
                ],
                planToTakeModules: [
                ]
            };
            return plans.concat([newPlan])
        case 'addSpecificPlan':
            return plans.concat([action.payload.plan])
        case 'changePublicPlan':
            plans.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.public = !plan.public;
                }
            })
            return plans;
        case 'changeCurrentPlan':
            plans.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.current = !plan.current;
                }
            })
            return plans;
        case 'changeTags':
            plans.forEach(plan => {
                if (plan.planName === action.payload.planName) {
                    plan.tags = action.payload.tagsArray;
                }
            })
            return plans;
        default:
            return plans
    }
}

function communityReducer(community = {}, action) {
    switch (action.type) {
        default:
            return community
    }
}

const rootReducer = combineReducers({ profile: profileReducer, plans: plansReducer, community: communityReducer })

// preloadedState will be passed in by the plugin
export default preloadedState => {
    return createStore(
        rootReducer,
        preloadedState,
        // compose(
        applyMiddleware(thunk),
        //     window.devToolsExtension ? window.devToolsExtension() : f => f
        // )
    );
};