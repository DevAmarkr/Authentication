"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Users_1 = __importDefault(require("./Controller/Users"));
// const env = require('../.env')
const app = express_1.default();
const Port = process.env.PORT || 2021;
//Server initial dev-setup middleware
app.use(morgan_1.default('combined'));
app.use(cors_1.default());
app.use(express_1.default.json());
/* Server route aka APIs*/
app.get('/', (req, res) => {
    res.send({
        name: "React-Express Authentication"
    });
});
app.use('/user', Users_1.default);
app.listen(Port, () => console.log(`Server is running on ${Port} and Db on `));
//# sourceMappingURL=Server.js.map