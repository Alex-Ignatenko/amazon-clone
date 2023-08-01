import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { GetURLSearchFilter } from '../../Services/GetURLSearchFilter';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';

const SearchBox = () => {

 const [query, setQuery] = useState("");
 const {search, pathname} = useLocation();
 const navigate = useNavigate();

const submitHandler = (e) => {
    e.preventDefault();
    const link = GetURLSearchFilter(search, {query: query || 'all'});  
    navigate(link);
};

//Enables search as you type via use effect that fires every query change
 useEffect(() =>{
    if(pathname != '/search' && !query){
        return;
    };
    const link = GetURLSearchFilter(search, {query: query || 'all'});  
    navigate(link);

 },[query]);



 return (
    <>
        <Form onSubmit={submitHandler} className='d-flex me-auto w-120'>
            <InputGroup className="search-box">
                <FormControl area-describedby='button-search' type='text' onChange={(e) => setQuery(e.target.value)} placeholder='Search'/>
                <Button variant='outline-primary' type='submit' id='button-search'><i className='fas fa-search'></i></Button>
            </InputGroup>
        </Form>
    </>
  )
}

export default SearchBox