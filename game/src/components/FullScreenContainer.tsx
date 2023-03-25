import styled from 'styled-components'

const FullScreenContainerDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  > * {
    position: relative;
    z-index: 1;
    user-select: none;
  }
`
export default FullScreenContainerDiv
