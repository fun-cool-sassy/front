import React from 'react'
import styled from 'styled-components'

import MapComponent from './MapComponent'
import html2canvas from "html2canvas";
import ScreenShot from '../ScreenShot';
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const StreetViewMap = (props)=> {
  const { onLocationChange } = props;

  return (
    <Wrapper>
      <MapComponent onLocationChange={onLocationChange} />
    </Wrapper>
  )
}

export default StreetViewMap
