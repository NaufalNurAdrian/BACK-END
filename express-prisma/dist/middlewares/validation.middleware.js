"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("username is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("invalid format"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 3 }),
    // .isStrongPassword()
    (0, express_validator_1.body)("confirm password")
        .notEmpty()
        .withMessage("confirm password is required")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password did not match");
        }
        return true;
    }),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
