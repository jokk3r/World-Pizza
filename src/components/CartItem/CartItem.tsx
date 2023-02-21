import React from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import minus from '../../assets/img/cart-minus.svg'
import plus from '../../assets/img/cart-plus.svg'
import trash from '../../assets/img/trash-icon.svg'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

type CartItemProps ={
  id:string;
  title:string;
  price:number;
  types:string;
  sizes:number;
  count:number;
  imageUrl:string
}

export const CartItemBlock: React.FC<CartItemProps> = ({id, title, price, types, sizes, count, imageUrl}) => {
 
    const dispatch = useDispatch();

    const onClickPlus = ()=>{
        dispatch(addItem({
            id
        } as CartItem))
    }

    const onClickMinus = ()=>{
        dispatch(
            minusItem(id)
        )
    }

    const onClickRemoveItem = () =>{
        if(window.confirm('Are you sure you want to remove?')){
            dispatch(removeItem(id))
        }
    }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image"
          src={imageUrl}
          alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <div>
          <h3>{title}</h3>
          <p>{types +" crust"}, {sizes} cm.</p>
        </div>
        <div className="cart__item-count">
          <button onClick={onClickMinus} className={clsx("button__countChange",{
            'button__countChange-disabled': count === 1})} disabled={count === 1}>
            <img src={minus} alt="minus" />
          </button>
          <b>{count}</b>
          <button onClick={onClickPlus} className="button__countChange">
            <img src={plus} alt="plus" />
          </button>
        </div>
      </div>
      <div className='cart__right'>
        <div className="cart__delete">
          <button onClick={onClickRemoveItem} className="button__deleteItem">
                <img src={trash} alt="delete" />
          </button>
        </div>
        <div className="cart__price">
          <b>{price*count} $</b>
        </div>
      </div>
  </div>
  )
}

