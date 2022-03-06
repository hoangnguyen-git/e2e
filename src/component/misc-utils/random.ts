export class Random {
    static getRandomString(size: number) {
        let randomText = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < size; i++) {
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomText;
    }

    static getRandomNumber(size: number) {
        let randomNumber = '';
        const possible = '0123456789';

        for (let i = 0; i < size; i++) {
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomNumber;
    }
}
