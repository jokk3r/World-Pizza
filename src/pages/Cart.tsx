import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Link
 } from "react-router-dom";
import CartEmpty from '../components/CartEmpty/CartEmpty';
import CartItem from '../components/CartItem/CartItem';
/* import { selectCart, clearItems } from '../redux/slices/cartSlice'; */
import cross from './../assets/img/cross-red.svg'
import back from './../assets/img/back-arrow.svg'
import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slice';

const Cart: React.FC = () => {

  const dispatch = useDispatch();
  const {items, totalPrice} = useSelector(selectCart)

  const totalCount = items.reduce((sum:number, item:any)=> sum + item.count, 0)

  const onClickClear = () =>{
    if(window.confirm('Are you sure you want to remove all pizzas?')){
        dispatch(clearItems())
    }
  }
  
  if(!totalPrice){
    return <CartEmpty/>
  }

  return (
  <div className="container container--cart">
    <div className="cart">
      <div className="cart__top">
        <h2 className="cart__title"> Cart</h2>
        <div onClick={onClickClear} className="cart__clear">
          <img src={cross} alt="clear all items" />
          <span>Clear all</span>
        </div>
      </div>
      <div className="content__items">
        {
          items.map((item: any) => <CartItem key={item.id} {...item}/>)
        }
      </div>
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span> Total: <b>{totalCount}</b>
          </span>
          <span className='cart__bottom-details-amount'> Order amount: <b>{totalPrice} $</b> </span>
        </div>
        <div className="cart__bottom-buttons"> 
          <div className="button button__pay">
            <span>Pay now</span>
          </div>
          <Link className="button  button__back " to="/World-of-Pizza">
            <span><img src={back} alt="back" /> Back</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )

}

export default Cart