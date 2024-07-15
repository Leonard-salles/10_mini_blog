import { useFetchDocument } from "../../hooks/useFecthDdocument"
import styles from "./Post.module.css"

//hoks
import { useParams } from "react-router-dom"

const Post = () => {

    const { id } = useParams()
    const { document: post, load } = useFetchDocument("posts", id)


  return (
    <div className={styles.post_container}>
      {load && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Esses post trata sobre: </h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) =>(
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
            </div>
        </>
      )}
    </div>
  )
}

export default Post

