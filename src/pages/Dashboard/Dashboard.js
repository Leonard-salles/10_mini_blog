import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom"


// hoks
import { useAuthValue } from "../../Context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid;

  const { deleteDocument } = useDeleteDocument("posts")

  // posts do usuario
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  if(loading){
    return <p>Carregando..</p>
  }
  return (
    <div className={styles.dashboard}>
      <h2>DashBoard</h2>
      <p>gerencie seus posts</p>
      {posts && posts.length  === 0 ? (
        <div className={styles.noposts}>
          <p>Nao foram encontrados posts</p>
          <Link to="/posts/create" className="btn">Criar primeiro post</Link>
        </div>
      ) : (
        <div>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts && posts.map((post)=> <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>
            <div>
              <Link 
                to={`/posts/edit/${post.id}`}
                className="btn btn-outline"
              >
                Ver
              </Link>
              <Link 
                to={`/posts/edit/${post.id}`} 
                className="btn btn-outline"
              >
                Editar
              </Link>
              <button 
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>)}
        </div>
      )}

      
    </div>
  )
}

export default Dashboard
