# Twilio Flex - Google Dialogflow

This project is to showcase how to connect Google Dialogflow into Twilio Flex.

### Prerequisites

Before you can get started you will need the following:
* [Google Dialogflow](https://cloud.google.com/dialogflow/)
* [Service Account Key in JSON](https://dialogflow.com/docs/reference/v2-auth-setup)

#### Setup Twilio

0. Go to the ./twilio/flex/plugin-dialogflow folder and 

```console
npm build
```

the asset. The output should be plugin-dialogflow.js

1. Go to [Twilio Assets](https://www.twilio.com/console/assets/public) and import the following:
- Your Service Account Key as the file name <em>google-dialogflow-service-account-key.json</em>
-- Enable Make Private
- plugin-dialogflow.js

2. Go to [Twilio Functions - Configure](https://www.twilio.com/console/functions/configure)

3. Add the following Environment Variables:

| Key                          	| Value    	|
|------------------------------	|----------	|
| GOOGLE_DIALOGFLOW_PROJECT_ID 	| ******** 	|

4. Add the following Dependencies:
- google-oauth-jwt
- request-promise

5. Go to [Twilio Functions](https://www.twilio.com/console/functions/manage) and deploy the functions in the ./twilio/functions directory.

**The function paths should match the function file names**

6. Go to [Twilio Studio](https://www.twilio.com/console/studio/dashboard) and import the studio flows in the ./twilio/studio directory.

**When you import the studio flow you might have to change the Run Function Widget's <em>Function URL</em>**

7. Go to [Twilio Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming) and select your Flex Phone Number. 

8. Under <em>A CALL COMES IN</em> select **Studio Flow** **Google-Dialogflow-Voice-IVR**.

9. Go to [Twilio Flex - Messaging](https://www.twilio.com/console/flex/messaging).

10. Under <em>Manager Flex Flows</em> have the following:

| CHANNEL 	| IDENTITY                            	| FRIENDLY NAME               	| INTEGRATION TYPE 	| CONFIGURATION                    	|
|---------	|-------------------------------------	|-----------------------------	|------------------	|----------------------------------	|
| sms     	| +1XXXXXXXXXX                        	| Flex Messaging Channel Flow 	| Studio           	| Google-Dialogflow-Messaging-Flow 	|
| web     	| FOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 	| Flex Web Channel Flow       	| Studio           	| Google-Dialogflow-Webchat-Flow   	|

## Testing 

I would highly recommend running the google-dialogflow-test function to test to see if you get a response from Dialogflow.

## Author

* **Anthony Wong**