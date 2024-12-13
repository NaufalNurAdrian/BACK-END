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
exports.checkaAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // const token = req.header("Authorization")?.replace("Bearer ", "");
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token)
            throw "Unauthorize!";
        const verifyUser = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY);
        req.user = verifyUser;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(200).send(err);
    }
});
exports.verifyToken = verifyToken;
const checkaAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) == "Admin") {
        next();
    }
    else {
        res.status(403).send("Access Denied");
    }
};
exports.checkaAdmin = checkaAdmin;
