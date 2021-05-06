import { Switch, Route, Redirect } from 'react-router-dom';
import React, { FC } from 'react';
import './App.css';
import Layout from './Layout';
import Dashboard from './Dashboard';
import TechnicalDashboard from './TechnicalDashboard';
import Transfers from './Transfers';
import ConnectionWizard from './ConnectionWizard';
import SuccessToast from './SuccessToast';
import ErrorModal from './ErrorModal';
import connectors from './connectors';
import { User } from './types';

interface AppProps {
  isSuccessToastVisible: boolean;
  isErrorModalVisible: boolean;
  errorModalContent: string;
  onCloseErrorModal: () => void;
  userInfo?: User;
  logoutUrl: string;
}

const App: FC<AppProps> = ({
  isSuccessToastVisible,
  isErrorModalVisible,
  errorModalContent,
  onCloseErrorModal,
  userInfo,
}) => {
  return (
    <div className="App">
      <Layout.Container>
        <Layout.Navbar
          username={userInfo ? `${userInfo.givenName} ${userInfo.familyName}` : undefined}
          logoutUrl={userInfo ? userInfo.logoutUrl : undefined}
          activeConnectionName="Modusbox & Mojaloop Labs"
          activeConnectionStatusColor="#12d670"
        />
        <Layout.Content>
          <Layout.SideMenu />
          <Layout.Page>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/transfers" component={Transfers} />
              <Route path="/connections" component={ConnectionWizard} />
              <Route path="/techdashboard" component={TechnicalDashboard} />

              {/* process.env.NODE_ENV === 'development' && <Route path="/test" component={Test} /> */}

              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Route>
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </Layout.Page>
        </Layout.Content>
      </Layout.Container>

      <SuccessToast isVisible={isSuccessToastVisible} />
      <ErrorModal
        isVisible={isErrorModalVisible}
        content={errorModalContent}
        onClose={onCloseErrorModal}
      />
    </div>
  );
};

export default connectors(App);
