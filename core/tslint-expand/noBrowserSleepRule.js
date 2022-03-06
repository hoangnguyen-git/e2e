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
        return this.applyWithWalker(new NoBrowserSleepWalker(sourceFile, this.getOptions()));
    };
    Rule.BROWSER_SLEEP_EXCLUDED_FILES = [
        'page-helper.ts',
        'static-wait-helper.ts',
    ];
    Rule.BROWSER_SLEEP_FAILURE_STRING = 'Use of browser.sleep forbidden';
    Rule.BROWSER_SLEEP_EXPRESSION_TO_BE_SEARCHED = 'browser';
    Rule.BROWSER_SLEEP_EXPRESSION_NAME_TEXT = 'sleep';
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoBrowserSleepWalker = (function (_super) {
    __extends(NoBrowserSleepWalker, _super);
    function NoBrowserSleepWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoBrowserSleepWalker.prototype.visitPropertyAccessExpression = function (node) {
        if (!this.isSourceFileExcluded(node.getSourceFile().fileName)
            && node.expression.getText() === Rule.BROWSER_SLEEP_EXPRESSION_TO_BE_SEARCHED
            && node.name.getText() === Rule.BROWSER_SLEEP_EXPRESSION_NAME_TEXT) {
            this.addFailureAt(node.getStart(), node.getWidth(), Rule.BROWSER_SLEEP_FAILURE_STRING);
        }
        _super.prototype.visitPropertyAccessExpression.call(this, node);
    };
    NoBrowserSleepWalker.prototype.isSourceFileExcluded = function (fileName) {
        for (var _i = 0, _a = Rule.BROWSER_SLEEP_EXCLUDED_FILES; _i < _a.length; _i++) {
            var fileItem = _a[_i];
            if (fileName.includes(fileItem)) {
                return true;
            }
        }
        return false;
    };
    return NoBrowserSleepWalker;
}(Lint.RuleWalker));
