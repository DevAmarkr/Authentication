"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
const env = require('../.env');
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default
    .connect(env.databaseURL, { useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch((err) => console.log('not connected'));
exports.default = mongoose_1.default;
//# sourceMappingURL=index.js.map