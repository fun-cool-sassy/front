import React from 'react'
import styled from 'styled-components'

import MapComponent from './MapComponent'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

function StreetViewMap() {
  return (
    <Wrapper>
      <MapComponent />
    </Wrapper>
  )
}

export default StreetViewMap
