declare namespace jasmine {
    interface Matchers<T> {
        toBeAscending(expectationFailOutput?: any): boolean;
        toBeDescending(expectationFailOutput?: any): boolean;
    }
}
