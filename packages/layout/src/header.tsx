import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Button } from "@exm/components";
import config from "@exm/settings";

function Header() {
  return (
    <section>
      <Button>teste button {config.domain}</Button>
    </section>
  );
}

export const headerCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Header,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#header"),
  errorBoundary() {
    return <h1>An error has occurred</h1>;
  },
});
