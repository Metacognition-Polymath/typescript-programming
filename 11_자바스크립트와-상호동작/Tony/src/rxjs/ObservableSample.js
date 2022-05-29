"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const observable = new rxjs_1.Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});
console.log('just before subscribe');
observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});
console.log('just after subscribe');
const obj1 = {
    a: 1,
    b: 'a'
};
console.log('ATypeDeclaration obj1', obj1);
