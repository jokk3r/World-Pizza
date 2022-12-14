import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';
import minus from '../../assets/img/cart-minus.svg'
import plus from '../../assets/img/cart-plus.svg'
import trash from '../../assets/img/trash-icon.svg'

const CartItem = ({id, title, price, types, sizes, count, imageUrl}) => {
 
    const dispatch = useDispatch();

    const onClickPlus = ()=>{
        dispatch(addItem({
            id
        }))
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
          <button onClick={onClickMinus} className="button__countChange">
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

export default CartItem