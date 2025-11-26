import React,{useContext,useEffect} from 'react'
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [Loading,setLoading] = React.useState(true)
    const {userData,setUserData} = React.useContext(UserContext)
    useEffect(()=>{
        if(!token){
            navigate('/UserLogin')
        }
    },[token])
    axios.get(`${import.meta.env.VITE_API_URL}/users/profile`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((response)=>{
        if (response.status===200){
            setUserData(response.data.user)
            setLoading(false)
        }
    }).catch((err)=>{
        localStorage.removeItem('token')
        navigate('/UserLogin')
    })

    if (Loading){
        return <div>Loading...</div>
    }
  return (
    <div>{children}</div>
  )
}

export default UserProtectedWrapper