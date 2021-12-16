export const userReducer = (state = null, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        
        default:
            return state;


    }
}