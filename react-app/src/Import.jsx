import React, {useState} from 'react';

const Imported = () => {
  const [s, setS] = useState(1);
  return <div>I was imported! {s}</div>;
}
export default Imported;
