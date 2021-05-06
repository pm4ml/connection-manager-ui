import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Heading,
  MetricsChart,
  Row,
  Column,
  Select,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from 'components';
import { State, Dispatch } from 'store/types';
import { MetricDataWrapper, XYCoordinate } from 'App/types';
import { loadTechnicalDashboard } from './hocs';
import * as selectors from './selectors';
import * as actions from './actions';
import { TechnicalDashboardFilters } from './types';
import './Dashboard.css';

const stateProps = (state: State) => ({
  filters: selectors.getTechnicalDashboardFilters(state),
  partyLookupRateData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_party_lookup_request_count'
  ),
  quoteRequestRateData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_quote_request_count'
  ),
  prepareRateData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_transfer_prepare_count'
  ),
  partyLookupLatencyData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_party_lookup_latency'
  ),
  quoteRequestLatencyData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_quote_request_latency'
  ),
  transferLatencyData: selectors.getMetricData(
    state,
    'mojaloop_connector_outbound_transfer_latency'
  ),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onFilterChange: ({ field, value }: { field: string; value: string | number }) => {
    dispatch(actions.setTechnicalDashboardFilters({ field, value }));
  },
});

type TechnicalDashboardProps = {
  partyLookupRateData?: MetricDataWrapper<XYCoordinate>;
  quoteRequestRateData?: MetricDataWrapper<XYCoordinate>;
  prepareRateData?: MetricDataWrapper<XYCoordinate>;
  partyLookupLatencyData?: MetricDataWrapper<XYCoordinate>;
  quoteRequestLatencyData?: MetricDataWrapper<XYCoordinate>;
  transferLatencyData?: MetricDataWrapper<XYCoordinate>;
  filters: TechnicalDashboardFilters;
  onFilterChange: ({ field, value }: { field: string; value: string | number }) => void;
};

const TechnicalDashboard: FC<TechnicalDashboardProps> = ({
  partyLookupRateData,
  quoteRequestRateData,
  prepareRateData,
  partyLookupLatencyData,
  quoteRequestLatencyData,
  transferLatencyData,
  filters,
  onFilterChange,
}) => {
  const partyLookupData = [];
  if (partyLookupRateData) {
    partyLookupData.push({
      chartType: 'line',
      color: '#4fc7e7',
      legendText: 'Requests/sec',
      data: partyLookupRateData.data,
    });
  }
  if (partyLookupLatencyData) {
    partyLookupData.push({
      chartType: 'line',
      color: '#12d670',
      legendText: 'Latency ms',
      data: partyLookupLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
    });
  }

  const quoteRequestData = [];
  if (quoteRequestRateData) {
    quoteRequestData.push({
      chartType: 'line',
      color: '#4fc7e7',
      legendText: 'Requests/sec',
      data: quoteRequestRateData.data,
    });
  }
  if (quoteRequestLatencyData) {
    quoteRequestData.push({
      chartType: 'line',
      color: '#12d670',
      legendText: 'Latency ms',
      data: quoteRequestLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
    });
  }

  const transferRequestData = [];
  if (prepareRateData) {
    transferRequestData.push({
      chartType: 'line',
      color: '#4fc7e7',
      legendText: 'Requests/sec',
      data: prepareRateData.data,
    });
  }
  if (transferLatencyData) {
    transferRequestData.push({
      chartType: 'line',
      color: '#12d670',
      legendText: 'Latency ms',
      data: transferLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
    });
  }

  return (
    <div className="dashboard">
      <Heading size="3">Technical Dashboard</Heading>
      <Row style={{ marginBottom: '10px' }}>
        <div>Connection Health</div>
      </Row>
      <Row align="left top" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        <div className="accordion__indicator__color" style={{ background: '#12d670' }} />
        <div>Connected</div>
      </Row>
      <Row style={{ marginBottom: '5px' }}>
        <div>Select Monitoring Time</div>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Select
          options={[
            {
              label: '1 Hour',
              value: 3600,
            },
            {
              label: '2 Hours',
              value: 7200,
            },
            {
              label: '4 Hours',
              value: 14400,
            },
            {
              label: '8 Hours',
              value: 28800,
            },
            {
              label: '12 Hours',
              value: 43200,
            },
            {
              label: '24 Hours',
              value: 86400,
            },
            {
              label: '48 Hours',
              value: 172800,
            },
            {
              label: '1 Week',
              value: 604800,
            },
          ]}
          selected={filters.selectedTimeFrame}
          onChange={
            (value: string | number) => onFilterChange({ field: 'selectedTimeFrame', value })
            // stupid prettier and eslint fighting each other!
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
      </Row>
      <Row>
        <Tabs>
          <TabList>
            <Tab>Outbound</Tab>
            <Tab>Inbound</Tab>
          </TabList>
          <TabPanels>
            <TabPanel flex={true}>
              <Row>
                <Column
                  align="center center"
                  grow={0}
                  shrink={0}
                  basis="33%"
                  style={{ padding: '20px' }}
                >
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title="Party Lookup Service"
                    data={partyLookupData}
                  />
                </Column>
                <Column
                  align="center center"
                  grow={0}
                  shrink={0}
                  basis="33%"
                  style={{ padding: '20px' }}
                >
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title="Quote Service"
                    data={quoteRequestData}
                  />
                </Column>
                <Column
                  align="center center"
                  grow={0}
                  shrink={0}
                  basis="33%"
                  style={{ padding: '20px' }}
                >
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title="Transfer Service"
                    data={transferRequestData}
                  />
                </Column>
              </Row>
              {/* <Row>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
              </Row> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Row>
    </div>
  );
};

export default loadTechnicalDashboard(connect(stateProps, dispatchProps)(TechnicalDashboard));
