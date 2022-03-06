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
var EXPECTATION_HELPER_CLASS_NAME = 'expectation-helper.ts';
var FAILURE_STRING_VERIFICATION = 'All expect methods should be moved to expectation-helper class';
var EXPECT = 'expect';
var REGEX = new RegExp(EXPECT + "\\(");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ExpectationHelperWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ExpectationHelperWalker = (function (_super) {
    __extends(ExpectationHelperWalker, _super);
    function ExpectationHelperWalker(sourceFile, options) {
        return _super.call(this, sourceFile, options) || this;
    }
    ExpectationHelperWalker.prototype.visitCallExpression = function (node) {
        if (!node.getSourceFile().fileName.includes(EXPECTATION_HELPER_CLASS_NAME)) {
            var text = node.getText();
            var match = text.match(REGEX);
            if (match && node.arguments.length === 1) {
                this.addFailureAt(node.getStart() + match.index, EXPECT.length, FAILURE_STRING_VERIFICATION);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return ExpectationHelperWalker;
}(Lint.RuleWalker));
exports.ExpectationHelperWalker = ExpectationHelperWalker;
