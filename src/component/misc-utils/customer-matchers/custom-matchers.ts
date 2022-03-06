import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
export const CustomMatchers: CustomMatcherFactories = {
    toBeAscending: function (): CustomMatcher {
        return {
            compare: function (actual: any[]): CustomMatcherResult {
                const expected = actual.slice().sort((a: string, b: string) => {
                    return a.localeCompare(b);
                });
                return {
                    pass: jasmine.matchersUtil.equals(actual, expected)
                };
            }
        };
    },
    toBeDescending: function (): CustomMatcher {
        return {
            compare: function (actual: any[]): CustomMatcherResult {
                const expected = actual.slice().sort((a: string, b: string) => {
                    return a.localeCompare(b);
                }).reverse();
                return {
                    pass: jasmine.matchersUtil.equals(actual, expected)
                };
            }
        };
    }
};
