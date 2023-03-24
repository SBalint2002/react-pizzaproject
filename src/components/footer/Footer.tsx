import { Link } from "react-router-dom"
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => <footer className="footer">
    <div className="footer-left col-md-4 col-sm-12">
        <p className="about">
            <span> Rólunk </span> A belváros közepén mesés enteriőr kialakítással nagy
            választékkal várjuk vendégeinket. Minőségi konyhatechnikai felszereléssel
            ellátott olasz étterem, igényes környezet. Ételeinket 100% itáliai alapanyagokból készítjük.
            All You Can Eat & Drink.
        </p>

        <div className="icons">
            <Link to="#"><i className="fa fa-facebook"> <FacebookIcon/></i></Link>
            <Link to="#"><i className="fa fa-twitter"> <TwitterIcon/></i></Link>
            <Link to="#"><i className="fa fa-linkedin"> <LinkedInIcon/></i></Link>
            <Link to="#"><i className="fa fa-google-plus"> <GoogleIcon/></i></Link>
            <Link to="#"><i className="fa fa-instagram"> <InstagramIcon/></i></Link>
        </div>
    </div>

    <div className="footer-center col-md-4 col-sm-12">
        <div>
            <span>Elérhetőségek</span>

            <p>Soroksári út 32-34 Budapest, 1095</p>
        </div>
        <div>
            <i className="fa fa-phone"></i>
            <p>(+36) 1234 567 89</p>
        </div>
        <div>
            <i className="fa fa-envelope"></i>
            <p><Link to="#">office@pizzavalto.com</Link></p>
        </div>
    </div>

    <div className="footer-right col-md-4 col-sm-12">
        <h2> Company<span> logo</span></h2>
        <p className="menu">
            <Link to="#"> Home</Link> |
            <Link to="#"> About</Link> |
            <Link to="#"> Services</Link> |
            <Link to="#"> Portfolio</Link> |
            <Link to="#"> News</Link> |
            <Link to="#"> Contact</Link>
        </p>
    </div>
</footer>

export default Footer