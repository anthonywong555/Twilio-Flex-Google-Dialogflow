const dialogflow = require('@google-cloud/dialogflow');

let serverlessHelper = null;

exports.handler = async (context, event, callback) => {
  try {
    const twilioClient = require('twilio')(context.ACCOUNT_SID, context.AUTH_TOKEN);
    await loadServerlessModules();

    const isEventValid = await validateEvent(event);

    if(isEventValid !== true) {
      throw isEventValid;
    } else {
      const result = await driver(context, event, twilioClient);
      return result;
    }

  } catch(e) {
    throw e;
  }
}

const loadServerlessModules = async () => {
  try {
    const functions = Runtime.getFunctions();

    const serverlessHelperPath = functions['private/boilerplate/helper'].path;
    serverlessHelper = require(serverlessHelperPath);
  } catch (e) {
    throw e;
  }
}

const validateEvent = async (serverlessEvent) => {
  try {
    return true;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'validateEvent', e);
  }
}

const driver = async(serverlessContext, serverlessEvent, twilioClient) => {
  try {
    const sessionClient = new dialogflow.SessionsClient();
  } catch (e) {

  }
}