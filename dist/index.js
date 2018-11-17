"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metaSPA = window.metaSPA;
exports.metaSPA = metaSPA;
var bootstrap = function (config) {
    if (!window.metaSPA) {
        throw new Error("You are not running without any MetaSPA provider");
    }
    window.metaSPA.metaSPALoad.call(undefined, config);
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map