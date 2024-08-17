import KakaoLogin from '../assets/kakao_login.png';
import style from '../styles/login.module.scss';
import {Column} from "../components";
const PageLogin = () => {
    return (
        <main className={style.container}>
            <Column style={{gap: '15px'}}>
                <h1 className={style.title}>TIWI 로그인</h1>
                <span className={style.description}>뭔가 앱 설명이 들어 갈 곳</span>
            </Column>
            <img className={style.login} src={KakaoLogin}/>
        </main>
    )
}

export default PageLogin;