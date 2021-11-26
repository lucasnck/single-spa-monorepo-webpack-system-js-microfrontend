import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

function Header(props) {
  return <section>Header is mounted!</section>;
}

export const headerCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Header,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#header"),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});