"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
class AlexaSkill {
    constructor(dialogManager, dialogSet) {
        this.dialogManager = dialogManager;
        this.dialogSet = dialogSet;
    }
    handler() {
        return this.dialogManager.handler();
    }
}
exports.AlexaSkill = AlexaSkill;
__export(require("./dialog-management/default/DefaultAlexaDialogManager"));
__export(require("./dialog-management/default/InteractionExecutor"));
__export(require("./dialog-management/default/InteractionMatcher"));
//# sourceMappingURL=index.js.map