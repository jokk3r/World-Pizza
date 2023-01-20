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
  const [width] = useWindowWidth();
  const {pathname} = useLocation()
 
  const totalCount = items.reduce((sum: number, item: any)=> sum + item.count, 0)
    return(
        <div className="header">
          <div className="container">
            <div className="header__call">
              {width > 809 ? (
                <>
                <img src={iconCall} alt="call" />
                <div className='header__info'>
                  <p className='header__number'>+49 199 99 99 99</p>
                  <p className='header__text'>Lazy to order online? —Call us!</p>
                </div>
                </>
              ):<img src={iconCall} alt="call" /> }
                
            </div>
            <Link to="/World-of-Pizza" className='header__center'  >
              <div className={`header__logo ${pathname !== '/World-of-Pizza/cart' ? (''):('header__logo--left')}`}>
                <img width="38" src={logoSvg} alt="Pizza logo" />
                
              </div>
            </Link>
           
            <div className="header__cart">
              {pathname !== '/World-of-Pizza/cart'&&(
                <>
              <span className="header__price">{totalPrice}$</span>
              <Link to="/World-of-Pizza/cart" className="button button--cart">
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