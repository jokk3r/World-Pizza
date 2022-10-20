import React from 'react'
import { Link } from 'react-router-dom'
import cartEmptyImg from './../../assets/img/empty-cart.png'

function CartEmpty() {
    
  return (
    <div className="cart cart--empty">
        <h2>Your Cart is empty <span>😕</span></h2>
        <p>You probably haven't chosen a pizza yet.<br/>
        To choose a pizza, go to the home page.
        </p>
        <img src={cartEmptyImg} alt="Empty cart"/>
            <Link className="button button--black" to="/">
                <span>Go back</span>
            </Link>
    </div>
  )
}

export default CartEmpty