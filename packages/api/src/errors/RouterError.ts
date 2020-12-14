export default class RouterError extends Error {
  status: number

  error?: Error

  /**
   * @param message - this will be displayed to end user,
   *                  import to not contain sensitive information
   */
  constructor(message: string, { status = 500, error }: { status?: number, error?: Error } = {}) {
    super(message)
    this.status = status
    this.error = error
  }
}
