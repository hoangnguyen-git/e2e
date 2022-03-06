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
        return this.applyWithWalker(new NoLargeTimeoutWalker(sourceFile, this.getOptions()));
    };
    Rule.LARGE_TIMEOUT_FAILURE_STRING = 'Use of Timeout greater then medium duration is not preferred.';
    Rule.LARGE_TIMEOUT_ACCEPTED_TIMEOUTS = ['xs', 'xxs', 'xxxs', 's', 'm'];
    Rule.LARGE_TIMEOUT_EXPRESSION_TO_BE_SEARCHED = 'PageHelper.timeout';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoLargeTimeoutWalker = (function (_super) {
    __extends(NoLargeTimeoutWalker, _super);
    function NoLargeTimeoutWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoLargeTimeoutWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (node.expression.getText() === Rule.LARGE_TIMEOUT_EXPRESSION_TO_BE_SEARCHED
            && !(Rule.LARGE_TIMEOUT_ACCEPTED_TIMEOUTS.includes(node.name.getText()))) {
            this.addFailureAt(node.getStart(), node.getWidth(), Rule.LARGE_TIMEOUT_FAILURE_STRING);
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    return NoLargeTimeoutWalker;
}(Lint.RuleWalker));
