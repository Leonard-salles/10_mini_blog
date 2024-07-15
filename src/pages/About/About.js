import { Link } from "react-router-dom"

import styles from "./About.module.css"

const about = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini<span>Blog</span></h2>
      <p>Este projeto consite em um Blog feito com react no Front-end
         e firebase no Back-end
      </p>
      <Link to="/posts/create" className="btn">Criar Posts</Link>
    </div>
  )
}

export default about
