import React from 'react';
import { Page } from '@wix/design-system';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  MultiBulkActionToolbar,
  useTableCollection,
  MoreActions,
  CursorQuery,
  dateRangeFilter,
  CollectionToolbarFilters,
  DateRangeFilter,
  RangeItem,
  Filter,
  SecondaryActions,
  PrimaryActions,
} from '@wix/patterns';
import { CollectionPage } from '@wix/patterns/page';

import { Edit, InvoiceSmall, Visible } from '@wix/wix-ui-icons-common';
import { Jewel } from '../types';
import { httpClient } from '@wix/essentials';
export type TableFilters = {
  updatedDate: Filter<RangeItem<Date>>;
};

export const JewelsCollectionPage = () => {
  const navigate = useNavigate();
  const state = useTableCollection<Jewel, TableFilters>({
    queryName: 'dummy-entity-table',
    fqdn: 'wix.patterns.dummyservice.v1.dummy_entity',
    filters: {
      updatedDate: dateRangeFilter(),
    },
    fetchData: async (query: CursorQuery<Partial<TableFilters>>) => {
      const res = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/jewels`
      );
      const data: Jewel[] = await res.json();
      return {
        items: data.map((item) => item.data) || [],
        cursor: '',
      };
    },

    fetchErrorMessage: ({ err }) => `Error: ${err}`,
    itemKey: (item) => item.id!,
    itemName: (item) => item.title!,
  });
  const addJewel = async () => {
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
    state.collection.refreshCurrentPage();
  };
  return (
    <CollectionPage dataHook='dummy-collection-page'>
      <CollectionPage.Header
        title={{ text: 'Dummy Collection', hideTotal: true }}
        subtitle={{
          text: 'This is a dummy collection subtitle',
          learnMore: { url: 'https://www.wix.com' },
        }}
        moreActions={
          <MoreActions
            items={[
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
            ]}
            exploreAppsModalProps={{
              title: 'Explore related apps',
              subtitle: 'Find useful apps to help you manage your business',
              tag: '7d4d7891-2995-4bb9-8d2b-457aa7dca3f2',
            }}
            containerId='6dcbba57-c740-477c-a747-30094cf54c'
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
          columns={[
            {
              id: 'title',
              hideable: false,
              title: 'Title',
              render: (item) => item.title,
            },
            {
              id: 'amount',
              hideable: false,
              title: 'Amount',
              render: (item) => item.amount,
            },
            {
              id: 'jewel',
              hideable: false,
              title: 'Jewel type',
              render: (item) => item.jewel,
            },
          ]}
        />
      </Page.Content>
    </CollectionPage>
  );
};
