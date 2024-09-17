import React, { useEffect, useState, type FC } from 'react';
import { httpClient } from '@wix/essentials';
import { Button, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { Jewel } from '../../types';
import { withDashboard } from '@wix/dashboard-react';
import { WixPatternsProvider } from '@wix/patterns/provider';
import { JewelsCollectionPage } from '../../components/CollectionPage';

function Index() {
  const [jewels, setJewels] = useState<Jewel[]>();

  // useEffect(() => {
  //   fetchJewels();
  // }, []);

  const fetchJewels = async () => {
    const res = await httpClient.fetchWithAuth(
      `${import.meta.env.BASE_API_URL}/jewels`
    );

    const data: Jewel[] = await res.json();
    console.log({ data });
    setJewels(data);
  };

  const addJewel = async () => {
    await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/jewels`, {
      method: 'POST',
      body: JSON.stringify({
        jewel: {
          title: 'Random jewel',
          amount: Math.floor(Math.random() * 100),
          jewel: 'necklace',
          id: Math.random().toString(36).substring(7).toString(),
        },
      }),
    });
    fetchJewels();
  };
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <WixPatternsProvider>
        <Button onClick={addJewel}>Add random jewel</Button>
        <JewelsCollectionPage />
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  );
}

export default withDashboard(Index);

// export default withDashboard(() => {
//   return (
//     <WixDesignSystemProvider features={{ newColorsBranding: true }}>
//       <PatternsReactRouter>
//         <PatternsReactRoute
//           type='other'
//           path='/'
//           element={<div>asdasdas</div>}
//         />
//         <PatternsReactRoute
//           type='collection'
//           path='/entities'
//           element={<div>asdsadassaaasaaaaaa</div>}
//         />
//         <PatternsReactRoute
//           type='editEntity'
//           path='/entities/:entityId'
//           element={<div>edit entity</div>}
//         />
//       </PatternsReactRouter>
//     </WixDesignSystemProvider>
//   );
// });
