import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import { Jauge } from "../jauge/jauge";
import styles from "./movieCard.module.css";
import { motion } from "framer-motion";

const animation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export function MovieCard({
  movie,
  onRemoveMovie,
  onClickLike,
  onClickDislike,
  backgroundImagesOnCards,
  titlesInsideCards,
}) {
  const { id, title, likes, dislikes, image, category, alreadyLiked, alreadyDisliked } = movie;

  return (
    <motion.li className={styles.cardContainer} variants={animation}>
      <div className={styles.card}>
        <div className={styles.headerCard}>
          <div className={styles.headerCardButtons}>
            <h3 className={styles.category}>{category}</h3>
            <button className={styles.removeButton} onClick={() => onRemoveMovie(id, category)}>
              <TfiClose />
            </button>
          </div>
          {titlesInsideCards && <h2 className={styles.titleCard}>{title}</h2>}
        </div>

        {image && (
          <div className={styles.imageContainer}>
            <img
              style={{
                position: backgroundImagesOnCards ? "absolute" : "initial",
              }}
              className={styles.image}
              src={image}
              alt="movie"
            />
          </div>
        )}

        <div className={styles.footerCard}>
          <div className={styles.buttons}>
            <button title="Liker le film" className={alreadyLiked ? styles.liked : ""} onClick={() => onClickLike(id)}>
              <BiSolidLike /> <span className={styles.numberLikeDislike}>{likes}</span>
            </button>
            <button
              title="Disliker le film"
              className={alreadyDisliked ? styles.disliked : ""}
              onClick={() => onClickDislike(id)}
            >
              <BiSolidDislike /> <span className={styles.numberLikeDislike}>{dislikes}</span>
            </button>
          </div>
          <Jauge likes={likes} dislikes={dislikes} />
        </div>
      </div>
      {!titlesInsideCards && <h3 className={styles.titleUnderMovie}>{title}</h3>}
    </motion.li>
  );
}
