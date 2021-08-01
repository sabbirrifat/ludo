const init = {
    username: null,
    id: null,
    coin: 0,
}


export const userReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                coin: action.payload.coin,
            }
        case 'LOGOUT':
            return {
                ...state,
                username: null,
                id: null,
                coin: 0,
            }
        default:
            return state;
    }
}