export const createReducer = (initialState: {}, handlers: any) => {
    return (state = initialState, action: { type: string }) =>
        handlers.hasOwnProperty(action.type) ?
            handlers[action.type](state, action) :
            state;
};
