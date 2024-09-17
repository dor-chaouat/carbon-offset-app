import React from 'react';
import { Breadcrumbs, Text, Card } from '@wix/design-system';
import {
  EntityPage,
  useEntityPage,
  useEntity,
  MoreActions,
} from '@wix/patterns';
import { useForm } from '@wix/patterns/form';
import { InvoiceSmall } from '@wix/wix-ui-icons-common';

import { useParams } from 'react-router-dom';
import { Jewel } from '../types';
import { httpClient } from '@wix/essentials';

export interface FormFields {
  name: string;
  updatedDate: Date;
  createdDate: Date;
}

export const JewelEntityPage = () => {
  const params = useParams();
  console.log({ params });
  const form = useForm<FormFields>();
  const state = useEntityPage<Jewel, FormFields>({
    parentPath: '/entities',
    parentPageId: 'entities',
    form,
    onSave: async (data) => {
      const formValues = form.getValues();
      console.log({ formValues });
      return new Promise((resolve) => resolve({ updatedEntity: {} as Jewel }));
    },
    saveSuccessToast: 'Successfully saved',
    saveErrorToast: (e) => 'Failed to save',
    fetch: async () => {
      const res = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/jewels?id=${
          params.entityId ?? 'm9l0wp'
        }`
      );

      const entity = (await res.json()) as Jewel;
      return { entity };
    },
  });
  const entity = useEntity(state);

  return (
    <EntityPage state={state} dataHook='demo-entity-page'>
      <EntityPage.Header
        title={{ text: entity?.title || 'New Entity' }}
        subtitle={
          entity
            ? {
                text: `Jewel ID: ${entity.id}`,
                learnMore: {
                  url: 'https://www.wix.com/',
                },
              }
            : undefined
        }
        breadcrumbs={
          <Breadcrumbs
            activeId='current'
            items={[
              { id: 'root', value: 'Dummy Entity Collection' },
              { id: 'current', value: 'Entity Page' },
            ]}
            onClick={(e) => {
              if (e.id === 'root') {
                console.log('Navigate to collection');
              }
            }}
          />
        }
        moreActions={
          <MoreActions
            containerId='f150c9a9-ea35-4906-977f-49eeb27b080e'
            items={[
              [
                {
                  biName: 'open-subscriptions',
                  text: 'Open Subscriptions',
                  prefixIcon: <InvoiceSmall />,
                  onClick: () => {
                    console.log('Open Subscriptions');
                  },
                },
              ],
            ]}
            exploreAppsModalProps={{
              title: 'Explore related apps',
              subtitle: 'Find apps that can help you with this product',
              tag: '7d4d7891-2995-4bb9-8d2b-457aa7dca3f2',
            }}
          />
        }
      />
      <EntityPage.Content>
        <EntityPage.MainContent>
          <EntityPage.Card minHeight='204px' dataHook='entity-page-card'>
            <Card.Header
              title='Main Data'
              subtitle='General information about the product'
            />
            <Card.Divider />
            <Card.Content>dataaa</Card.Content>
          </EntityPage.Card>
        </EntityPage.MainContent>
      </EntityPage.Content>
    </EntityPage>
  );
};
