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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoExpectsWalker(sourceFile, this.getOptions()));
    };
    Rule.STATIC_WAIT_FAILURE_STRING = 'StaticWait statement forbidden';
    Rule.STATIC_WAIT_EXPRESSION_TO_BE_SEARCHED = 'StaticWait.waitForMillSec';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoExpectsWalker = (function (_super) {
    __extends(NoExpectsWalker, _super);
    function NoExpectsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoExpectsWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === Rule.STATIC_WAIT_EXPRESSION_TO_BE_SEARCHED) {
            this.addFailureAt(node.getStart(), node.getWidth(), Rule.STATIC_WAIT_FAILURE_STRING);
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoExpectsWalker;
}(Lint.RuleWalker));
