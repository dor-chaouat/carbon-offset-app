import React, { useState } from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withDashboard } from '@wix/dashboard-react';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { JewelsCollectionPage } from '../../components/CollectionPage';
import { JewelEntityPage } from '../../components/EntityPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@wix/design-system/styles.global.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <JewelsCollectionPage />,
    },
    {
      path: '/:entityId',
      element: <JewelEntityPage />,
    },
  ],
  {
    basename:
      '/wix/html/dashboard-asset/7a09bd5e-9992-4ad8-b3d2-e179774468ff.html',
  }
);
function Index() {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <WixPatternsProvider>
        <RouterProvider router={router} />
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  );
}

export default withDashboard(Index);
