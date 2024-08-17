import NavBar from "../components/NavBar";
import {GoHomeFill} from "react-icons/go";
import {FaBasketShopping} from "react-icons/fa6";
import { FaStamp } from "react-icons/fa";

const TemplateNav = () => {
    return (
        <NavBar>
            <NavBar.Item name="스탬프" id="stamp" icon={<FaStamp size={23} />} />
            <NavBar.Item name="홈" id="" icon={<GoHomeFill size={25} />} />
            <NavBar.Item name="쇼핑" id="shop" icon={<FaBasketShopping size={25} />} />
        </NavBar>
    )
}

export default TemplateNav;