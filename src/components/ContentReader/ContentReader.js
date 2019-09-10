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
import vkbeautify from 'vkbeautify';
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import shell from 'highlight.js/lib/languages/shell';
import 'highlight.js/styles/googlecode.css';

import './ContentReader.scss';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('shell', shell);

class ContentReader extends PureComponent {
  static parse(source = '') {
    let content = source;
    let lineNumbers = null;
    let error = false;

    try {
      content = vkbeautify.json(source, 2);
    } catch (e) {
      try {
        content = vkbeautify.xml(source, 2);
      } catch (e) {
        error = true;
      }
    }

    if (!error) {
      const lines = content.split(/(?:\r\n|\r|\n)/);
      lineNumbers = lines.map((_, index) => (
        <div key={index} className="content-reader__lines__line-n">
          {index + 1}
        </div>
      ));
    }

    return { content, lineNumbers, error };
  }
  componentDidMount() {
    hljs.highlightBlock(this.code);
  }
  componentDidUpdate() {
    // remove className preventing re-highlighting
    this.code.className = '';
    hljs.highlightBlock(this.code);
  }

  render() {
    const { content, lineNumbers, error } = ContentReader.parse(this.props.data);
    if (error) {
      return <div> Unable to read the data </div>;
    }

    return (
      <div className="content-reader">
        <div className="content-reader__layout-v" style={this.props.style}>
          <div className="content-reader__layout-h">
            <div className="content-reader__lines">
              <pre>
                <code>{lineNumbers}</code>
              </pre>
            </div>
            <div className="content-reader__content">
              <pre>
                <code
                  ref={code => {
                    this.code = code;
                  }}
                >
                  {content}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentReader;
