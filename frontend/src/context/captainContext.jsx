import React, { createContext, useState } from 'react'


export const CaptainDataContext = createContext()

const captainContext = ({children}) => {

    const [ captain, setCaptain ] = useState({})
    const updateCaptain = (data) => {
        setCaptain(data)
    }
  return (
    <CaptainDataContext.Provider value={{ captain, updateCaptain }}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default captainContext