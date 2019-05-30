export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';


export const removeFavorite = (launch) => {
    return {
        type: REMOVE_FAVORITE,
        launch
    };
};