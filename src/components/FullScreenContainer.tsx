import styled from "styled-components";

const FullScreenContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    
    > * {
        position: relative;
        z-index: 1;
        user-select: none;
    }
`

export default FullScreenContainer;