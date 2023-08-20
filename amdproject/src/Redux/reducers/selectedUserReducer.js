export const selectedUserReducer = (state = "", {type, payload}) => {
    switch(type){
        case "SELECTED_USER":
            return payload;  
        default:
            return state;     
    }
}