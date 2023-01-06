
import React,{ useEffect,useState } from 'react';

export const  useWindowWidth =(()=>

typeof window !== 'undefined'?()=>{

  const [value, setValue]= useState(()=>({
    width: window.innerWidth,
  }))

  useEffect(()=>{
   
    const handler = ()=>
      setValue({
        width: window.innerWidth,
      })
      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    
  },[])
  return value
}
:()=>({width: null}))()



