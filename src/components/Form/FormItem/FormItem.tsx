import styles from "./FormItem.module.scss";
import FormDropDown from "components/Form/FormDropDown";
import FileUpload from "components/Form/FileUpload";
import { useEffect, useRef, useState } from "react";
import { create } from "lodash";

const errorMessageLabels = {
  missingCategory: "Please Select category regarding your issue.",
  missingName: "Please enter your Name",
  missingEmail: "Please enter your email address",
  missingQuestion: "Please enter your inquiry.",
  defaultError: "Please fill in the field.",
};

export default function FormItem({ input, title, onUpdate, showErrors }) {
  debugger;
  const errorEl = useRef(null);
  const [status, setStatus] = useState("");

  function selfValidate(value) {
    if (value.length === 0) {
      console.log("createErrors");
      createErrors();
    } else {
      setStatus("");
    }

    // if isn't valid, don't send to parent component
    onUpdate(value);
  }

  function createErrors() {
    switch (input.type) {
      case "select": {
        setStatus(errorMessageLabels.missingCategory);
        break;
      }
      case "name": {
        setStatus(errorMessageLabels.missingName);
        break;
      }
      case "email": {
        setStatus(errorMessageLabels.missingEmail);
        break;
      }
      case "textarea": {
        setStatus(errorMessageLabels.missingQuestion);
        break;
      }
      case "file": {
        break;
      }
    }
  }

  useEffect(() => {
    createErrors();
  }, []);

  return (
    <div className={styles.FormItem}>
      {showErrors ? (
        <span className={styles.FormItemError} ref={errorEl}>
          {status ? `${status}` : ""}
        </span>
      ) : (
        <></>
      )}
      {title == "upload files" ? <></> : <h4>{title}</h4>}

      {(() => {
        switch (input.type) {
          case "select": {
            return (
              <FormDropDown
                onSelection={(value) => selfValidate(value)}
                input={input}
              />
            );
          }
          // case 'file': {
          // 	return <FileUpload onFileUploaded={(fileName) => selfValidate(fileName)} input={input} />;
          // }
          case "name": {
            return (
              <input
                type="text"
                placeholder={input.placeHolder}
                onChange={(e) => selfValidate(e.target.value)}
              />
            );
          }
          case "email": {
            return (
              <input
                type="email"
                placeholder={input.placeHolder}
                onChange={(e) => selfValidate(e.target.value)}
              />
            );
          }
          case "textarea": {
            return (
              <textarea
                placeholder={input.placeHolder}
                onChange={(e) => selfValidate(e.target.value)}
              ></textarea>
            );
          }
          default: {
            return <></>;
          }
        }
      })()}
    </div>
  );
}
