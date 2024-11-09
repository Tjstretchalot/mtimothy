/**
 * The error class we usually throw
 */
export class CommonError {
  public readonly message: string;
  public readonly isHumanReadable: boolean;
  public readonly cause: CommonError | undefined;

  constructor(
    message: string,
    opts: {
      isHumanReadable: boolean;
      cause?: CommonError;
    }
  ) {
    this.message = message;
    this.isHumanReadable = opts.isHumanReadable;
    this.cause = opts.cause;
  }
}
