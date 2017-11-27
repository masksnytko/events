class Events {
    constructor() {
        this._events = new Object;
    }
    on(type, cb) {
        let _cb = this._events[type];
        if (_cb instanceof Function) {
            this._events[type] = [_cb, cb]; 
        } else if (_cb instanceof Array) {
            _cb.push(cb);
        } else {
            this._events[type] = cb;
        }
    }
    once(type, cb) {
        let _cb = (...arg) => {
            this.removeListener(type, _cb);
            cb(...arg);
        }
        this.on(type, _cb);
    }
    emit(type, ...arg) {
        let _cb = this._events[type];
        if (_cb instanceof Function) {
            _cb(...arg);
        } else if (_cb instanceof Array) {
            _cb.forEach(cb => cb(...arg));
        }
    }
    removeListener(type, cb) {
        let _cb = this._events[type];
        if (_cb instanceof Function) {
            delete this._events[type];
        } else if (_cb instanceof Array) {
            let index = _cb.indexOf(cb);
            if (index !== -1) {
                _cb.splice(index, 1);
            }
        }
    }
}

if (typeof require === 'function') {
    module.exports = Events;
} else {
    try {
        export default Events;   
    } catch (err) {
        window.Events = Events;
    }
}