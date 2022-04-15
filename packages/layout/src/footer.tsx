import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

function Footer() {
  return <section>Footer is mounted!</section>;
}

export const footerCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Footer,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#footer"),
  errorBoundary() {
    return <h1>An error has occurred</h1>;
  },
});
