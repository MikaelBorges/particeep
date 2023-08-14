import styles from "./jauge.module.css";

type JaugeProps = {
  likes: number;
  dislikes: number;
};

export function Jauge({ likes, dislikes }: JaugeProps) {
  const getPercentage = (value: number, total: number) => {
    if (total) {
      const percentage = (value / total) * 100;
      return `${percentage}%`;
    } else return "0%";
  };

  return (
    <div className={styles.jauge}>
      <div
        className={styles.likes}
        style={{
          width: getPercentage(likes, likes + dislikes),
        }}
      />
      <div
        className={styles.dislikes}
        style={{
          width: getPercentage(dislikes, likes + dislikes),
        }}
      />
    </div>
  );
}
