import styles from "./CreatePost.module.css"

import { useState, } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../..//Context/AuthContext"
import { useInsertDocument } from "../../hooks/useInserDocument"


export const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { insertDocument, response } = useInsertDocument("posts")
  const { user } = useAuthValue()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")
    // validar imagem da url
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // criar array dde tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checar todos os valorer
    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }

    if(formError) return;
    
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    // redirect home page
    navigate("/")

  }

  return (
    <div className={styles.createPost}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo:</span>
            <input type="text"
              name="title"
              required
              placeholder="Pense num bom titulo.."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input type="text"
              name="image"
              required
              placeholder="Insira uma imagem que represente  sua postagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <label>
            <span>Conteudo:</span>
            <textarea 
              name="body"
              required
              placeholder="Insira o conteudo do post"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              >
              </textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input type="text"
              name="tags"
              required
              placeholder="Insira as tags separadas por virgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>
          {!response.load && <button className="btn">Cadastrar</button>}
          {response.load && <button className="btn" disabled>Aguarde...</button>}
          {response.error&& <p className="error">{response.error}</p>} 
          {formError&& <p className="error">{formError}</p>} 
        </form>
    
    </div>
  )
}
