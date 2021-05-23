import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import SearchIcon from "@material-ui/icons/Search";
import { ArticleMock } from '../../models/Feed';
import Article from './Article';
import {getArticleList} from '../../API'
const Talk=(props)=> {
  const { location } = props;
  const [feed,setFeed]=useState([]);

  const handleGetMarkers = (location)=>{
    const data = `latitude=${location.lat}&longitude=${location.lng}`
    const headers={
     Authorization: `bearer ${localStorage.getItem('token')}`
    }
    getArticleList(data,headers).then(e=>{
      setFeed(e);
    }
  )
}
useEffect(() => {
  if (location != null) {
    handleGetMarkers(location);
  }
}, [location])
  return (
    <Wrapper>
      
      {
        feed.map((article) => (
          <Article article={article} />
        ))
      }
    </Wrapper>
  )
}

export default Talk

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  border: 1px solid white;
  padding: 0 10px;
  margin-bottom: 20px;
`

const SerachForm = styled.input`
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: white;
  &::placeholder {
    color: #FFFFFF99;
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  width: 20px;
  margin: 2px;
  margin-left: auto;
  padding-left: 10px;
`