import React, { useState, useEffect, Suspense, useRef } from 'react';
import logo from './logo.svg';
import './App.css';


const loadComponent = (capability, name, userId, deviceId) => {
  if (userId && deviceId && !customElements.get(name)) {
    const host = 'http://portal.homedesk.local';
    const script = document.createElement('script');
    const params = `userId=${userId}&deviceId=${deviceId}`;
//     script.type = 'module';
    script.setAttribute('src',
      `${host}/running/${capability}/dist/${name}.js?${params}`);
    script.onload = () => {
      console.log('loaded!');
    };
    document.head.appendChild(script);
  }
};

const loadComponentPromise = (capability, name, userId, deviceId) => {
  return new Promise((resolve, reject) => {
    if (userId && deviceId && !customElements.get(name)) {
      const host = 'http://portal.homedesk.local';
      const script = document.createElement('script');
      // script.type = 'module';
      const params = `userId=${userId}&deviceId=${deviceId}`;
      script.setAttribute('src',
        `${host}/running/${capability}/dist/${name}.js?${params}`);
      script.onload = () => {
        console.log('loaded!');
        // console.log(window.transitive.VideoWrapper);
        // resolve(window.transitive.VideoWrapper);

        const it = {__esModule: true, default: window.transitive.VideoWrapper};
        // const it = {__esModule: true, default: window.transitive.Test};
        console.log(it);
        resolve(it);
      };
      document.head.appendChild(script);
    } else {
      console.log('already loaded');
      // resolve(window.transitive.VideoWrapper);
      resolve({__esModule: true, default: window.transitive.VideoWrapper});
      // resolve({__esModule: true, default: window.transitive.Test});
    }
  });
};

const Loading = () => <div>suspense!..</div>;

const myImport = () => {
  const it = import('./Import.jsx');
  it.then(console.log);
  return it;
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadComponent('@transitive-robotics/webrtc-video', 'webrtc-video-device',
      'cfritz', 'f5b1b62bd4');
  }, []);

  const Imported = React.lazy(myImport);
  const MyLazyLoaded = React.lazy(() => loadComponentPromise(
    '@transitive-robotics/webrtc-video', 'webrtc-video-device',
    'cfritz', 'f5b1b62bd4'));

  // const MyLazyLoaded2 = window.transitive?.VideoWrapper;
  // console.log({MyLazyLoaded2});

  useEffect(() =>
    setInterval(() => setSeconds(s => s + 1), 1000), []);

  const toggleShow = () => setShow(current => !current);

  const myref = useRef(null);
  if (myref.current) {
    console.log(myref.current.call('getLag'));
  }
  useEffect(() => {
      myref.current?.call('onLag', (lag) => console.log('listener', lag));
    }, [myref.current]);

  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6ImY1YjFiNjJiZDQiLCJjYXBhYmlsaXR5IjoiQHRyYW5zaXRpdmUtcm9ib3RpY3Mvd2VicnRjLXZpZGVvIiwidmFsaWRpdHkiOjg2NDAwLCJpYXQiOjE2ODY4NDEwOTB9.dJ7UPp2urIalkmg04EwcN4oc3-KF4CWlCemO0ewzWz8';

  return (
    <div className="App">
      <header className="App-header">
        {seconds} seconds

        <button onClick={toggleShow}>{show ? 'Hide' : 'Show'} video</button>

        {show &&
            <webrtc-video-device id="cfritz" host="homedesk.local:8000" ssl="false"
              jwt={jwt}
              count="1"
              timeout="1800"
              type="videotestsrc"
              handlers={{onLag: console.log}}
              ref={myref}
              />
        }

        {/* <Suspense fallback={<Loading />}>
          <Imported />
          <MyLazyLoaded id="cfritz" host="homedesk.local:8000" ssl="false"
            jwt={jwt}
            count="1"
            timeout="1800"
            type="videotestsrc"
            handlers={{onLag: console.log}}
            />
        </Suspense> */}

      </header>
    </div>
  );
}

export default App;
