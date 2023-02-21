import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import iconCart from '../../assets/img/cart.svg'
import { selectCartItemById } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";


type PizzaBlockType={
  id: string;
  title:string;
  price:number;
  imageUrl:string;
  types:number[];
  sizes:number[];
}


export const PizzaBlock: React.FC<PizzaBlockType> = ({id,title,price,imageUrl,types,sizes})=>{
  
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id))
  const [activeType,setActiveType] = useState(0);
  const [activeSize,setActiveSize] = useState(0);
  const typeNames = ["Thin","Standart"]

  const addedCount = cartItem ? cartItem.count : 0
  
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      types: typeNames[activeType],
      sizes: sizes[activeSize],
      count: 0,
    }
    dispatch(addItem(item))
  }
 
    return(
        <div className="pizza-block-wrapper">
          <div className="pizza-block">
            <Link to={`/World-of-Pizza/pizza/${id}`}>
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
              />
            </Link>
              <h4 className="pizza-block__title">{title}</h4>
             
              <div className="pizza-block__selector">
                <ul>
                    {types.map(typeIndex=>(
                        <li onClick={()=>setActiveType(typeIndex)}
                        className={activeType === typeIndex ? "active":""}
                        key={typeIndex}
                        >{typeNames[typeIndex]}</li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size,i)=>(
                        <li onClick={()=>setActiveSize(i)}
                        className={activeSize === i ? "active":""}
                        key={i}>{size} cm.</li>
                    ))}
                </ul>
              </div>
               
              <div className="pizza-block__bottom">
                <div className="pizza-block__price">
                  {price}$
                </div>
                <div onClick={onClickAdd} className="button pizza-block__button">
                  <img src={iconCart} alt="add to Cart" />
                  <div className="button--outline" >
                    <i>{addedCount}</i>
                  </div>
                </div>
              </div>
              <Link to={`/World-of-Pizza/pizza/${id}`}>
                <div className="pizza-block__learnMore">
                  <span>Learn More</span>
                </div>
              </Link>
          </div>
        </div>
    )
}

