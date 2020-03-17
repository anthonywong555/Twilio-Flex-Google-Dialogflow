import React from 'react';

const taskListStyles = {
  padding: '10px',
  margin: '0px',
  color: '#fff',
  background: '#000',
};

const DialogFlow = (props) => {
  const {task} = props;

  let result;

  if(task.attributes.dialogflow) {
    result = (
      <span class="Twilio">
        <h1>DialogFlow Current Intent</h1>
        <div>{task.attributes.dialogflow.currentIntent}</div>
        <h1>DialogFlow Context</h1>
        <div>{task.attributes.dialogflow.context}</div>
        <hr />
      </span>
    );
  } else {
    result= (
      <div>
          Placeholder of DialogFlow Data
      </div>
    );
  }

  return result;

};

export default DialogFlow;