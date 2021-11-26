import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
// @ts-ignore
import config from "@exm/settings";

const { menu } = config;

function Menu(props) {
  const renderMenu = useMemo(
    () => menu?.map((item, index) => <div key={index}>{item.title}</div>),
    []
  );

  return <section>Menu is mounted! {renderMenu}</section>;
}

export const menuCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Menu,
  // @ts-ignore
  domElementGetter: (props) => document.querySelector("#menu"),
  errorBoundary(err, info, props) {
    return null;
  },
});
