import styles from "./EditPost.module.css"

import { useEffect, useState, } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../..//Context/AuthContext"
import { useFetchDocument } from "../../hooks/useFecthDdocument"
import { useUpdateDocuments } from "../../hooks/useUpdateDocument"


export const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

  const { updateDocument, response } = useUpdateDocuments("posts")
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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data)

    // redirect home page
    navigate("/dashboard")

  }

  return (
    <div className={styles.editPost}>
      {post&& <>
        <h2>Edite seu post: {post.title}</h2>
        <p>Altere os dados ddo seu post como dejesar</p>
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
          <p className={styles.preview_title}>Preview da imagem atual:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title} />
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
          {!response.load && <button className="btn">Editar</button>}
          {response.load && <button className="btn" disabled>Aguarde...</button>}
          {response.error&& <p className="error">{response.error}</p>} 
          {formError&& <p className="error">{formError}</p>} 
        </form>
    
      </>}
    </div>
  )
}
