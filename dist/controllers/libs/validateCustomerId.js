"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomerId = void 0;
const database_1 = require("../../database");
exports.validateCustomerId = (req, res, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield database_1.connect();
        const validateCustomerId = yield conn.query(`SELECT id FROM customer WHERE id = ${customerId}`);
    }
    catch (error) {
        return res.status(400).json({ message: 'customer id not valid' });
    }
});
//# sourceMappingURL=validateCustomerId.js.map