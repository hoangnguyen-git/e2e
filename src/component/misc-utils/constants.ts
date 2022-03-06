export class Constants {
  static readonly MAX_RETRY_ATTEMPTS = 3;
  static readonly EMPTY_STRING = '';
  static readonly none = 'None';
  static readonly MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  static get separators() {
    return {
      comma: ',',
      semiColon: ';',
      apostrophe: '\'',
      pipe: '|',
    };
  }

  static get httpStatusCodes() {
    return {
      success: 200,
      badRequest: 400,
      unauthorized: 401,
      forbidden: 403,
      notFound: 404,
      internalServerError: 500,
      serviceUnavailable: 503,
      gatewayTimeout: 504,
    };
  }

  static get number() {
    return {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      oneHundred: 100,
      minorTwoHundred: -200,
      minorEightHundred: -800
    };
  }

  static get dateFormats() {
    return {
      mmddyyyy: 'MM-DD-YYYY',
    };
  }

  public static get filesUpload() {
    return {
      txtTestFile: 'testfile.txt',
      OB_OrgParty_NOHeader: 'OB_OrgParty_NOHeader.csv',
      OB_WithHeader: 'OB_WithHeader.csv'
    };
  }
}
