"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultForm = void 0;
const index_js_1 = require("../../contracts/src/index.js");
exports.defaultForm = useZodForm(index_js_1.contracts.auth.login.request, {
    defaultValues: {
        email: '',
        password: '',
        remember: false,
    },
});
// export type CreateResponse = {
//   user: Users;
// };
