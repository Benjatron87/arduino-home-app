export const ADD_FAVORITE = 'ADD_FAVORITE';


export const addFavorite = (launch) => {
    return {
        type: ADD_FAVORITE,
        launch
    };
};