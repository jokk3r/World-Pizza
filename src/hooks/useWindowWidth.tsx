/* 
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
 */
import { useEffect, useState } from 'react';


type TWindowSize = [number];

type THook = TWindowSize;

export const useWindowWidth = (): THook => {
  const initSize: TWindowSize = [
    window.innerWidth
  ];
  const [windowSize, setWindowSize] = useState<TWindowSize>(initSize);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize([
        window.innerWidth
      ]);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

