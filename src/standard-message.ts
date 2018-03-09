import * as HttpStatus from 'http-status-codes';

export function standardMessage(code: number) {
  let message = 'Unknown Error';
  if (code === HttpStatus.INTERNAL_SERVER_ERROR) {
    message = 'Ooops, something wrong with server';
  } else if (code === HttpStatus.BAD_REQUEST) {
    message = 'You sent a bad request';
  }
  return { message };
}
