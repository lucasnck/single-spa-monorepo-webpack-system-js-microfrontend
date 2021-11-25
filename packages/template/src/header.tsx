import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

export default function Root(props) {
  return <section>{props.name} is mounted!</section>;
}

export const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});