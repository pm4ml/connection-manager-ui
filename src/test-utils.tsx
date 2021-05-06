import React, { ReactElement, ReactNode, FunctionComponent } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider, ReactReduxContext } from 'react-redux';
import configureStore from 'store';

function render(
  // eslint-disable-next-line
  ui: ReactElement<any>,
  { ...renderOptions } = {}
) {
  const history = createMemoryHistory();
  const store = configureStore(history, { isDevelopment: true });
  const Wrapper: FunctionComponent<{}> = function ComponentWrapper({
    children,
  }: {
    // eslint-disable-next-line react/require-default-props
    children?: ReactNode;
  }) {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          {children}
        </ConnectedRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
