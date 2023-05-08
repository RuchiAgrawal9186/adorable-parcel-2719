import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import { deleteProduct, getUsers } from '../../Redux/DataReducer/action';
import { useStatStyles } from '@chakra-ui/react';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state=> state.dataReducer.users);
    console.log(users)
    const isLoading = useSelector(state=> state.dataReducer.isLoading);
    const [total, setTotal] = useState(0)
   

    useEffect(()=>{
    dispatch(getUsers())
    },[])

    useEffect(()=>{
      let data= users && users.reduce((acc, curr)=> acc+curr.charge, 0)
      setTotal(data)
      dispatch({type:"TOTAL", payload:data})
    }, [users])

    const handleDelete = (id)=>{
      dispatch(deleteProduct(id)).then(()=>{dispatch(getUsers())})
    }

    return (
        <>
        {
          isLoading? <Spinner/>:<div className="">
          {users &&
            users.map((el) =>{ 
          return  <UserCard key={el.id} handleDelete={handleDelete} {...el} />})}
        </div>
        }
    
       </>
      );
    };
    
    export default Users;
    
