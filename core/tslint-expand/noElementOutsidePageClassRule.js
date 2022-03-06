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
var CLASS_NAME_SPEC = 'po.ts';
var FAILURE_STRING_VERIFICATION = 'Elements with selectors should be inside po file';
var EXPECT = 'element';
var REGEX = new RegExp(EXPECT + "\\(");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoElementOutsidePageClassWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoElementOutsidePageClassWalker = (function (_super) {
    __extends(NoElementOutsidePageClassWalker, _super);
    function NoElementOutsidePageClassWalker(sourceFile, options) {
        return _super.call(this, sourceFile, options) || this;
    }
    NoElementOutsidePageClassWalker.prototype.visitCallExpression = function (node) {
        if (!node.getSourceFile().fileName.includes(CLASS_NAME_SPEC)) {
            var text = node.getText();
            var match = text.match(REGEX);
            if (match && node.arguments.length === 1) {
                this.addFailureAt(node.getStart() + match.index, EXPECT.length, FAILURE_STRING_VERIFICATION);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoElementOutsidePageClassWalker;
}(Lint.RuleWalker));
exports.NoElementOutsidePageClassWalker = NoElementOutsidePageClassWalker;
