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
            tags: [],
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
            planName: 'Plan 2',
            planDescription: 'This plan is for a CS major specialising in artificial intelligence and computer security + USP + an exchange to Israel in Y3S2.',
            public: false,
            current: false,
            tags: [],
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
            console.log(plans)
            // for (var i; i < length(plans); i++) {
            //     if (plans[i].planName == action.payload.planName) {
            //         plans[i].planName = action.payload.newName
            //     }
            // }
            return plans
        case 'changePlanDescription':
            break
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