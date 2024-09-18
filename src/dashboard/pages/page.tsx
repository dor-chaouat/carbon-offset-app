import React, { useEffect, useState, type FC } from 'react';
import { httpClient } from '@wix/essentials';
import {
  Box,
  Button,
  Card,
  Cell,
  Layout,
  Loader,
  Page,
  Tabs,
  WixDesignSystemProvider,
} from '@wix/design-system';
import { MainButton } from '../../components/main-button';
import type { Survey } from '../../types';
import '@wix/design-system/styles.global.css';
import { QuestionsTab } from '../../components/questions-tab';

export interface TabContent {
  [key: number]: JSX.Element;
}
const Index: FC = () => {
  const [survey, setSurvey] = useState<Survey>();
  const [activeId, setActiveId] = React.useState(1);
  const has3Questions = survey?.questions?.length === 3;
  const [isInAddNewState, setIsInAddNewState] = useState(false);
  const [addNewDisabled, setAddNewDisabled] = useState(has3Questions);

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/survey`,
      );
      const data: Survey = await res.json();
      setSurvey(data);
    };

    fetchSettings();
  }, []);

  const tabContent: TabContent = {
    1: (
      <QuestionsTab
        survey={survey}
        isInAddNewState={isInAddNewState}
        setIsInAddNewState={setIsInAddNewState}
        addNewDisabled={addNewDisabled}
        setAddNewDisabled={setAddNewDisabled}
      />
    ),
  };

  const onCancel = () => {
    setIsInAddNewState(false);
    setAddNewDisabled(has3Questions);
  };

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      {!survey ? (
        <Box height='100vh' align='center' verticalAlign='middle'>
          <Loader />
        </Box>
      ) : (
        <Page height='100vh'>
          <Page.Header
            title='Survey Boost'
            subtitle='Unlock Customer Insights and Drive Sales'
            actionsBar={
              <Box gap='SP2'>
                <Button skin='light' onClick={onCancel}>
                  Cancel
                </Button>
                <Button skin='light'>Save</Button>
                <MainButton {...survey} />
              </Box>
            }
          />
          <Page.Content>
            <Layout>
              <Cell>
                <Tabs
                  activeId={activeId}
                  onClick={(value) => setActiveId(1)}
                  items={[
                    { id: 1, title: 'Questions' },
                    { id: 2, title: 'Responses' },
                    { id: 3, title: 'Analytics' },
                  ]}
                />
              </Cell>
              <Cell>{tabContent[activeId]}</Cell>
            </Layout>
          </Page.Content>
        </Page>
      )}
    </WixDesignSystemProvider>
  );
};

export default Index;
