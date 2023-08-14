import styles from "./pagination.module.css";

type PaginationProps = {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
};

export function Pagination({
  page,
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button disabled={disabledPrev} onClick={onPrev}>
        page précédente
      </button>
      <p className={styles.number}>page {page}</p>
      <button disabled={disabledNext} onClick={onNext}>
        page suivante
      </button>
    </div>
  );
}
