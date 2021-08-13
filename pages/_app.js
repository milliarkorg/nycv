import App from 'next/app'
import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import reset from 'styled-reset'
// import reset from 'styled-reset-advanced';
import Menu from '../components/layout/menu'
import Nav from '../components/layout/nav'
import Footer from '../components/layout/footer'
import { MenuContext } from '../components/context/menucontext'
import '../assets/css/font-imports.css'
import 'react-toastify/dist/ReactToastify.css';


const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        box-sizing: border-box;
        a {
            text-decoration: none;
            color: inherit;
        }
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
`

const theme = {
    font: 'Montserrat',
    colors: {
        nydark: '#3C444D',
        green: '#6AB04C',
        yellow: '#EFBB4F',
        offwhite: '#FAFBFC',
        offwhite2: '#F7F7F7',
        salmon: '#E09F7D',
        orange: '#EF5D60',
        pink: '#EC4067',
        purple: '#A01A7D',
        darkpurple: '#311847',
        darkgrey: '#484848',
        grey1: '#E5E5E5',
        grey2: '#CCCCCC',
        grey3: '#B2B2B2',
        grey4: '#999999',
        grey5: '#7F7F7F',
        grey6: '#666666',
        grey7: '#575757',
        grey8: '#444444',
        grey9: '#333333',
        grey10: '#222222',
    },
    layout: {
        navHeight: '0px',
        navHeightMob: '0px',
        footerHeight: '50px',
        footerHeightMob: '50px'
    }
}

const CanvasStyle = styled.div`
    background: #E5E5E5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const MainStyle = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 1440px;

    // @media (max-width: 1440px) {
    //     width: 100%;
    // }
`

/* const firebaseConfig = {
    apiKey: "AIzaSyCoeywy-lFmiWjxr_EXQIl4C9nnTihZQ7A",
    authDomain: "new-york-city-village.firebaseapp.com",
    databaseURL: "https://new-york-city-village.firebaseio.com",
    projectId: "new-york-city-village",
    storageBucket: "new-york-city-village.appspot.com",
    messagingSenderId: "359184157731",
    appId: "1:359184157731:web:29d0f22c8ad4f4ec133596"
}; */

export default class MyApp extends App {

    constructor(props) {
        super(props);

        this.openMenu = (bool) => {
            this.setState({
                isOpen: bool
            })
        };
        this.state = {
            isOpen: false,
            openMenu: this.openMenu
        };
    }
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <CanvasStyle>
                        <MenuContext.Provider value={this.state}>
                            <MainStyle>
                                <Menu />
                                <Nav />
                                <Component {...pageProps} />
                                <Footer />
                            </MainStyle>
                        </MenuContext.Provider>
                    </CanvasStyle>
                </ThemeProvider>
            </>
        )
    }
}