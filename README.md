# Install
npm i events.io

```js
const { performance } = require('perf_hooks');
const Events = require('events')
const Eventsio = require('events.io')

const e = new Events;
const eio = new Eventsio;

e_count = 0;
e.on('event', v => {
    e_count++;
})
eio_count = 0;
eio.on('event', v => {
    eio_count++;
})

performance.mark('A');
for(var i = 0; i < 1000000000; i++) {
    e.emit('event', i);
}
performance.mark('B');
performance.measure('A to B', 'A', 'B');
console.log(performance.getEntriesByName('A to B')[0].duration, e_count);

performance.mark('A1');
for(var i = 0; i < 1000000000; i++) {
    eio.emit('event', i);
}
performance.mark('B1');
performance.measure('A1 to B1', 'A1', 'B1');
console.log(performance.getEntriesByName('A1 to B1')[0].duration, eio_count);
```

17028.395446 1000000000 vs 2687.976419 1000000000 more 6x
