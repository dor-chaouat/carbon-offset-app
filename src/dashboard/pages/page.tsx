import React from 'react';
import { WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withDashboard } from '@wix/dashboard-react';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { JewelsCollectionPage } from '../../components/CollectionPage';

function Index() {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <WixPatternsProvider>
        <JewelsCollectionPage />
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  );
}

export default withDashboard(Index);
