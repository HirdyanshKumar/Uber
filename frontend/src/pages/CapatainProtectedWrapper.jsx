import React,{useState,useEffect, use, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {CaptainDataContext} from '../context/CaptainDataContext'
import axios from 'axios'

const CapatainProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('captainToken')
    const navigate = useNavigate()
    const {captainData,setCaptainData} = React.useContext(CaptainDataContext)
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        if (!token){
            navigate('/CaptainLogin')
        }
    },[token])

    axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }).then((response)=>{
        if (response.status===200){
            setCaptainData(response.data.captain)
            setIsLoading(false)
        }
    }).catch((err)=>{
        setError(err)
        localStorage.removeItem('captainToken')
        navigate('/CaptainLogin')
    })

    if (isLoading){
        return <div>Loading...</div>
    }

  return (
    <div>
      {children}
    </div>
  )
}

export default CapatainProtectedWrapper