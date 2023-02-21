import React from 'react'
import { Link } from 'react-router-dom'
import cartEmptyImg from './../../assets/img/cart-empty.svg'

export const CartEmpty: React.FC = () => {
    
  return (
    <div className="cart cart--empty">
      
        <img src={cartEmptyImg} alt="Empty cart"/>
        <h2>Your Cart is empty </h2>
        <p>Choose your best Pizza
        </p>
            <Link className="button button--back" to="/World-of-Pizza">
                <span>Go back</span>
            </Link>
    </div>
  )
}

