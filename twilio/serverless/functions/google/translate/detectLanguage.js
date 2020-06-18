'use strict';

const {TranslationServiceClient} = require('@google-cloud/translate');

let serverlessHelper = null;

exports.handler = async (context, event, callback) => {
  try {
    const twilioClient = require('twilio')(context.ACCOUNT_SID, context.AUTH_TOKEN);
    await loadServerlessModules();

    const result = await driver(context, event, twilioClient);
    return callback(null, result);

  } catch(e) {
    return callback(e);
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

const driver = async(serverlessContext, serverlessEvent, twilioClient) => {
  try {

  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'driver', e);
  }
}