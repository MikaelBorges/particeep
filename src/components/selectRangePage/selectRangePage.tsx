import styles from "./selectRangePage.module.css";
import { SlArrowDown } from "react-icons/sl";

type SelectRangePageProps = {
  rangeParams: number;
  onChange: (range: number) => void;
};

export function SelectRangePage({ rangeParams, onChange }: SelectRangePageProps) {
  return (
    <div className="select-container">
      <p className="text-select">Nombre de films par page : </p>
      <select onChange={(e) => onChange(Number(e.target.value))} className={styles.select}>
        <option value="4" selected={rangeParams === 4}>
          4
        </option>
        <option value="8" selected={rangeParams === 8}>
          8
        </option>
        <option value="12" selected={rangeParams === 12}>
          12
        </option>
      </select>
      <SlArrowDown className="select-arrow" />
    </div>
  );
}
