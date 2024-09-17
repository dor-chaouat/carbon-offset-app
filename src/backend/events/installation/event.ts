import { auth } from '@wix/essentials';
import { collections } from '@wix/data';
import { appInstances } from '@wix/app-management';
import { CHECKOUT_COLLECTION_ID, SETTINGS_COLLECTION_ID } from '../../consts';

appInstances.onAppInstanceInstalled(async () => {
  console.log("CREATING COLLECTIONS");
  try {
    const res = await auth.elevate(collections.createDataCollection)({
      _id: SETTINGS_COLLECTION_ID,
      displayName: "Carbon Offset Settings",
      fields: [
        { key: 'title', type: collections.Type.TEXT },
        { key: 'amount', type: collections.Type.NUMBER },
        { key: 'color', type: collections.Type.TEXT },
        { key: 'iconColor', type: collections.Type.TEXT },
      ],
      permissions: {
        // Make sure to change the permissions according to the actual usage of your collection
        insert: collections.Role.ANYONE,
        read: collections.Role.ANYONE,
        remove: collections.Role.ANYONE,
        update: collections.Role.ANYONE,
      },
      // Plugin for single item collection
      plugins: [{
        type: collections.PluginType.SINGLE_ITEM,
        singleItemOptions: {
          singleItemId: "SETTINGS"
        },
      }],
    });

    console.log("SETTINGS COLLECTION RESPONSE", res)
  } catch (error) {
    console.log("SETTINGS COLLECTION ERROR", error)
  }


  try {
    const res = await auth.elevate(collections.createDataCollection)({
      _id: CHECKOUT_COLLECTION_ID,
      displayName: "Carbon Offset Checkout",
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
    
    console.log("CHECKOUT COLLECTION RES", res)
  } catch (error) {
    console.log("CHECKOUT COLLECTION ERROR", error)
  }
});
