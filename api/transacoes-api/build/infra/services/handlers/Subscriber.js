"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
class Subscriber {
    async handle(message) {
        console.log(`SaldoHandler: ${JSON.stringify(message)}`);
    }
    subscribe(serviceBus) {
        serviceBus.subscribe(this);
    }
}
exports.Subscriber = Subscriber;
//# sourceMappingURL=Subscriber.js.map