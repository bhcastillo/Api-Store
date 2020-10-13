"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
//Routes
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = express_1.default();
//Settings
app.set('PORT', process.env.PORT || 3000);
//Middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
//Routes
app.use('/api', routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map