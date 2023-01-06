import React from 'react';
import logoSvg from './../../assets/img/logo-main.svg'
import iconCall from './../../assets/img/call.svg'
import iconCart from './../../assets/img/cart.svg'
import {
 Link, useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/slices/cartSlice';
import { useWindowWidth } from '../../hooks/useWindowWidth';

function Header(){
  const {items, totalPrice} = useSelector(selectCart)
 const {width} = useWindowWidth();
  const {pathname} = useLocation()
 
  const totalCount = items.reduce((sum, item)=> sum + item.count, 0)
    return(
        <div className="header">
          <div className="container">
            <div className="header__call">
              {width > 809 ? (
                <>
                <img src={iconCall} alt="call" />
                <div className='header__info'>
                  <p className='header__number'>09901 82 46 37</p>
                  <p className='header__text'>Lazy to order online? —Call us!</p>
                </div>
                </>
              ):<img src={iconCall} alt="call" /> }
                
            </div>
            <Link to="/" className='header__center'  >
              <div className={`header__logo ${pathname !== '/cart' ? (''):('header__logo--left')}`}>
                <img width="38" src={logoSvg} alt="Pizza logo" />
                
              </div>
            </Link>
           
            <div className="header__cart">
              {pathname !== '/cart'&&(
                <>
              <span className="header__price">{totalPrice}$</span>
              <Link to="/cart" className="button button--cart">
                <img src={iconCart} alt="" />
                <div className="header__cart--count" >
                  <span>{totalCount}</span>
                </div>
              </Link>
                </>
              )}
            </div>
          
          </div>
        </div>
    )
  }

export default Header;