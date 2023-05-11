import styles from "./FormSelect.module.scss";
import FormDropDown from "components/Form/FormDropDown";

export default function FormSelect({ content, defaultValue, onChange }) {
  debugger;
  return (
    <select
      className={styles.FormSelect}
      name="country"
      id="country"
      onChange={onChange}
      required={true}
    >
      <option value={""} label={defaultValue} disabled={true} selected={true}>
        {defaultValue}
      </option>
      {content.map((item, key) => (
        <option key={key} value={item.value} label={item.label}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
