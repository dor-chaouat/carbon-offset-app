import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@wix/design-system';
import { httpClient } from '@wix/essentials';
import {
  CollectionToolbarFilters,
  DateRangeFilter,
  Filter,
  MoreActions,
  MultiBulkActionToolbar,
  PrimaryActions,
  RangeItem,
  SecondaryActions,
  Table,
  TableColumn,
  TableState,
} from '@wix/patterns';
import { CollectionPage } from '@wix/patterns/page';
import { Edit, InvoiceSmall, Visible } from '@wix/wix-ui-icons-common';
import { Jewel } from '../../../../types';

export type TableFilters = {
  updatedDate: Filter<RangeItem<Date>>;
};
export const useJewelsPageContent = (
  state: TableState<Jewel, TableFilters>
) => {
  return (
    <Page.Content>
      <Table
        useNewInfiniteScrollLoader
        horizontalScroll={true}
        showSelection
        dataHook='dummy-entity-collection'
        state={state}
        filters={
          <CollectionToolbarFilters>
            <DateRangeFilter
              accordionItemProps={{ label: 'Date' }}
              filter={state.collection.filters.updatedDate}
            />
          </CollectionToolbarFilters>
        }
        bulkActionToolbar={() => (
          <MultiBulkActionToolbar
            containerId='f150c9a9-ea35-4906-977f-49eeb27b080e'
            containerProps={{
              stam: 'mashu',
            }}
          />
        )}
        actionCell={(item) => {
          return {
            containerId: 'f150c9a9-ea35-4906-977f-49eeb27b080e',
            primaryAction: {
              text: 'Edit',
              onClick: () => {},
              icon: <Edit />,
            },
          };
        }}
        columns={getJewelsTableColumns()}
      />
    </Page.Content>
  );
};

export const useJewelsPageHeader = () => {
  const moreActionsItems = useMoreActionsItems();
  return (
    <CollectionPage.Header
      title={{ text: 'Dummy Collection', hideTotal: true }}
      subtitle={{
        text: 'This is a dummy collection subtitle',
        learnMore: { url: 'https://www.wix.com' },
      }}
      moreActions={
        <MoreActions
          items={moreActionsItems}
          containerId='6dcbba57-c740-477c-a747-30094cf54c' // FIXME: What is container id?
        />
      }
      secondaryActions={
        <SecondaryActions
          dataHook='primary-action-1'
          label='Primary 1'
          prefixIcon={<Visible />}
          subItems={[{ label: 'option 1', biName: 'option-1' }]}
        />
      }
      primaryAction={
        <PrimaryActions
          label='Add'
          subItems={[
            {
              label: 'Add random jewel',
              onClick: addJewel,
              biName: 'add-random-jewel',
            },
          ]}
        />
      }
    />
  );
};

const useMoreActionsItems = () => {
  const navigate = useNavigate();
  return [
    [
      {
        biName: 'action-1',
        text: 'Do Action #1',
        prefixIcon: <InvoiceSmall />,
        onClick: () => {
          navigate('/entity');
        },
      },
      {
        biName: 'action-2',
        text: 'Another Action #2',
        prefixIcon: <Visible />,
        onClick: () => {
          console.log('Open Subscriptions');
        },
      },
    ],
  ];
};

const getJewelsTableColumns = () => {
  return [
    {
      id: 'title',
      hideable: false,
      title: 'Title',
      render: (item: Jewel) => item.title,
    },
    {
      id: 'amount',
      hideable: false,
      title: 'Amount',
      render: (item: Jewel) => item.amount,
    },
    {
      id: 'jewel',
      hideable: false,
      title: 'Jewel type',
      render: (item: Jewel) => item.jewel,
    },
  ] as TableColumn<Jewel>[];
};

const addJewel = async (state: TableState<Jewel, TableFilters>) => {
  await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/jewels`, {
    method: 'POST',
    body: JSON.stringify({
      jewel: {
        title: 'Random jewel' + Math.random(),
        amount: Math.floor(Math.random() * 100),
        jewel: 'necklace',
        id: Math.random().toString(36).substring(7).toString(),
      },
    }),
  });
  state.collection.refreshCurrentPage(); // FIXME: until patterns router will work, we'll need to reload the table data
};
