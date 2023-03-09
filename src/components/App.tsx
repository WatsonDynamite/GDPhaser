import React from "react";
import styled from "styled-components";

export default class App extends React.Component {
 render() {
  return (
    <AppCanvas onClick={(e) => e.preventDefault()}>
        <div style={{ textAlign: "center" }}>
            <h1> TEST asdasdsad </h1>
        </div>
    </AppCanvas>
  );
 }
}

const AppCanvas = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;

    > * {
        position: relative;
        z-index: 1;
    }
`