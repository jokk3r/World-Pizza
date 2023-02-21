import React, { useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import {Search} from '../index'
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps ={
  value:number;
  onChangeCategory: (i: number) => void
}
const categories =["All","Meatlover","Veggie","Traditional","Hot","Spicy",]

export const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory})=>{

  useWhyDidYouUpdate("Categories",{value, onChangeCategory})
  const [width] = useWindowWidth();
    return(
      <div className="categories">
        <ul>
          {categories.map((categoryName, i)=>(
            <li key={i} onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
            >{categoryName}</li>
          ))}
        </ul>
        {width > 809 ? (<div className='categories__search'>
          <Search/>
        </div>):<></>}
       
    </div>
    )
  })
