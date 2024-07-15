import { useState, useEffect } from "react"

import styles from "./Register.module.css"
import { useAuthentication } from "../../hooks/useAuthentication"


const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] =  useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState ("")

  const {createUser, load, error: authError, } = useAuthentication();

  const handleSubmit = async(e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    }

    if(confirmPassword !== password){
      setError("As senhas precisam ser iguais")
      return
    }

    const res = await createUser(user)
    console.log(res)
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar !</h1>
        <p>Crie seu usuario e compartilhe suas historias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input name="displayName" 
              value={displayName} 
              onChange={(e) => setDisplayName(e.target.value)} 
              required 
              placeholder="Nome do usuario" />
          </label>
          <label>
            <span>E-mail:</span>
            <input type="email"
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="E-mail do usuario" />
          </label>
          <label>
            <span>Senha:</span>
            <input type="password"
             value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              name="password" 
              required 
              placeholder="Insira sua senha" />
          </label>
          <label>
            <span>Confirmacao de senha:</span>
            <input type="password" 
              name="confirmPassword" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirme sua senha" />
          </label>
          {!load && <button className="btn">Cadastrar</button>}
          {load && <button className="btn" disabled>Aguarde...</button>}
          {error&& <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register
