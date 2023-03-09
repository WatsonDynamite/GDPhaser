
import React from "react";
import * as ReactDOM from "react-dom";
import App from "../../components/App";

export default function injectReact(){
    ReactDOM.render(<App />, document.getElementById("react-root"))
}