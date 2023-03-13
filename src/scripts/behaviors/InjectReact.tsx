
import React from "react";
import * as ReactDOM from "react-dom";
import Chat from "../../components/Chat";
import CustomEventDispatcher, { CustomEvents } from "./CustomEventDispatcher";

export default function injectReact(){
    //ReactDOM.render(<App />, document.getElementById("react-root"))
}

function injectComponent(Component){
    ReactDOM.render(<Component/>, document.getElementById("react-root"))
}

const emmiter = CustomEventDispatcher.getInstance();
emmiter.on(CustomEvents.INIT_CHAT_UI, () => injectComponent(Chat));