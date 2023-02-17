import React, { useEffect, useRef } from 'react';
import logoSvg from './../../assets/img/logo-main.svg'
import iconCall from './../../assets/img/call.svg'
import iconCart from './../../assets/img/cart.svg'
import {
 Link, useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { selectCart } from '../../redux/cart/selectors';

function Header(){
  const {items, totalPrice} = useSelector(selectCart)
  const [width] = useWindowWidth();
  const {pathname} = useLocation()
  const isMounted = useRef(false)
 
  const totalCount = items.reduce((sum: number, item: any)=> sum + item.count, 0)

  useEffect(()=>{
    if(isMounted.current){
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items])
  
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