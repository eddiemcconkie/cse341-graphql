"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertId = void 0;
// Return an object with an id string attribute in place of Mongo's ObjectId
const convertId = (data) => (Object.assign(Object.assign({}, data), { id: data._id.toString() }));
exports.convertId = convertId;
//# sourceMappingURL=helpers.js.map