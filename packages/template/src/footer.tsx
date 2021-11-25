import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

function Footer(props) {
  return <section>Footer is mounted!</section>;
}

export const footerCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Footer,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#footer"),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});
