import { auth } from '../firebase/firebaseConfig';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const PageLogout: React.FC = () => {
	const navigate = useNavigate();

	useEffect (() => {
		auth.signOut();
		navigate('/login');
	}, []);
	return (
		<>로그아웃</>
	)
};

export default PageLogout;