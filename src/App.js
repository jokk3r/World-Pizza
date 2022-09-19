import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import Pizzas from "./assets/pizzas.json"
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
           <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">All Pizza</h2>
          <div className="content__items">
            {Pizzas.map((obj)=>(
               <PizzaBlock {...obj} key={obj.id}/>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
