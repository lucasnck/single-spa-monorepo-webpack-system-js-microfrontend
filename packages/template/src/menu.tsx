import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

function Menu(props) {
  return <section>Menu is mounted!</section>;
}

export const menuCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Menu,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#menu"),
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});
