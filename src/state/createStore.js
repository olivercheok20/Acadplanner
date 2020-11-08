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
            tags: ['Computer Science', 'Student Exchange Programme', 'Computing', 'University Scholars Programme', 'AI', 'Israel'],
            years: [
                {
                    yearName: "Year 1",
                    semesters: [
                        { semesterName: 'sem1', modules: [{ name: 'CS1010', modularCredits: '4', grade: 'A' }, { name: 'CS2030', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem2', modules: [{ name: 'CS2040', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem3', modules: [{ name: 'MA1521', modularCredits: '4', grade: 'A' }] }
                    ]
                }
            ],
            planToTakeModules: [
                { name: 'CS1231', modularCredits: '4' }
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
                        { semesterName: 'sem1', modules: [{ name: 'CS2040', modularCredits: '4', grade: 'A' }] },
                        { semesterName: 'sem2', modules: [{ name: 'CS1010', modularCredits: '4', grade: 'A' }, { name: 'CS2030', modularCredits: '4', grade: 'A' }] },
                    ]
                }
            ],
            planToTakeModules: [
                { name: 'CS1231', modularCredits: '4' }
            ]
        }
    ], action) {
    switch (action.type) {
        case 'changePlanName':
            break
        case 'changePlanDescription':
            break
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
            console.log(plans.concat([newPlan]))
            return plans.concat([newPlan])
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
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
};