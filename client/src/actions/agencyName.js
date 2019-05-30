export const ADD_AGENCY = 'ADD_AGENCY';


export const addAgency = (agency, abbv, image) => {
        return {
        type: ADD_AGENCY,
        agency,
        abbv,
        image
    };
};