/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import React, { PureComponent } from 'react';

function withMount(Component, fnName) {
  return class loadDfspsCasHoc extends PureComponent {
    componentWillMount() {
      // select the mounting function and
      // run it only if set and correct typeof
      const fn = this.props[fnName];
      fn && typeof fn === 'function' && fn();
    }
    render() {
      return <Component {...this.props} />;
    }
  };
}
export { withMount };
