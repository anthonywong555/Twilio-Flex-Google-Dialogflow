const rp = require("request-promise");
const googleAuth = require('google-oauth-jwt');
const dialogflowCreds = JSON.parse(Runtime.getAssets()['google-dialogflow-service-account-key.json'].open());
    
exports.handler = function(context, event, callback) {
    generateAccessToken().then(jwt => {
        const epochNow = Date.now();
        return rp({
            method: "POST",
            uri: 'https://dialogflow.googleapis.com/v2/projects/' + context.GOOGLE_DIALOGFLOW_PROJECT_ID + '/agent/sessions/'+ epochNow +':detectIntent',
            headers: {
                'Authorization': 'Bearer ' + jwt,
                'Content-Type': 'application/json'
            },
            body: {
                "query_input": {
                    "text": {
                      "text": "Hi",
                      "language_code": "en-US"
                    }
                }
            },
            json: true
        });
    }).then(response => {
        callback(null, response);    
    }).catch(error => {
        console.log(error);
        callback(null, error);
    });
};

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