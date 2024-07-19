import NavBar from "../components/NavBar";
import { MdMap } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaBasketShopping } from "react-icons/fa6";
import IconDog from '../../public/icons/dog.png';
import IconCat from '../../public/icons/cat.png';
import style from '../styles/shop.module.scss';
import { IoSearchSharp } from "react-icons/io5";

function PageShop() {
    return (
        <>
        <main>
            <header className={style.header}>
                <h1 className={style.title}>쇼핑</h1>
                <div className={style.shopSelect}>
                    <button data-selected={false}>
                        <img src={IconDog} width={20} />
                        <span>강아지</span>
                    </button>
                    <button data-selected={true}>
                        <img src={IconCat} width={20} />
                        <span>고양이</span>
                    </button>
                </div>

            </header>
            <div className={style.inputBox}>
                <IoSearchSharp size={20} />
                <input type="text" placeholder="검색어를 입력하세요" />
            </div>
        </main>
        <NavBar>
            <NavBar.Item name="동물병원" id="map" icon={<MdMap />} />
            <NavBar.Item name="홈" id="" icon={<GoHomeFill />} />
            <NavBar.Item name="쇼핑" id="shop" icon={<FaBasketShopping />} />
        </NavBar>
        </>
    );
}

export default PageShop;