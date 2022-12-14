import axios from 'axios';
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {addItem, selectCartItemById} from '../redux/slices/cartSlice'
import iconCart from '../assets/img/cart.svg';
import { useWindowWidth } from '../hooks/useWindowWidth';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id))
  const [activeType,setActiveType] = useState();
  const [activeSize,setActiveSize] = useState();
  const typeNames =["Thin","Standart"]
  const {width} = useWindowWidth();

  const addedCount = cartItem ? cartItem.count : 0
  const onClickAdd = () => {
    const item = {
      id : pizza.id,
      title : pizza.title,
      price : pizza.price,
      imageUrl : pizza.imageUrl,
      types: typeNames[activeType],
      sizes: pizza.sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  useEffect(()=>{
    
    async function fetchPizza(){
      console.log(pizza)
      try {
        const {data} = await axios.get('https://63287ed29a053ff9aab95e51.mockapi.io/items/' + id)
        console.log(data)
        setPizza(data);
      } catch(error) {
        alert(`can't get pizza`)
        navigate('/')
      }
    }
    fetchPizza();
  },[])

  if(!pizza){
    return "loading..."
  }
  return (
    <div className='container'>
      <div className='full-pizza'>
        {width < 809?
        <div className='full-pizza__header'>
        <p>{pizza.title}</p>
        </div>:""}
   
        <div className='full-pizza__imgBlock'>
          <img className='full-pizza__img' src={pizza.imageUrl} alt="" />
        </div>
        <div className='full-pizza__infoBlock'>
          {width > 809?
          <div className='full-pizza__header'>
          <p>{pizza.title}</p>
          </div>:""}
          <p className='full-pizza__description'>{pizza.description}</p>
          <div className="pizza-block__selector full-pizza__selector">
                  <ul>
                      {pizza.types.map(typeIndex=>(
                          <li onClick={()=>setActiveType(typeIndex)}
                          className={activeType === typeIndex ? "active":""}
                          key={typeIndex}
                          >{typeNames[typeIndex]}</li>
                      ))}
                  </ul>
                  <ul>
                      {pizza.sizes.map((size,i)=>(
                          <li onClick={()=>setActiveSize(i)}
                          className={activeSize === i ? "active":""}
                          key={i}>{size} cm.</li>
                      ))}
                  </ul>
                </div>
          <h4 className='full-pizza__price'>{pizza.price}$</h4>
          <div onClick={onClickAdd} className="button full-pizza__button">
                    <img src={iconCart} alt="add to Cart" />
                    <p>Add to basket</p>
                    <div className="button--outline" >
                      <i>{addedCount}</i>
                    </div>     
          </div>
          <div className='full-pizza__ingridientsBlock'> 
            <p className='full-pizza__ingridientsHeader'>Ingridients</p>
            <div className='full-pizza__ingridientsItems'>
              {pizza.ingridients.map((obj,i)=>(
                <div className='full-pizza__ingridientsItem' key={i}>
                  <img className='full-pizza__ingridientImg' src={obj.url} alt="" />
                  <p className='full-pizza__ingridientName'>{obj.name}</p>
                </div>
                  ))}
            </div>
          </div>
          <div className='full-pizza__energyValueBlock'>
            {pizza.energyValue.map((obj, i)=>(
            <div className='full-pizza__energyValueLine' key={i}>
                <p className='full-pizza__ValueName'>{obj.name}</p>
                <p className='full-pizza__Value'>{obj.value}</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPizza