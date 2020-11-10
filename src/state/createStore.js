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
                { value: 'University Scholars Programme', label: 'University Scholars Programme' },
                { value: 'Computing', label: 'Computing' },
                { value: 'AI', label: 'AI' },
                { value: 'Computer Science', label: 'Computer Science' },
                { value: 'Israel', label: 'Israel' },
            ],
            years: [
                {
                    yearName: "Year 1",
                    semesters: [
                        { semesterName: 'sem1', modules: [{ name: 'CS1010 Programming Methodology', modularCredits: '4', grade: 'A' }, { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem2', modules: [{ name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: 'A-' }] },
                        { semesterName: 'sem3', modules: [{ name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: 'C' }] }
                    ]
                },
                // {
                //     yearName: "Year 2",
                //     semesters: [
                //         { semesterName: 'sem1', modules: [{ name: 'CS1010 Programming Methodology', modularCredits: '4', grade: 'A' }, { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: 'A' }] },
                //         { semesterName: 'sem2', modules: [{ name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: 'A' }] },
                //         { semesterName: 'sem3', modules: [{ name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: 'A' }] }
                //     ]
                // }
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
                        { semesterName: 'sem1', modules: [{ name: 'CS1010 Programming Methodology', modularCredits: '4', grade: 'A' }, { name: 'CS2030 Programming Methodology II', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem2', modules: [{ name: 'CS2040 Data Structures and Algorithms', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem3', modules: [{ name: 'MA1521 Calculus for Computing', modularCredits: '4', grade: 'A' }] }
                    ]
                },
            ],
            planToTakeModules: [
                { name: 'CS1010 Programming Methodology', modularCredits: '4' }
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
                    plan.years = plans.years.filter(year => year.yearName !== action.payload.yearName)
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