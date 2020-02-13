import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = ({ type, color }) => (
  <ReactLoading type={"spin"} color={"#020805"} height={"20%"} width={"20%"} />
);

export default LoadingComponent;
