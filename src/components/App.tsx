import React from "react";
import styled from "styled-components";

export default class App extends React.Component {
 render() {
  return (
    <AppCanvas>
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