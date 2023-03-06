export class APIResponse<T> {
  private success: boolean = true;
  private data: T = "API Alive" as T;

  constructor(_success?: boolean, _data?: T) {
    if(_success !== undefined) this.success = _success;
    if(_data !== undefined) this.data = _data;
  }

  public json() {
    return ({
      success: this.success,
      data: this.data
    })
  }
}

export default APIResponse;