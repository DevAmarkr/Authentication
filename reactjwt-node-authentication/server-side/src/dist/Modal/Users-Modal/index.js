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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "username should not be empty"],
        min: 5,
        max: 10,
    },
    email: {
        type: String,
        required: [true, "email should not be empty"]
    },
    password: {
        type: String,
        min: 6,
        required: [true, "password should not be empty"]
    },
    tokens: []
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.isNew) {
                let salt = yield bcryptjs_1.default.genSalt(10);
                let hash = yield bcryptjs_1.default.hash(this.password, salt);
                this.password = hash;
                next();
            }
        }
        catch (error) {
            next(error);
        }
    });
});
UserSchema.methods.genrateToken = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        let payload = {
            userId: this._id
        };
        let token = jsonwebtoken_1.default.sign(payload, 'insta_akode69');
        user.tokens.push({ token });
        yield user.save();
        return token;
    });
};
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=index.js.map