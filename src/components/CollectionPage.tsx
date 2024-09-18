import React from "react";
import { Page } from "@wix/design-system";
import { useNavigate } from "react-router-dom";
import {
  MoreActions,
  CursorQuery,
  dateRangeFilter,
  CollectionToolbarFilters,
  DateRangeFilter,
  RangeItem,
  Filter,
  PrimaryActions,
  useTableGridSwitchCollection,
  TableGridSwitch,
  CustomColumns,
  useOptimisticActions,
} from "@wix/patterns";
import { CollectionPage } from "@wix/patterns/page";

import { Add, Edit, InvoiceSmall, Visible } from "@wix/wix-ui-icons-common";
import { Jewel } from "../types";
import { httpClient } from "@wix/essentials";
import { items } from "@wix/data";
import { addJewel } from "../services/jewels";

export type TableFilters = {
  updatedDate: Filter<RangeItem<Date>>;
};

export const JewelsCollectionPage = () => {
  const navigate = useNavigate();
  const state = useTableGridSwitchCollection<Jewel, TableFilters>({
    queryName: "dummy-entity-table",
    fqdn: "wix.patterns.dummyservice.v1.dummy_entity",
    itemKey: (item) => item.id,
    itemName: (item) => item.title,
    fetchData: async (_query: CursorQuery<TableFilters>) => {
      const res = await httpClient.fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/jewels`
      );
      const data: { data: Jewel }[] = await res.json();
      return {
        items: data.map((item) => item.data) || [],
        cursor: "",
      };
    },
    fetchErrorMessage: ({ err }) => `Error: ${err}`,
    filters: {
      updatedDate: dateRangeFilter(),
    },
  });

  const optimisticActions = useOptimisticActions(state.collection);

  const createItem = async () => {
    const item = {
      title: "Random jewel" + Math.random(),
      amount: Math.floor(Math.random() * 100),
      jewel: "necklace",
      id: Math.random().toString(36).substring(7).toString(),
    };

    optimisticActions.createOne(item, {
      submit: async ([itemToSubmit]) => {
        const res = await addJewel(itemToSubmit);
        const { data }: { data: Jewel } = await res.json();
        return [data];
      },
      successToast: "Jewel created successfully",
    });
  };

  return (
    <CollectionPage dataHook="dummy-collection-page">
      <CollectionPage.Header
        title={{ text: "Dummy Collection", hideTotal: true }}
        subtitle={{
          text: "This is a dummy collection subtitle",
          learnMore: { url: "https://www.wix.com" },
        }}
        moreActions={
          <MoreActions
            items={[
              [
                {
                  biName: "action-1",
                  text: "Do Action #1",
                  prefixIcon: <InvoiceSmall />,
                  onClick: () => {
                    navigate("/entity");
                  },
                },
                {
                  biName: "action-2",
                  text: "Another Action #2",
                  prefixIcon: <Visible />,
                  onClick: () => {
                    console.log("Open Subscriptions");
                  },
                },
              ],
            ]}
          />
        }
        primaryAction={
          <PrimaryActions
            label="Add"
            prefixIcon={<Add />}
            onClick={createItem}
          />
        }
      />
      <CollectionPage.Content>
        <TableGridSwitch
          useNewInfiniteScrollLoader
          horizontalScroll={true}
          dataHook="dummy-entity-collection"
          state={state}
          customColumns={<CustomColumns />}
          filters={
            <CollectionToolbarFilters>
              <DateRangeFilter
                accordionItemProps={{ label: "Date" }}
                filter={state.collection.filters.updatedDate}
              />
            </CollectionToolbarFilters>
          }
          actionCell={(_item) => {
            return {
              primaryAction: {
                text: "Edit",
                onClick: () => {
                  console.log("Edit");
                },
                icon: <Edit />,
              },
            };
          }}
          columns={[
            {
              id: "title",
              hideable: false,
              title: "Title",
              render: (item) => item.title,
            },
            {
              id: "amount",
              hideable: false,
              title: "Amount",
              render: (item) => item.amount,
            },
            {
              id: "jewel",
              hideable: false,
              title: "Jewel type",
              render: (item) => item.jewel,
            },
          ]}
        />
      </CollectionPage.Content>
    </CollectionPage>
  );
};
