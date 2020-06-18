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
    const googleCreds = loadGoogleCreds();
    const response = await sendToTranslate(serverlessContext, serverlessEvent, googleCreds);
    const result = formatGoogleResponse(response);
    return result;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'driver', e);
  }
}

const loadGoogleCreds = () => {
  try {
    const googleCreds = JSON.parse(
      Runtime.getAssets()['/google-dialogflow-service-account-key.json'].open()
    );
    return googleCreds;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'loadGoogleCreds', e);
  }
}

const sendToTranslate = async (serverlessContext, serverlessEvent, googleCreds) => {
  try {
    const translationClient = new TranslationServiceClient(googleCreds);
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };

    const [response] = await translationClient.detectLanguage(request);

    console.log('Detected Languages:');
    for (const language of response.languages) {
      console.log(`Language Code: ${language.languageCode}`);
      console.log(`Confidence: ${language.confidence}`);
    }
    
    return response;

  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'sendToDialogFlow', e);
  }
}

const formatGoogleResponse = (serverlessContext, googleResponse) => {
  try {
    const result = {};
    return googleResponse
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'formatGoogleResponse', e);
  }
}