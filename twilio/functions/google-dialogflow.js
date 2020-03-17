const rp = require("request-promise");
const googleAuth = require('google-oauth-jwt');
const dialogflowCreds = JSON.parse(Runtime.getAssets()['google-dialogflow-service-account-key.json'].open());
    
exports.handler = function(context, event, callback) {
    /*
     * If we are not giving a session id then
     * we will make a create a session id that is epoch. 
     */
    const sessionId = event.sessionId ? event.sessionId : Date.now();
    const message = event.message;
    const jwt = event.jwt;
    
    if(jwt) {
        driver(context, callback, sessionId, message, jwt);
    } else {
        generateAccessToken().then(jwt => {
            driver(context, callback, sessionId, message, jwt);
        }).catch(error => {
            callback(error);
        })
    }
};

const driver = (context, callback, sessionId, message, jwt) => {
    rp({
        method: "POST",
        uri: 'https://dialogflow.googleapis.com/v2/projects/' + context.GOOGLE_DIALOGFLOW_PROJECT_ID + '/agent/sessions/' + sessionId +':detectIntent',
        headers: {
            'Authorization': 'Bearer ' + jwt,
            'Content-Type': 'application/json'
        },
        body: {
            "query_input": {
                "text": {
                  "text": message,
                  "language_code": "en-US"
                }
            }
        },
        json: true
    }).then(response => {
        const googleResponse = response;
        
        const {queryResult} = googleResponse;
        const {intent} = queryResult;
        const currentIntent = intent.displayName;
        const context = queryResult.parameters;
        
        const googleMessage = queryResult.fulfillmentText;
        
        callback(null, {
            googleMessage, googleResponse, sessionId, currentIntent, context
        });
    }).catch(error => {
        callback(error);
    })
}

const generateAccessToken = () => {
    return new Promise((resolve, reject) => {
        googleAuth.authenticate({
            email: dialogflowCreds.client_email,
            key: dialogflowCreds.private_key,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            },(error, token) => {
                token ? resolve(token) : reject(error);
            }
        );
    });
}