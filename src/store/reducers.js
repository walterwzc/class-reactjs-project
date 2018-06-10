export default (state = [], action) => {
    switch (action.type) {
        case 'LOAD':
            return action.list
        default:
            return state
    }
}
