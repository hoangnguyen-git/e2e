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
var CLASS_NAME = 'helper.ts';
var STEP = '.step';
var VERIFICATION = '.verification';
var REPLACE_STEP = '.subStep';
var REPLACE_VERIFICATION = '.subVerification';
var FAILURE_STRING_STEP = '"subStep" should be used instead of "step" in helper class';
var FAILURE_STRING_VERIFICATION = '"subVerification" should be used instead of "verification" in helper class';
var REGEX = new RegExp("(\\" + STEP + "|\\" + VERIFICATION + ")");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoStepVerificationInHelperWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoStepVerificationInHelperWalker = (function (_super) {
    __extends(NoStepVerificationInHelperWalker, _super);
    function NoStepVerificationInHelperWalker(sourceFile, options) {
        return _super.call(this, sourceFile, options) || this;
    }
    NoStepVerificationInHelperWalker.prototype.visitCallExpression = function (node) {
        if (node.getSourceFile().fileName.includes(CLASS_NAME)) {
            var text = node.getText();
            var match = text.match(REGEX);
            if (match && node.arguments.length === 1) {
                var firstChar = match.input.charAt(match.index + 1);
                var errorStart = node.getStart() + match.index;
                var fix = Lint.Replacement.replaceFromTo(errorStart, errorStart + (this.isStep(firstChar) ? STEP.length : VERIFICATION.length), this.isStep(firstChar) ? REPLACE_STEP : REPLACE_VERIFICATION);
                this.addFailureAt(node.getStart() + match.index, (this.isStep(firstChar) ? STEP.length : VERIFICATION.length), this.isStep(firstChar) ? FAILURE_STRING_STEP : FAILURE_STRING_VERIFICATION, fix);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoStepVerificationInHelperWalker.prototype.isStep = function (firstChar) {
        return firstChar === 's';
    };
    return NoStepVerificationInHelperWalker;
}(Lint.RuleWalker));
exports.NoStepVerificationInHelperWalker = NoStepVerificationInHelperWalker;
