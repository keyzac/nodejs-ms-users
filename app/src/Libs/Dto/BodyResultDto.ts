export class ResultDto {
  constructor(
    private _data: any = {},
    private _code: number = 1000,
    private _message: string = 'Petición exitosa.',
  ) {
    this._code = _code;
    this._message = _message;
    this._data = _data;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get data(): object {
    return this._data;
  }

  set data(value: object) {
    this._data = value;
  }

  get code(): number {
    return this._code;
  }

  set code(value: number) {
    this._code = value;
  }

  get body() {
    return {
      'code': this.code,
      'message': this.message,
      'data': this.data
    }
  }
}
