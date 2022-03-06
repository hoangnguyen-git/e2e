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
        return this.applyWithWalker(new NoInvalidUsageByIdWalker(sourceFile, this.getOptions()));
    };
    Rule.INVALID_USAGE_BY_ID_FAILURE_STRING = 'Usage of Invalid ID value when using by.id is forbidden';
    Rule.INVALID_USAGE_BY_ID_EXPRESSION_TO_BE_SEARCHED = 'By.id';
    Rule.INVALID_USAGE_BY_ID_REGEX = /^[A-Za-z]+[\w\-:.]*$/;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidUsageByIdWalker = (function (_super) {
    __extends(NoInvalidUsageByIdWalker, _super);
    function NoInvalidUsageByIdWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInvalidUsageByIdWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === Rule.INVALID_USAGE_BY_ID_EXPRESSION_TO_BE_SEARCHED) {
            var idText = node.arguments[0].getText();
            var idTextWithoutQuotes = idText.substring(1, idText.length - 1);
            if (this.isInvalidIDValue(idTextWithoutQuotes)) {
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.INVALID_USAGE_BY_ID_FAILURE_STRING);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidUsageByIdWalker.prototype.isInvalidIDValue = function (idValue) {
        return !idValue.match(Rule.INVALID_USAGE_BY_ID_REGEX);
    };
    return NoInvalidUsageByIdWalker;
}(Lint.RuleWalker));
