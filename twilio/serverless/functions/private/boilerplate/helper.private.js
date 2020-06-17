const formatErrorMsg = (serverlessContext, functionName, errorMsg) => {
  return `
    Twilio Function Path: ${serverlessContext.PATH} \n 
    Function Name: ${functionName} \n 
    Error Message: ${errorMsg}
  `;
}

module.exports = {formatErrorMsg};