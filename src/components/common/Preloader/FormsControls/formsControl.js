import styles from "./formsControl.module.css";

export const Textarea = (props) => {
   return (
      <div className={styles.formControl + " " + styles.error}>
         <div>
            <textarea {...props} />
         </div>
         <span>"Error"</span>
      </div>
   );
};
