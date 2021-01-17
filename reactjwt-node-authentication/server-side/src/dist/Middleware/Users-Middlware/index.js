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
const Joi_1 = __importDefault(require("Joi"));
const data = {
    validate: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const schema = Joi_1.default.object({
            email: Joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            username: Joi_1.default.string().alphanum().min(3).max(50).required(),
            password: Joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (err) {
            res.json(err.details[0].message.replace(/[^a-zA-Z]/g, ' ').trimStart());
        }
    })
};
// const validate = async(req:Request,res:Response,next:NextFunction) =>{
//    const schema = Joi.object({
//        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//        username:Joi.string().alphanum().min(3).max(50).required(),
//        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
//    })
//    try {
//     await schema.validateAsync(req.body);
//     next()
//    }
//    catch (err) {
//      res.json(err.details[0].message.replace(/[^a-zA-Z]/g,' ').trimStart())
//    }
// }
// // const confirmNewPassword = async(req:Request,res:Response,next:NextFunction) =>{
// //   next()
// // }
// // const isUser = async(req:Request,res:Response,next:NextFunction) =>{
// //     next()
// // }
// // const isEmailExist = async(req:Request,res:Response,next:NextFunction) =>{
// //     next()
// // }
exports.default = data;
//# sourceMappingURL=index.js.map