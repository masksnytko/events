class Events {
    constructor() {
        this._events = {};
    }
    emit(type, ...arg) {
        const handler = this._events[type];
        
        if (handler === undefined) {
            return false;
        }

        if (typeof handler === 'function') {
            handler.apply(this, arg);
        } else {
            for (this._offset = 0; this._offset < handler.length; this._offset++) {
                handler[this._offset].apply(this, arg);
            }
        }

        return true;
    }
    on(type, cb) {
        const handler = this._events[type];
        if (handler === undefined) {
            this._events[type] = cb;
        } else {
            if (typeof handler === 'function') {
                this._events[type] = [handler, cb];
            } else {
                handler.push(cb);
            }
        }
    }
    once(type, cb) {
        this.on(type, function handler () {
            this.removeListener(type, handler);
            this._offset--;
            cb.apply(this, arguments);
        });
    }
    removeListener(type, cb) {
        let handler = this._events[type];

        if (handler === undefined) {
            return false;
        }

        if (typeof handler === 'function') {
            return delete this._events[type];
        }

        let index = handler.indexOf(cb);

        if (index > -1) {
            handler.splice(index, 1);
            if (handler.length === 0) {
                return delete this._events[type];
            } else {
                return true;
            }
        }
        
        return false;
    }
    listenerCount(type) {
        const handler = this._events[type];
        
        if (typeof handler === 'function') {
            return 1;
        }

        if (handler === undefined) {
            return 0;
        } else {
            return handler.length;
        }
    }
}

module.exports = Events;