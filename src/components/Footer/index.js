import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaWhatsapp,
    FaInstagram,
    FaWifi,
    FaPhone,
    FaMailBulk
} from "react-icons/fa";
import "./index.css";
import { useContext } from "react";
import { HeaderFooterContext } from "../../contexts";
const Footer = ()=>{
    const [headerFooter,setHeaderFooter] = useContext(HeaderFooterContext);
    const year = new Date().getFullYear();
    return(
        <div className={"footer"}
        style={{
            display:headerFooter?"flex":"none"
        }}
        >
            <div className={"links"}>
                <div className={"quick-links"}>
                    <h3>Quick links</h3>
                    <a className="link" to="/">
                        Marketplace
                    </a>
                    <a className="link" to="/">
                        Terms & Conditions
                    </a>
                    <a className="link" to="/">
                        Privacy Policy
                    </a>
                </div>

                <div className={"quick-links"}>
                    <h3>Customer Service</h3>
                    <a className="link" to="/">
                        Frequently Asked Questions
                    </a>
                    <a className="link" to="/">
                        Buyers guide
                    </a>
                    <a className="link" to="/">
                        Sellers guide
                    </a>
                    <a className="link" to="/">
                        About Us
                    </a>
                </div>

                <div className={"quick-links"}>
                    <h3>Contact us</h3>
                    <a className="link" to="/">
                        <FaPhone size={20} fill={"#ffffff"} />
                        012324267
                    </a>
                    <a className="link" to="/">
                        <FaMailBulk size={20} fill={"#ffffff"} />
                        info@travel.com
                    </a>
                    <a className="link" to="/">
                        <FaWifi size={20} fill={"#ffffff"} />
                        Our blog
                    </a>
                </div>

                <div className={"quick-links"}>
                    <h3>Join our newsletter</h3>
                    <p className="link" >
                        Access our best deals and tips.
                    </p>
                    <div className="subscribe" >
                        <input placeholder={"Enter email..."} />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className={"divider"}  >
                <hr />
            </div>

            

            <div className={"social"}>
                <p>Copyright @ {year} travel.com. All rights reserved.</p>
                <div className={"social-media"}>
                    <a className="footer-link" to={"https://facebook.com"}>
                        <FaFacebook size={20} fill={"#ffffff"} />
                    </a>
                    <a className="footer-link" to={"https://twitter.com"}>
                        <FaTwitter size={20} fill={"#ffffff"} />
                    </a>
                    <a className="footer-link" to={"https://instagram.com"}>
                        <FaInstagram size={20} fill={"#ffffff"} />
                    </a>
                    <a className="footer-link" to={"https://wa.me.com"}>
                        <FaWhatsapp size={20} fill={"#ffffff"} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;