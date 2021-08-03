import Link from 'next/link'
import styled from 'styled-components'


const CanvasBar = styled.div`
  grid-area: sidebar;
  background: ${props => props.theme.colors.grey8};
  font-family: ${props => props.theme.font};
  padding: 50px 30px 30px 40px;

`
const SideItems = styled.div`
    cursor: pointer;
	font-size: 12px;
	text-transform: uppercase;
	color: white;
	margin-bottom: 15px;
`

const SideBar = () => {

    return(
        <CanvasBar>
            <Link href='/painel'><SideItems>Painel</SideItems></Link>
            <Link href='/painel/pensionatos'><SideItems>Pensionatos</SideItems></Link>
            {/* <Link href='/painel/info'><SideItems>Informações</SideItems></Link> */}
        </CanvasBar>
    )
}

export default SideBar