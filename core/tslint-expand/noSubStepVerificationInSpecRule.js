"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var CLASS_NAME_SPEC = 'e2e-spec.ts';
var SUB_STEP = '.subStep';
var SUB_VERIFICATION = 'subVerification';
var REPLACE_SUB_STEP = '.step';
var REPLACE_SUB_VERIFICATION = '.verification';
var FAILURE_STRING_SUB_STEP = '"step" should be used instead of "subStep" in spec class';
var FAILURE_STRING_SUB_VERIFICATION = '"verification" should be used instead of "subVerification" in spec class';
var REGEX = new RegExp("(\\" + SUB_STEP + "|\\" + SUB_VERIFICATION + ")");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSubStepVerificationInSpecWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoSubStepVerificationInSpecWalker = (function (_super) {
    __extends(NoSubStepVerificationInSpecWalker, _super);
    function NoSubStepVerificationInSpecWalker(sourceFile, options) {
        return _super.call(this, sourceFile, options) || this;
    }
    NoSubStepVerificationInSpecWalker.prototype.visitCallExpression = function (node) {
        if (node.getSourceFile().fileName.includes(CLASS_NAME_SPEC)) {
            var text = node.getText();
            var match = text.match(REGEX);
            if (match && node.arguments.length === 1) {
                var firstChar = match.input.charAt(match.index + 4);
                var errorStart = node.getStart() + match.index;
                var fix = Lint.Replacement.replaceFromTo(errorStart, errorStart + (this.isStep(firstChar) ? SUB_STEP.length : SUB_VERIFICATION.length), this.isStep(firstChar) ? REPLACE_SUB_STEP : REPLACE_SUB_VERIFICATION);
                this.addFailureAt(node.getStart() + match.index, this.isStep(firstChar) ? SUB_STEP.length : SUB_VERIFICATION.length, this.isStep(firstChar) ? FAILURE_STRING_SUB_STEP : FAILURE_STRING_SUB_VERIFICATION, fix);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoSubStepVerificationInSpecWalker.prototype.isStep = function (firstChar) {
        return firstChar.toLowerCase() === 's';
    };
    return NoSubStepVerificationInSpecWalker;
}(Lint.RuleWalker));
exports.NoSubStepVerificationInSpecWalker = NoSubStepVerificationInSpecWalker;
