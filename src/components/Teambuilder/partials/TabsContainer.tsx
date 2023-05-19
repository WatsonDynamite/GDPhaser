import styled from 'styled-components'
import React from 'react'

type PropTypes = {
  content: Array<{ title: string; child: JSX.Element }>
}

/**
 * Component for the tabs that contain most of the app functionality
 */
const TabsContainer = (props: PropTypes) => {
  const [tabIndex, setCurrentTab] = React.useState<number>(0)
  const { content } = props

  return (
    <Wrapper>
      {content.length > 0 && (
        <>
          <TabsRow>
            {content.map(({ title }, idx) => (
              <Tab key={`tab-${idx}`} active={idx === tabIndex} onClick={() => setCurrentTab(idx)}>
                {title}
              </Tab>
            ))}
          </TabsRow>
          <ContentRow>{content[tabIndex].child}</ContentRow>
        </>
      )}
    </Wrapper>
  )
}

export default TabsContainer

const Wrapper = styled.div`
  width: 100%;
`

const TabsRow = styled.div`
  display: flex;
  margin-bottom: -7px;
`

const Tab = styled.div<{ active: boolean }>`
  padding: 15px 30px;
  cursor: pointer;
  border: 4px solid darkgray;
  border-bottom: ${({ active }) => (active ? 'unset' : '4px solid darkgray')};
  border-radius: 25px 25px 0 0;
  background-color: white;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 1.3em;

  color: ${({ active }) => (active ? 'black' : 'lightgray')};
`

const ContentRow = styled.div`
  border: 4px solid darkgray;
  border-radius: 0 0 25px 25px;
  overflow: hidden;
`
