import styles from "./Home.module.css"

import { useNavigate, Link } from "react-router-dom"

import { useState } from "react"

import { useFetchDocuments } from "../../hooks/useFetchDocuments"

import PostsDetails from "../../components/Posts/PostsDetails"

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, load} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos Posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Ou busque por tags..." 
        onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {load && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostsDetails key={post.id} posts={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Nao foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
