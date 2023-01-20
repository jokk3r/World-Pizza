import React from 'react'
import mainImg from './../assets/img/about-main.png'
import { useWindowWidth } from '../hooks/useWindowWidth';
import { Link } from 'react-router-dom';

const About:React.FC = ()=> {

    const [width] = useWindowWidth();
    
  return (
    <div className="container" >
        <div className="about">
            <div className="about__header">
                <h2>About</h2>
            </div>
            <p className="about__mainInfo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, fugit. Nam officia fuga inventore unde qui ad amet consequatur quasi et maiores incidunt asperiores quis repudiandae tenetur, facilis excepturi porro blanditiis iusto similique quibusdam provident?
            </p>
            <p className="about__secondInfo">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci nemo aut labore repudiandae laudantium hic quas ea et, voluptas, inventore tempora voluptates, a nobis aspernatur est saepe vero nesciunt eveniet eligendi eaque. Nesciunt illo, velit sit ea accusamus, sapiente nostrum labore quisquam beatae ducimus vero repellat corporis eos voluptatibus tempora est dignissimos molestiae odio.
            </p>
            <div className="about__img">
                <img src={mainImg} alt="mainImg" />
            </div>
            <div className="about__statistics">
                <div className="about__statistics-element">
                    <h3 className='about__statistics-count'>12</h3>
                    <p className='about__statistics-info'>Years we’ve been doing pizza</p>
                </div>
                <div className="about__statistics-element">
                    <h3 className='about__statistics-count'>280</h3>
                    <p className='about__statistics-info'>Restaurants all over the world</p>
                </div>
                <div className="about__statistics-element">
                    <h3 className='about__statistics-count'>540</h3>
                    <p className='about__statistics-info'>Orders we make every day</p>
                    {width > 809 && width < 1182 ?
                        <Link to="/World-of-Pizza">
                            <div className="button about__button">Choose your pizza
                            </div>
                        </Link>:""}
                </div>
                {width > 1182 ?
                <div className="about__statistics-element">
                    <Link to="/World-of-Pizza">
                        <div className="button about__button">Choose your pizza
                        </div>
                    </Link>
                </div>:""}
               
            </div>
            {width < 809 ?
                    <Link to="/World-of-Pizza">
                        <div className="button about__button">Choose your pizza
                        </div>
                    </Link>
            :""}
        </div>
    </div>)
}

export default About