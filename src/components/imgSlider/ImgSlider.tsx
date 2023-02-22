import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImgSlider.css'
import logo1 from './pizza1.jpg';
import logo2 from './pizza2.jpg';
import logo3 from './pizza3.jpg';
interface Url {
    url:string;
    desc: string;
}

function ImgSlider() {

    const url: Url[] = [{
        url: logo1,
        desc: "pizza1"
    },
        {
            url: logo2,
            desc: "pizza2"
        },
        {
            url: logo3,
            desc: "pizza3"
        }
    ]

    return (

        <Carousel style={{marginTop: "40px"}} >
            {url.map(x=>
                <Carousel.Item interval={3000}>
                    <div>
                    <img
                        className="fixed d-block w-100"
                        src={x.url}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{x.desc}</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>)}
        </Carousel>

    );
}

export default ImgSlider;