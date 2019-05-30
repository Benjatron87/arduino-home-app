export const ADD_LAUNCH = 'ADD_LAUNCH';


export const addLaunch = (launch) => {
    return {
        type: ADD_LAUNCH,
        launch
    };
};