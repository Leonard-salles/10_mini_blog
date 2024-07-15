import styles from "./PostsDetails.module.css"

import { Link } from "react-router-dom"

const PostsDetails = ({posts}) => {
  return (
    <div className={styles.post_details}>
        <img src={posts.image} alt={posts.title} />
        <h2>{posts.title}</h2>
        <p className={styles.createdBy}>{posts.createdBy}</p>
        <div className={styles.tags}>
            {posts.tagsArray.map((tag, index) =>(
                <p key={index}>
                    <span>#</span>{tag}
                </p>
            ))}
        </div>
        <Link to={`/posts/${posts.id}`} className="btn btn-outline">Ler</Link>
    </div>
  )
}

export default PostsDetails
