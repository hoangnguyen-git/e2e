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
        return this.applyWithWalker(new NoInvalidUsageByTagnameWalker(sourceFile, this.getOptions()));
    };
    Rule.INVALID_USAGE_BY_TAGNAME_FAILURE_STRING = 'Usage of Invalid Tagname value when using by.tagname is forbidden';
    Rule.INVALID_USAGE_BY_TAGNAME_EXPRESSION_TO_BE_SEARCHED = 'by.tagName';
    Rule.INVALID_USAGE_BY_TAGNAME_REGEX = /^[a-z](-?[a-z0-9]+)*$/i;
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoInvalidUsageByTagnameWalker = (function (_super) {
    __extends(NoInvalidUsageByTagnameWalker, _super);
    function NoInvalidUsageByTagnameWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoInvalidUsageByTagnameWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.getText() === Rule.INVALID_USAGE_BY_TAGNAME_EXPRESSION_TO_BE_SEARCHED) {
            var tagText = node.arguments[0].getText();
            var tagTextWithoutQuotes = tagText.substring(1, tagText.length - 1);
            if (this.isInvalidTagValue(tagTextWithoutQuotes)) {
                this.addFailureAt(node.getStart(), node.getWidth(), Rule.INVALID_USAGE_BY_TAGNAME_FAILURE_STRING);
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoInvalidUsageByTagnameWalker.prototype.isInvalidTagValue = function (tagValue) {
        return !tagValue.match(Rule.INVALID_USAGE_BY_TAGNAME_REGEX);
    };
    return NoInvalidUsageByTagnameWalker;
}(Lint.RuleWalker));
