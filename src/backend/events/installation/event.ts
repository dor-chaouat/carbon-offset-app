import { auth } from '@wix/essentials';
import { collections } from '@wix/data';
import { appInstances } from '@wix/app-management';
import { JEWELRY_COLLECTION_ID } from '../../consts';

appInstances.onAppInstanceInstalled(() => {
  auth.elevate(collections.createDataCollection)({
    _id: JEWELRY_COLLECTION_ID,
    displayName: 'Carbon Offset Settings',
    fields: [
      { key: 'title', type: collections.Type.TEXT },
      { key: 'amount', type: collections.Type.NUMBER },
      { key: 'jewelry', type: collections.Type.TEXT },
    ],
    permissions: {
      // Make sure to change the permissions according to the actual usage of your collection
      insert: collections.Role.ANYONE,
      read: collections.Role.ANYONE,
      remove: collections.Role.ANYONE,
      update: collections.Role.ANYONE,
    },
    // Plugin for single item collection
    plugins: [
      {
        type: collections.PluginType.SINGLE_ITEM,
        singleItemOptions: {
          singleItemId: 'SETTINGS',
        },
      },
    ],
  });

  auth.elevate(collections.createDataCollection)({
    _id: CHECKOUT_COLLECTION_ID,
    displayName: 'Carbon Offset Checkout',
    fields: [
      // In this case, checkoutId is stored as an "added" field that is not neccessarry
      // the actual _id for each item of this collection will be purchaseFlowId for easy fetching
      { key: 'checkoutId', type: collections.Type.TEXT },
      { key: 'shouldAdd', type: collections.Type.BOOLEAN },
    ],
    permissions: {
      // Make sure to change the permissions according to the actual usage of your collection
      insert: collections.Role.ANYONE,
      read: collections.Role.ANYONE,
      remove: collections.Role.ANYONE,
      update: collections.Role.ANYONE,
    },
  });
});
