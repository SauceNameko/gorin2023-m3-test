import { useState } from 'react'
import './App.css'
import { useLogin } from './hooks/useLogin'
import { LoginScene } from './components/LoginScene';
import { Main } from './components/Main';
function App() {
  const { isLogin, loginCheck, logout } = useLogin();
  return (
    <>
      {!isLogin && < LoginScene loginCheck={loginCheck} ></LoginScene >}
      {isLogin && <Main isLogin={isLogin} logout={logout} ></Main>}
    </>
  )
}

export default App
