import React from "react";

const Vid = ({ show, url, children, ...props }) => {
  if (!show) return <>{children}</>;
  return (
    <iframe
      src={url}
      title={url}
      width="100%"
      height="250px"
      id="streamIframe"
      style={{ display: "initial", position: "relative" }}
      allowFullScreen
      {...props}
    />
  );
};
export default Vid;
