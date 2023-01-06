import React from 'react'
import Items from "./../assets/data/ContactsItems.json"

function Contacts() {
  return (
    <div className="container" >
        <div className="contacts">
            <h2 className="contacts__header">Contacts</h2>
            <div className="contacts__items">
              {Items.map((item,i)=>
                  <div className="contacts__item" key={i}>  
                      <p className="contacts__item-header">{item.name}</p>
                      <p className="contacts__item-value">{item.value}</p>
                  </div>
              )}
            </div>
        </div>
    </div>
  )
}

export default Contacts