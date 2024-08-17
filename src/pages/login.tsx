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
            <button className={style.submit} onClick={() => handleLogin()}>
                <img src={'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png'} />
                <span>구글 로그인</span>
            </button>
        </main>
    )
}

export default PageLogin;