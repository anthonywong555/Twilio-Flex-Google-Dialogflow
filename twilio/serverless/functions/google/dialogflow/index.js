'use strict';

const dialogflow = require('@google-cloud/dialogflow');

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
    // Load Google Creds from Assets
    const googleCreds = loadGoogleCreds(serverlessContext);
    const response = await sendToDialogFlow(serverlessContext, serverlessEvent, googleCreds);
    const result = formatGoogleResponse(serverlessContext, response);
    return result;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'driver', e);
  }
}

const loadGoogleCreds = (serverlessContext) => {
  try {
    const googleCreds = JSON.parse(
      Runtime.getAssets()[serverlessContext.GOOGLE_DIALOGFLOW_CREDS].open()
    );
    return googleCreds;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'loadGoogleCreds', e);
  }
}

const sendToDialogFlow = async (serverlessContext, serverlessEvent, googleCreds) => {
  try {
    const projectId = googleCreds.project_id;
    const {sessionId, languageCode, query, contexts} = serverlessEvent;

    const client = new dialogflow.SessionsClient({'credentials': googleCreds});
    const formattedSession = client.projectAgentSessionPath(projectId , sessionId);
    const request = {
      session: formattedSession,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts,
      };
    }

    const responses = await client.detectIntent(request);
    const response = responses[0];
    return response;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'sendToDialogFlow', e);
  }
}

const formatGoogleResponse = (serverlessContext, googleResponse) => {
  try {
    const {queryResult} = googleResponse;
    const text = queryResult.fulfillmentMessages[0].text.text.join('\n');
    const intent = queryResult.intent.displayName;
    const language = queryResult.languageCode;
    const result = {
      text,
      intent,
      language
    };
    return result;;
  } catch (e) {
    throw serverlessHelper.formatErrorMsg(serverlessContext, 'formatGoogleResponse', e);
  }
}