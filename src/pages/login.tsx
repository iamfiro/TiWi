import KakaoLogin from '../assets/kakao_login.png';
import style from '../styles/login.module.scss';
import {Column} from "../components";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import {useNavigate} from "react-router-dom";
const PageLogin = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((data) => {
                navigate('/');
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <main className={style.container}>
            <Column style={{gap: '15px'}}>
                <h1 className={style.title}>TIWI 로그인</h1>
                <span className={style.description}>뭔가 앱 설명이 들어 갈 곳</span>
            </Column>
            <img className={style.login} src={KakaoLogin} onClick={() => {
                handleLogin();
            }}/>
        </main>
    )
}

export default PageLogin;