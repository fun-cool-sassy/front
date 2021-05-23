import { Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { MockImage } from '../../models/Feed'

function Article({
  article
}) {
  const handleClick = useCallback(() => {
    // TODO
  }, [])
  return (
    <Wrapper>
      {console.log(article)}
      <ImageWrapper onClick={handleClick}>
        <Typography varient="h6">{article.address}</Typography>
        <Typography varient="caption">{article.detail}</Typography>
        <MockImage src={article.content_location}/>
      </ImageWrapper>
    </Wrapper>
  )
}

export default Article

const Wrapper = styled.div`
  display: flex;
  color: white;
`

const ImageWrapper = styled.div`
  width: 100%;

  & > * {
    width: 100%;
    border-radius: 8px;
  }
`

const Content = styled.div``

const Footer = styled.div``