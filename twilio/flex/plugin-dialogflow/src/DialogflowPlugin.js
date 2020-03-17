import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import DialogFlow from './components/DialogFlow/DialogFlow';

const PLUGIN_NAME = 'DialogflowPlugin';

export default class DialogflowPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    //this.registerReducers(manager);

    const options = { sortOrder: -1 };
    flex.TaskInfoPanel.Content.add(
      <DialogFlow key="demo" />, options
    );
  }
}
