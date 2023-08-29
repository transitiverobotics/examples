/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

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

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

// local
// const host = 'homedesk.local:8000';
// const ssl = false;
// const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmcml0eiIsImRldmljZSI6Il9mbGVldCIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy9mb3hnbG92ZS13ZWJydGMiLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTY4NjI1Mzk4OH0.SWeiZAlB1X54D2AYxjz28MaG16bAe3KOQyaa6VXIPd8';

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

const WrappedTables = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
      loadComponent(host, '@transitive-robotics/foxglove-webrtc',
        'foxglove-webrtc-device', 'cfritz', '_fleet',
        () => setReady(true));
    }, []);

  return (!ready ? <div>Loading</div> :  <Tables />);
};

const TheTable = () => <Table variant='simple' color='#fff'>
  <Thead>
    <Tr my='.8rem' ps='0px' color='gray.400'>
      <Th
        ps='0px'
        color='gray.400'
        fontFamily='Plus Jakarta Display'
        borderBottomColor='#56577A'>
        Device
      </Th>
      <Th
        color='gray.400'
        fontFamily='Plus Jakarta Display'
        borderBottomColor='#56577A'>
        Location
      </Th>
      <Th
        color='gray.400'
        fontFamily='Plus Jakarta Display'
        borderBottomColor='#56577A'>
        Status
      </Th>
      <Th borderBottomColor='#56577A'></Th>
      <Th borderBottomColor='#56577A'></Th>
    </Tr>
  </Thead>
  <Tbody>
    {tablesTableData.map((row, index, arr) => {
      return (
        <TablesTableRow
          key={index}
          name={row.name}
          logo={row.logo}
          email={row.email}
          subdomain={row.subdomain}
          domain={row.domain}
          status={row.status}
          date={row.date}
          lastItem={index === arr.length - 1 ? true : false}
          foxglove={<foxglove-webrtc-device id="cfritz" host={host}
            ssl={ssl} jwt={jwt} device={row.device} />}
          />
      );
    })}
  </Tbody>
</Table>;

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='lg' color='#fff' fontWeight='bold'>
            Robots
          </Text>
        </CardHeader>
        <CardBody>
          <TheTable />
        </CardBody>
      </Card>
    </Flex>
  );
}

// export default Tables;
export default WrappedTables;
