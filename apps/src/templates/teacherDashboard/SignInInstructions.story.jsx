import React from 'react';
import SignInInstructions from './SignInInstructions';
import {SectionLoginType} from '@cdo/apps/util/sharedConstants';

export default storybook => {
  storybook = storybook.storiesOf('SignInInstructions', module);

  Object.values(SectionLoginType).forEach(loginType => {
    storybook = storybook.add(loginType, () => (
      <SignInInstructions
        sectionCode="ABCDEF"
        loginType={loginType}
        studioUrlPrefix="http://studio.molibc.com"
      />
    ));
  });
};
