export const FAVORITE_LAUNCH = 'FAVORITE_LAUNCH';


export const favoriteAction = (launch) => {
    return {
        type: FAVORITE_LAUNCH,
        launch
    };
};