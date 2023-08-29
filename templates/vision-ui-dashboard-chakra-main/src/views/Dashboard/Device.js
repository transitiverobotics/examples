import React, {useEffect, useState} from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

const host = 'transitiverobotics.com';
const ssl = true;
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6Il9mbGVldCIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy9mb3hnbG92ZS13ZWJydGMiLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTY4NjI1MzcwMH0.9mRdXV-jdREL8qB68qeTsnck_DzXZQTKfAIKDhdtus8';

const loadComponent = (host, capability, name, userId, deviceId, onLoad) => {
  if (userId && deviceId && !customElements.get(name)) {
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
  }
};

const Wrapped = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/foxglove-webrtc',
        'foxglove-webrtc-device', 'cfritz', '_fleet',
        () => setReady(true));
    }, []);

  return (!ready ? <div>Loading</div> :  <Main />);
};

function Main() {

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='lg' color='#fff' fontWeight='bold'>
            Device
          </Text>
        </CardHeader>
        <CardBody>

          Capability goes here

        </CardBody>
      </Card>
    </Flex>
  );
}

// export default Tables;
export default Wrapped;
