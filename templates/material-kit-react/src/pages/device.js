import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const host = 'homedesk.local:8000';
const ssl = false;
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6ImRfZjViMWI2MmJkNCIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy90ZXJtaW5hbCIsInZhbGlkaXR5Ijo4NjQwMCwiaWF0IjoxNjkzMzQyNjM1fQ.TJllzZM8gnilGHDsPDPsjlNEsjdRLf-iWC1F1tBHOOg';

let loading = false;

const loadComponent = (host, capability, name, userId, deviceId, onLoad) => {
  if (userId && deviceId && !customElements.get(name) && !loading) {
    loading = true;
    console.log(`loading custom component ${name}`);
    const baseUrl = `http${ssl ? 's' : ''}://portal.${host}`;
    const script = document.createElement('script');
    const params = `userId=${userId}&deviceId=${deviceId}`;
//     script.type = 'module';
    script.setAttribute('src',
      `${baseUrl}/running/${capability}/dist/${name}.js?${params}`);
    script.onload = () => {
      console.log('loaded!');
      onLoad?.();
    };
    document.head.appendChild(script);
  } else {
    console.log(`custom component ${name} already loaded`);
    onLoad?.();
  }
};

const Page = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/terminal',
        'terminal-device', 'cfritz', 'd_f5b1b62bd4',
        () => setReady(true));
    }, []);

  if (!ready) return <div>Loading</div>;

  return <>
  <Head>
    <title>
      Devices
    </title>
  </Head>
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8
    }}
  >
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
      >
        <Stack spacing={1}>
          <Typography variant="h6">
            Terminal
          </Typography>
          <Typography variant="h3">
            Lumin1
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
          >
          </Stack>
        </Stack>
      </Stack>

      <terminal-device id="cfritz" host={host} ssl={ssl} jwt={jwt}/>

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
