import React from "react";
import styles from "../styles/Form.module.css";

export default function InputError({ error }) {
  return error ? <span className={styles.error}>{error.message}</span> : null;
}
