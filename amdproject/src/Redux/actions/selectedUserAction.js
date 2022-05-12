export const setSelectedUser = (selectedUser) => {
    return {
        type: "SELECTED_USER",
        payload: selectedUser,
    };
} ;

export const setSelectedUserId = (selectedUserId) => {
    return {
        type: "SELECTED_USER_ID",
        payload: selectedUserId,
    };
} ;