import styled from 'styled-components'
import MainDash from './components/mainDash'
import SideBar from './components/sidebar'
import firebase from 'firebase/app'
import { FirebaseAuthConsumer } from "@react-firebase/auth";


const MainLogedOut = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
    // padding: 200px;
	background: ${props => props.theme.colors.grey1};
`
const Main2Columns = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-rows: auto;
    grid-template-areas:
    "sidebar body";
    min-height: 100vh;
    padding: 10px;
	background: ${props => props.theme.colors.grey3};
	font-family: ${props => props.theme.font};
`

const Body = styled.div`
  grid-area: body;
  background: ${props => props.theme.offwhite2};
  /* min-height: 100vh; */
`

const Button = styled.div`
    cursor: pointer;
    background: black;
    padding: 30px;
    color: ${props => props.theme.colors.offwhite2};
    border-radius: 3px;
`



const DashBoard = () => {


    return (
		<FirebaseAuthConsumer>
  		{({ isSignedIn, user, providerId }) => (
			<React.Fragment>
				

			{/* ####### PAINEL LOGGEDOUT ################################### */}
				{!user &&
					<MainLogedOut>
						<Button onClick={() => {const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
															firebase.auth().signInWithPopup(googleAuthProvider);
															}}
						>
							Entrar com Google
						</Button>
					</MainLogedOut>
				}


			{/* ####### PAINEL LOGGEDIN ###################################*/}
				{/* {user && (user.uid === 'xQy82GqnfoVUnS7aAYcarSId1Oz2' || user.uid === 'mfi2qySA1DSQbxvTAftKAeDdZuJ3') && */}
				{user && (user.uid === 'FiPwxpeLUUO17zoFnkLchmc8FOy1' || user.uid === 'k6o9RqSmspXNi9sWVq40vkDQhZ02' || user.uid === 'mfi2qySA1DSQbxvTAftKAeDdZuJ3') &&
					<Main2Columns>
						<SideBar />

						<Body>
							<MainDash />
						</Body>
					</Main2Columns>
				}

			</React.Fragment>
		)}
		</FirebaseAuthConsumer>
    )
}

export default DashBoard;