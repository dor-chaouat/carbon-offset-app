import React from 'react';
import { httpClient } from '@wix/essentials';
import {
  useTableCollection,
  CursorQuery,
  dateRangeFilter,
  RangeItem,
  Filter,
} from '@wix/patterns';
import { CollectionPage } from '@wix/patterns/page';
import {
  TableFilters,
  useJewelsPageContent,
  useJewelsPageHeader,
} from './hooks';
import { type Jewel } from '../../../../types';
import { type DataItem } from '../../../../backend/database';

export const JewelsCollectionPage = () => {
  const { state } = useJewelsPageState();
  const collectionPageHeader = useJewelsPageHeader();
  const collectionPageContent = useJewelsPageContent(state);
  return (
    <CollectionPage dataHook='dummy-collection-page'>
      {collectionPageHeader}
      {collectionPageContent}
    </CollectionPage>
  );
};

const useJewelsPageState = () => {
  const fetchDataHandler = async (
    _query: CursorQuery<Partial<TableFilters>>
  ) => {
    //TODO: handle query and filters
    const res = await httpClient.fetchWithAuth(
      `${import.meta.env.BASE_API_URL}/jewels`
    );
    const data: DataItem[] = await res.json();
    return {
      items: data.map((item) => item.data) || [],
      cursor: '', //TODO: handle cursor
    };
  };

  const state = useTableCollection<Jewel, TableFilters>({
    queryName: 'dummy-entity-table',
    fqdn: 'wix.patterns.dummyservice.v1.dummy_entity', // FIXME: Why do we need fqdn here
    filters: { updatedDate: dateRangeFilter() },
    fetchData: fetchDataHandler,
    fetchErrorMessage: ({ err }) => `Error: ${err}`,
    itemKey: (item) => item.id!,
    itemName: (item) => item.title!,
  });

  return {
    state,
  };
};
