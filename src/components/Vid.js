import React from 'react';
import Iframe from 'react-iframe'

const Vid = ({ show, url, children, ...props }) => {
  if (!show) return <>{children}</>;
  return <Iframe
    url={url}
    width="100%"
    height="250px"
    id="streamIframe"
    display="initial"
    position="relative"
    allowFullScreen
    {...props}
  />
}
export default Vid;