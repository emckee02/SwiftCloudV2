"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMonth = void 0;
const isValidMonth = (month) => {
    const months = ['June', 'July', 'August'];
    const isValid = months.find((m) => m === month);
    return isValid ? true : false;
};
exports.isValidMonth = isValidMonth;
//# sourceMappingURL=utils.js.map