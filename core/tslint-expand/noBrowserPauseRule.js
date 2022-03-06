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
        return this.applyWithWalker(new NoBrowserPauseWalker(sourceFile, this.getOptions()));
    };
    Rule.BROWSER_PAUSE_FAILURE_STRING = 'Use of browser.pause is forbidden';
    Rule.BROWSER_PAUSE_EXPRESSION_TO_BE_SEARCHED = 'browser';
    Rule.BROWSER_PAUSE_EXPRESSION_NAME_TEXT = 'pause';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoBrowserPauseWalker = (function (_super) {
    __extends(NoBrowserPauseWalker, _super);
    function NoBrowserPauseWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoBrowserPauseWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (node.expression.getText() === Rule.BROWSER_PAUSE_EXPRESSION_TO_BE_SEARCHED
            && node.name.getText() === Rule.BROWSER_PAUSE_EXPRESSION_NAME_TEXT) {
            this.addFailureAt(node.getStart(), node.getWidth(), Rule.BROWSER_PAUSE_FAILURE_STRING);
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    return NoBrowserPauseWalker;
}(Lint.RuleWalker));
