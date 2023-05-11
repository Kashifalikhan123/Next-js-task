import styles from "./Form.module.scss";
import Button from "components/Button";
import FormItem from "components/Form/FormItem";
import { useEffect, useState } from "react";
import SendContactMail from "utils/api/SendContactMail";
const Captcha = require("react-captcha");
export default function Form({ submit, content }) {
  const [fields, setFields] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const recipientMail = "raimonds@setsnail.com";

  // Create Hook
  useEffect(() => {
    // pre-setting the fields val, so I can safely pass state object
    let fieldsObj = Object.assign({}, fields);
    for (const i in content) {
      let item = content[i];
      fieldsObj[item.input.name] = "";
    }

    setFields(fieldsObj);
  }, []);

  function updateFields(key, value) {
    // setShowErrors(false);
    let newProps = Object.assign({}, fields);
    newProps[key] = value;
    setFields(newProps);
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateItems();
  }

  async function sendToApi() {
    // Insert Form Sending Code Here
    console.log(fields);
    const { name, category, email, question } = fields;
    debugger;
    // const res = await SendContactMail(name, category, email, question);
    debugger;
    if (res.status < 300) {
      console.log("form sent, thanks for your message");
      // hide button
      // say thanks for the message
    }
  }

  function sendForm() {
    console.log("submitting");
    sendToApi();
    clearData();
    setSubmitted(true);
  }

  function clearData() {
    // Form Sending Code
    let newProps = Object.assign({}, fields);
    for (const index in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, index)) {
        newProps[index] = null;
      }
    }
    setFields(newProps);
  }

  function validateItems() {
    let invalidatedFields = 0;
    // remove old errors
    for (const index in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, index)) {
        const formItem = fields[index];
        invalidatedFields++;
        if (index == "file" || formItem.length !== 0) {
          invalidatedFields--;
        }
      }
    }

    // If form is valid
    if (invalidatedFields === 0) {
      sendForm();
      return;
    }
    setShowErrors(true);
  }

  return (
    <form className={styles.Form} onSubmit={(e) => handleSubmit(e)}>
      {content.map((item, i) => (
        <FormItem
          key={i}
          input={item.input}
          title={item.title}
          showErrors={showErrors}
          onUpdate={(value) => updateFields(item.input.name, value)}
        />
      ))}
      {/* <Captcha
        sitekey="your_sitekey"
        lang="en"
        theme="light"
        type="image"
        callback={(value) => console.log(value)}
      /> */}
      <Button type="submit" label={submit.title} />
    </form>
  );
}
