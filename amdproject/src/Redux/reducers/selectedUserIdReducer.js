export const selectedUserIdReducer = (state = "", {type, payload}) => {
    switch(type){
        case "SELECTED_USER_ID":
            return payload;    
        default:
            return state;     
    }
}