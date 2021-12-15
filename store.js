const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMET_COUNTER":
            return {
                ...state,
                count: state.count + action.payload
            }

        default: {
            return state
        }
    }
}
//*
//*
const incrementCounter = (amount) => ({ type: "INCREMENT_COUNTER", payload: amount });
class Store {
    #state
    #reducer
    #listener
    constructor(reducer, initialState) {
        this.#state = initialState;
        this.#reducer = reducer;
        this.#listener = []
    }

    grtState() {
        return this.#state
    }
    dispatch(action) {
        //
        //
        this.#state = this.#reducer(this.#state, action)
        this.notify()
    }
    //*listener
    subscribe(callback) {
        this.#listener.push(callback)
        const index = this.#listener.indexOf(callback)
        return () => {
            this.#listener = this.#listener.filter(a => a !== callback)
        }
    }
    notify() {
        for (const listener of this.#listener) {
            listener(this.#state)
        }
    }
}
const store = new Store(reducer, { count: 1 })
const unsubscribe_one = store.subscribe(() => {
    console.log("something has changed 1")
})
const unsubscribe_two = store.subscribe(() => {
    console.log("something has changed 2")
})
const unsubscribe_three = store.subscribe(() => {
    console.log("something has changed 3")
})
console.log(store.grtState())
const action = incrementCounter(1)
store.dispatch(action)
unsubscribe_three()
store.dispatch(action);
store.dispatch(action);