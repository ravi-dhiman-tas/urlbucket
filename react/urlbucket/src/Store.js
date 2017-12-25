import { EventEmitter } from 'events';
import Dispatcher from './Dispatcher';
import * as C from './Constants';

class Store extends EventEmitter {
    constructor() {
        super();
        this.user = null;
    }

    handleStore(action) {
        switch(action.type) {
            case C.AUTH_USER: {
                this.user = action.payload;
                return this.emit('change');
            }
            default: {return;}
        }
    }
}

const store = new Store();
Dispatcher.register(store.handleStore.bind(store));

export default store;