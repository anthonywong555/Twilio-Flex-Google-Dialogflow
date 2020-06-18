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
    const googleCreds = loadGoogleCreds(serverlessContext);
    const response = await sendToTranslate(serverlessContext, serverlessEvent, googleCreds);
    const result = formatGoogleResponse(serverlessContext, response);
    return result;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'driver', e);
  }
}

const loadGoogleCreds = (serverlessContext) => {
  try {
    const googleCreds = JSON.parse(
      Runtime.getAssets()[serverlessContext.GOOGLE_TRANSLATE_CREDS_PATH].open()
    );

    const result = {
      credentials: {
        client_email: googleCreds.client_email,
        private_key: googleCreds.private_key
      },
      projectId: googleCreds.project_id
    };
    return result;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'loadGoogleCreds', e);
  }
}

const sendToTranslate = async (serverlessContext, serverlessEvent, googleCreds) => {
  try {
    const translationClient = new TranslationServiceClient(googleCreds);
    const {text} = serverlessEvent;
    const projectId = serverlessEvent.projectId ? serverlessEvent.projectId : googleCreds.projectId;
    const location = serverlessEvent.location ? serverlessEvent.location : 'us-central1';
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };

    const [response] = await translationClient.detectLanguage(request);
    return response;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'sendToTranslate', e);
  }
}

const formatGoogleResponse = (serverlessContext, googleResponse) => {
  try {
    const result = {
      ...googleResponse
    }
    return result;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'formatGoogleResponse', e);
  }
}