import React, { PureComponent, ComponentType } from 'react';

function withMount<Props>(Component: ComponentType<Props>, fnName: string) {
  return class MounterWrapper extends PureComponent {
    componentDidMount() {
      // select the mounting function and
      // run it only if set and correct typeof

      /* eslint-disable */
      // @ts-ignore
      const fn: any = this.props[fnName];
      /* eslint-enable */
      if (fn && typeof fn === 'function') {
        fn();
      }
    }

    render() {
      return <Component {...(this.props as Props)} />;
    }
  };
}
export { withMount };
