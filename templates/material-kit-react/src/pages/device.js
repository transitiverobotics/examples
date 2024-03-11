import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

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

// cfritz, local
const host = 'homedesk.local';
const ssl = false;
const userId = 'cfritz';
const devices = {
  d_f5b1b62bd4: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6ImRfZjViMWI2MmJkNCIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy93ZWJydGMtdmlkZW8iLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTcwNTY4NTYzMH0.Iawz6e-Rjy5QYzqjgZRj-kI8OSbwqs7v3TcZ_oQQnrE',
    count: 1,
    rosversion: "1",
    source: "/tracking/fisheye1/image_raw",
    type: "rostopic",
  },
  d_58eaed693f: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6ImRfNThlYWVkNjkzZiIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy93ZWJydGMtdmlkZW8iLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTcwNTY4NTI0NX0.61w_46y_9P1lx0ojn_OGnxQAKZeuVe3wCliSmw1ld5E',
    count: 1,
    rosversion: "1",
    source: "/depth/color/image_raw",
    type: "rostopic",
  }
};


const Video = () => {
  // Create a react ref that will be attached to the component once mounted
  const myref = useRef(null);

  // Once the component is mounted, i.e., myref is bound, call the onLag
  // function of the imperative API to attach a listener for lag events
  // useEffect(() => {
  //     setTimeout(() => {
  //         console.log('registering', myref.current);
  //         myref.current?.call('onLag', (lag) => console.log('lag:', lag));
  //       }, 2000);
  //   }, [myref.current]);

  const [deviceId, setDeviceId] = useState(Object.keys(devices)[0]);

  const [ready, setReady] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/webrtc-video',
        'webrtc-video-device', userId, Object.keys(devices)[0],
        () => setReady(true));
    }, []);

  if (!ready) return <div>Loading Video</div>;

  // console.log('ref', myref.current);
  console.log({deviceId});

  return <div>
    <div>
      {Object.keys(devices).map(id =>
        <Button key={id} onClick={() => setDeviceId(id)}>
          {id}
        </Button>)}
    </div>

    {deviceId}
    <webrtc-video-device id={userId} host={host} ssl={ssl}
      {...devices[deviceId]}
      timeout="1800"
      ref={myref}
      />

    {/* Test with more than one: */}

    {/* <webrtc-video-device id="cfritz" host={host} ssl="false"
      jwt={devices.d_31efbefa35.jwt}
      count="1"
      timeout="1800"
      type="videotestsrc"
      ref={myref}
      /> */}

  </div>;
};


const Teleop = () => {
  // Once the component is mounted, i.e., myref is bound, call the onLag
  // function of the imperative API to attach a listener for lag events
  const [ready, setReady] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/remote-teleop',
        'remote-teleop-device', 'cfritz', 'd_f5b1b62bd4',
        () => setReady(true));
    }, []);

  if (!ready) return <div>Loading Teleop</div>;

  return <div>
    <remote-teleop-device id="cfritz" host={host} ssl="false"
      jwt={jwt}
      bitrate="50"
      control_rosVersion="1"
      control_topic="/joy"
      control_type="sensor_msgs/Joy"
      count="1"
      timeout="1800"
      type="videotestsrc"
      />
  </div>;
};



const Page = () => {
  // const [ready, setReady] = useState(false);
  // useEffect(() => {
  //     loadComponent(host, '@transitive-robotics/terminal',
  //       'terminal-device', 'cfritz', 'd_f5b1b62bd4',
  //       () => setReady(true));
  //   }, []);

  // if (!ready) return <div>Loading</div>;

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

      {/* <terminal-device id="cfritz" host={host} ssl={ssl} jwt={jwt}/> */}

      <Video />
      {/* <Teleop /> */}

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
