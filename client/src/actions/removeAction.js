export const REMOVE_LAUNCH = 'REMOVE_LAUNCH';

export const removeLaunch = (launch) => {
    return {
        type: REMOVE_LAUNCH,
        launch
    }
};