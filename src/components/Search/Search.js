import React,{ useRef,useState,useCallback} from 'react'
import debounce from 'lodash.debounce'
import style from "./Search.module.scss"
import { useDispatch } from 'react-redux'
import {setSearchValue} from '../../redux/slices/filterSlice'
import iconSearch from '../../assets/img/Search.svg'
const Search = () =>{
const dispatch = useDispatch()
const [value, setValue] = useState('')

const inputRef = useRef();

const onClickClear = ()=>{
  dispatch(setSearchValue(''))
  setValue('')
  inputRef.current.focus();
}

const updateSearchValue = useCallback(
  debounce((str)=>{
    dispatch(setSearchValue(str))
  },250),[]
)

const onChangeInput = (event)=>{
  setValue(event.target.value)
  updateSearchValue(event.target.value)
}
  return (
    <div className={style.root}>
        <img className={style.icon__search} src={iconSearch} alt="search" />
        <input ref={inputRef} value={value} onChange={(e)=>onChangeInput(e)} className={style.input} placeholder='Looking for Pizza '/>
        {value &&(
        <svg onClick={()=>onClickClear()} className={style.icon__close} data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg"><title/><path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>
        )}
      
    </div>
  )
}

export default Search