import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

// typeof window == 'undefined' && (window = {});

import { getLogger, useTopics } from '@transitive-sdk/utils-web';

const log = getLogger('dynvideo');
log.setLevel('debug');

const host = 'homedesk.local';
const ssl = false;
const userId = 'cfritz';  // TODO extract from jwt
const deviceId = 'd_f5b1b62bd4'   // TODO extract from jwt
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6ImRfZjViMWI2MmJkNCIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy93ZWJydGMtdmlkZW8iLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTcwOTg0MTE1M30.dELL2h_RLfmvb4nj57mO_9j_mI1W58ty5a6eoYzo-Ig';

let loading = false;
const loadComponent = (host, capability, name, userId, deviceId, onLoad) => {
  if (userId && deviceId && !customElements.get(name) && !loading) {
    loading = true;
    log.debug(`loading custom component ${name}`);
    const baseUrl = `http${ssl ? 's' : ''}://portal.${host}`;
    const script = document.createElement('script');
    const params = `userId=${userId}&deviceId=${deviceId}`;
    script.setAttribute('src',
      `${baseUrl}/running/${capability}/dist/${name}.js?${params}`);
    script.onload = () => {
      log.debug('loaded!');
      onLoad?.();
    };
    document.head.appendChild(script);
  } else {
    log.debug(`custom component ${name} already loaded`);
    onLoad?.();
  }
};


// const filterObject = (obj, path) => {
//   if (path.length == 0) return;
//   const next = path[0];
//   const rtv = {};
//   if (next) {
//     for (let key in obj) {
//       if (key == next || next == '*' || next.startsWith('+')) {
//         rtv[key] = filterObject(obj[key], path.slice(1));
//       }
//     }
//   }
//   return rtv;
// };




const Video = () => {

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/webrtc-video',
        'webrtc-video-device', userId, deviceId,
        () => setLoaded(true));
    }, []);

  const { agentStatus, topicData } = useTopics({ jwt,
    host,
    ssl,
    topics: [
    '/options/videoSource',
    '/stats/+/log/'
  ]});

  if (!agentStatus || !loaded) return <div>Loading Video</div>;

  log.debug({agentStatus, topicData});

  return <div>
    {deviceId}
    <webrtc-video-device timeout="1800"
      id={userId} host={host} ssl={ssl} device={deviceId} jwt={jwt}
      />

  </div>;
};


const Page = () => {

  return <>
  <Head><title>Devices</title></Head>
  <Box component="main" sx={{ flexGrow: 1, py: 8 }} >
    <Container maxWidth="xl">

      <Video />

    </Container>
  </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
