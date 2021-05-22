import React from 'react'
import styled, { css } from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

function getShowStyle(show) {
  if (show) {
    return css`
      transform: translateY(-50%) translateX(0);
    `
  }

  return css`
    transform: translateY(-50%)  translateX(-120%);
  `
}

const Content = styled.div`
  position: absolute;
  z-index: 50;
  background-color: #000000;
  color: #FFFFFF;
  width: 400px;
  top: 50%;
  left: 10px;
  height: 95%;
  transition-duration: 0.4s;
  ${({ show }) => getShowStyle(show)}
  overflow-y: scroll;
  border-radius: 12px;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
`

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'block',
    height: '100%',
    width: 0,
  }
}))

function Pannel({
  children,
  show: inheritedShow,
}) {
  const [show, setShow] = useState(false)

  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Content
        show={show || inheritedShow}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        { children }
      </Content>
    </div>
  )
}

export default Pannel
