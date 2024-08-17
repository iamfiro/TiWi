import NavBar from "../components/NavBar";
import {GoHomeFill} from "react-icons/go";
// import { FaStamp } from "react-icons/fa";
import { MdGolfCourse } from "react-icons/md";

interface NavItemProps {
    isHome: boolean;
}

const TemplateNav = ({ isHome }: NavItemProps) => {
    if(isHome) {
        return (
            <NavBar>
                <NavBar.Item name="홈" id="" icon={<GoHomeFill size={25} />} isHome={true} />
                <NavBar.Item name="코스" id="course" icon={<MdGolfCourse size={25} />} isHome={false} />
            </NavBar>
        )
    } else {
        return (
            <NavBar>
                <NavBar.Item name="홈" id="" icon={<GoHomeFill size={25} />} isHome={false} />
                <NavBar.Item name="코스" id="course" icon={<MdGolfCourse size={25} />} isHome={true} />
            </NavBar>
        )
    }
}

export default TemplateNav;