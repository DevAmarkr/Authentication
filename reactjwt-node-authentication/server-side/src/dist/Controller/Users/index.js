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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../Middleware/Users-Middlware/index"));
const index_2 = __importDefault(require("../../Modal/Users-Modal/index"));
const Router = express_1.default.Router();
Router.post('/register', index_1.default.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield index_2.default.insert(req.body);
        if (data.hasOwnProperty('errors')) {
            throw 'Error';
        }
        res.status(201).json({
            message: "Success",
            status: true,
            response: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Fail",
            status: false,
            response: error,
        });
    }
}));
Router.post('/login', (req, res) => { });
Router.post('/forgetPassword', (req, res) => { });
Router.post('/VerifyPassword', (req, res) => { });
exports.default = Router;
//# sourceMappingURL=index.js.map