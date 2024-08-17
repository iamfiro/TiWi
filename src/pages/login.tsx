import style from '../styles/login.module.scss';
import {Column} from "../components";
import {getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, getRedirectResult} from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
const PageLogin = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();

        await signInWithRedirect(auth, provider);
    }

    useEffect(() => {
        const unsubscript = onAuthStateChanged(auth, () => {
            window.history.replaceState({}, '', '/');
        });

        return () => {
            unsubscript();
        }
    }, []);

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