import styles from "./selectCategory.module.css";
import { SlArrowDown } from "react-icons/sl";
//import { useRef, createRef } from "react";

type SelectCategoryProps = {
  categories: string[];
  categoryParams: string;
  onChange: (category: string) => void;
};

export function SelectCategory({ categories, categoryParams, onChange }: SelectCategoryProps) {
  //const selectRef = createRef();

  const handleClick = () => {
    console.log("click");
    //selectRef.current.open;
  };

  return (
    <div className="select-container">
      <p className="text-select">Catégories : </p>
      <select onChange={(e) => onChange(e.target.value)} className={styles.select}>
        <option key="all" value="" selected={categoryParams === null}>
          Toutes
        </option>
        {categories.map((category, index) => (
          <option selected={category === categoryParams} key={`${category}-${index}`} value={String(category)}>
            {String(category)}
          </option>
        ))}
      </select>
      <SlArrowDown onClick={() => handleClick()} className="select-arrow" />
    </div>
  );
}
