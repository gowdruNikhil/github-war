let ninjaDataValues = {
    ninjaData: {
        one: 'aaa',
        two: '',
        isAuthorized: false
    }
}
const reducer = (state = ninjaDataValues, action) => {
    switch (action.type) {
        case 'NINJA':
            return { ninjaData: action.payload };

    };
    return state;
}
export default reducer;