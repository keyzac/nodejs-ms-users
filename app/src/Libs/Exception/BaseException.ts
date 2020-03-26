import { Exception } from 'ts-httpexceptions';
import HttpStatusCode from '../CommonResources/HttpStatusCode';
import { APP_STATUS_CODE } from '../../Users/Infrastructure/Services/Util/AppStatusCode';

export class BaseException extends Exception {
  codeHttp: number = HttpStatusCode.BAD_REQUEST;
  codeApp: number = APP_STATUS_CODE.errorBadParams;
  message: string;
  data: object[];
  previous: Exception;

  constructor(codeHttp = HttpStatusCode.BAD_REQUEST, message?: string, codeApp?: number, data?: object[], previous?: Exception) {
    super(codeHttp, message, previous);
    this.codeHttp = codeHttp;
    this.codeApp = codeApp;
    this.message = message;
    this.data = data;
    this.previous = previous;
  }
  get getCodeHttp(): number {
    return this.codeHttp;
  }
  get getCodeApp(): number {
    return this.codeApp;
  }
  get getMessage(): string {
    return this.message;
  }
  get getData(): object[] {
    return this.data;
  }
  get getPrevious(): Exception {
    return this.previous;
  }
}
