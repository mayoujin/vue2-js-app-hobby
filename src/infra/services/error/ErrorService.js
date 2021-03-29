export class ErrorService {
  constructor() {
    this.constructor.initHandler()
  }

  static onError(error) {
    const response = error.response
    if (response && response.status >= 400 && response.status < 405) {
      // You can handle this differently
      ErrorService.sentryLogEngine(error)
      return false
    }
    // Send Error to Log Engine e.g LogRocket
    ErrorService.logRocketLogEngine(error)
  }

  onError(error) {
    this.constructor.onError(error)
  }

  static onWarn(error) {
    // Send Error to Log Engine e.g LogRocket
    this.logRocketLogEngine(error)
  }

  static onInfo(error) {
    // You can handle this differently
    this.sentryLogEngine(error)
  }

  static onDebug(error) {
    const response = error.response
    if (response && response.status >= 400 && response.status < 405) {
      // You can handle this differently
      this.sentryLogEngine(error)
      return false
    }
    // Send Error to Log Engine e.g LogRocket
    this.logRocketLogEngine(error)
  }

  static initHandler() {
    const scope = this
    window.onerror = (message, url, lineNo, columnNo, error) => {
      console.log(error, 'test')
      if (error) {
        scope.onError(error)
        console.error(message, url, lineNo, columnNo, error)
      }
    }
  }

  static displayErrorAlert(message) {}

  static logRocketLogEngine(error) {
    // Implement LogRocket Engine here
    console.error(error, 'LogRocket')
  }

  static sentryLogEngine(error) {
    // Implement Sentry Engine here
    console.error(error, 'Sentry')
  }
}
