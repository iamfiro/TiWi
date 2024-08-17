import style from '../styles/login.module.scss';
import {Column} from "../components";
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import {useEffect} from "react";
import Logo from '../assets/logo.svg';
const PageLogin = () => {

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
                <img src={Logo} width={120} style={{ margin: '0 auto', marginTop: '120px'}} />
            </Column>
            <button className={style.submit} onClick={() => handleLogin()}>
                <img src={'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png'} />
                <span>구글 로그인</span>
            </button>
        </main>
    )
}

export default PageLogin;