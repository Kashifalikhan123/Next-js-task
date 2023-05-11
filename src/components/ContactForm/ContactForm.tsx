import styles from "./ContactForm.module.scss";
import Button from "components/Button";
import {
  useRef,
  useState,
  forwardRef,
  MutableRefObject,
  useEffect,
} from "react";
import defaults from "constants/account_defaults";
import Link from "next/link";
import { gsap } from "gsap";
import { NotificationType } from "components/NotifBar/NotifBar";
import SendContactMail from "utils/api/SendContactMail";
import { NotificationManager} from 'react-notifications';
export const ContactForm = 
  (
    props
  ) => {
    const emailRef = useRef();
    const nameRef = useRef();
    const addressRef = useRef();
    const contactRef = useRef();
    const messageRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nameError, setNameError] = useState(``);
    const [messageError, setMessageError] = useState(``);
    const [emailError, setEmailError] = useState(``);
    const [contactError, setContactError] = useState(``);
    const [addressError, setAddressError] = useState(``);
    const [isValidName, setIisValidName] = useState(false);
    const [isValidMessage, setIisValidMessage] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidAddress, setIsValidAdress] = useState(false);
    const [isValidContact, setIsValidContact] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
   setShowModal(true)
    }, []);
    const handleClose = () => {
      setShowModal(false);

    };
    const validateUserID = async (event) => {
      const NameRegex = /^([\w-\.]+)@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const NameRegex1 = /^[a-zA-Z0-9._\-]*$/;
      const NameRegex2 = /\S+@\S+\.\S+/;
      const Name = (nameRef.current as HTMLInputElement).value.replace(
        /\s/g,
        ""
      );
      if (Name.length > 1) {
        if (NameRegex.test(Name)) {
          setIisValidName(true);
          setNameError(``);
        }
        if (NameRegex1.test(Name)) {
          setIisValidName(true);
          setNameError(``);

          debugger;
        }
        if (NameRegex2.test(Name)) {
          setIisValidName(false);
          setNameError(`Email Not Allow as Name`);
        }
      } else {
        setIisValidName(false);
        setNameError(`min 2 char , only a-z, A-Z, 0-9 & EU especial char`);
      }
    };
    const validateEmail = async (event) => {
      var emailRegex = /\S+@\S+\.\S+/;
      //const email = event.target.value;
      const email = (emailRef.current as HTMLInputElement).value.replace(
        /\s/g,
        ""
      );
      debugger;
      if (emailRegex.test(email)) {
        setIsValidEmail(true);
        setEmailError(``);
      } else {
        setIsValidEmail(false);
        setEmailError(`Invalid Email`);
      }
    };
    const validateMessage = async (event) => {
      const Message = (messageRef.current as HTMLInputElement).value.replace();
      debugger;
      if (Message.length > 0) {
        setIisValidMessage(true);
        setMessageError(``);
      } else {
        setIisValidMessage(false);
        setMessageError(`Please Enter Your Message`);
      }
    };
    const validateAddress = async (event) => {
      const address = (addressRef.current as HTMLInputElement).value.replace();
      debugger;
      if (address.length > 0) {
        setIsValidAdress(true);
        setAddressError(``);
      } else {
        setIsValidAdress(false);
        setAddressError(`Please Enter Your Address`);
      }
    };
    const validateContact = async (event) => {
      const contact = (contactRef.current as HTMLInputElement).value.replace();
      debugger;
      if (contact.length > 0) {
        setIsValidContact(true);
        setContactError(``);
      } else {
        setIsValidContact(false);
        setContactError(`Please Enter Your Phone No`);
      }
    };


    const enter = async () => {
      debugger;
      const email = (emailRef.current as HTMLInputElement).value.replace(
        /\s/g,
        ""
      );
      const name = (nameRef.current as HTMLInputElement).value.replace();
      const message = (messageRef.current as HTMLInputElement).value.replace();
      const address = (addressRef.current as HTMLInputElement).value.replace();
      const contact = (contactRef.current as HTMLInputElement).value.replace(/\s/g,
      "");
      if (email === "" || name === "" || message===""||address===""||contact==="") {
        if (email === "") {
          setIsValidEmail(false);
          setEmailError(`Email Required`);
        }
        if (name === "") {
          setIisValidName(false);
          setNameError(`Name Required`);
        }
        if (message === "") {
          setIisValidMessage(false);
          setMessageError(`Message Required`);
        }
        if (contact === "") {
          setIsValidContact(false);
          setContactError(`Phone No Required`);
        }
        if (address === "") {
          setIsValidAdress(false);
          setAddressError(`Address Required`);
        }
      }

      if (
        isValidName == true &&
        isValidEmail == true &&
        isValidMessage == true&&
        isValidAddress == true&&
        isValidContact == true
      ) {
        setLoading(true);

        try {
        //here you called post api for communicate the server
        } catch (err) {
          NotificationManager.error("Send Contact Mail Failed...", 'Error' ,3000);
        }finally{
          setLoading(false);

        }
      }
    };

    return (
      <div className={styles.contactForm}>
        <div>
          <h6
            style={{
              fontSize: "2.25em",
              fontWeight: "700",
              textAlign: "center",
              paddingTop: "5%",
            }}
          >
            CONTACT SUPPORT
          </h6>
        </div>
        <hr style={{ marginTop: "4%", width: "85%", marginBottom: "4%" }} />
        <div style={{ width: "85%", marginLeft: "10%" }}>
          <span
            style={{
              fontSize: "1.0em",
              fontWeight: "400",
              textAlign: "center",
              paddingTop: "5%",
            }}
          >
            By selecting a category below, we can help you finding the answer as
            quickly as possible.
          </span>
        </div>
        <div className={styles.EnterEmail}  style={{ opacity: 1 }}>
       
          <span className={styles.item}>
            <label htmlFor="name1">Your Name</label>
            <input
              type="text"
              id="name1"
              required={true}
              placeholder="Enter your Name"
              ref={nameRef}
              disabled={isLoading}
              onChange={validateUserID}
            />
            <span style={{ color: "red" }}>{nameError}</span>
          </span>
          <span className={styles.item}>
            <label htmlFor="email1">Your Email </label>
            <input
              type="email"
              id="email1"
              required={true}
              placeholder="Enter your email"
              ref={emailRef}
              disabled={isLoading}
              onChange={validateEmail}
            />
            <span style={{ color: "red" }}>{emailError}</span>
          </span>
          <span className={styles.item}>
            <label htmlFor="contact">Your Phone No </label>
            <input
              type="text"
              id="contact"
              required={true}
              placeholder="Your Phone No"
              ref={contactRef}
              disabled={isLoading}
              onChange={validateContact}
            />
            <span style={{ color: "red" }}>{contactError}</span>
          </span>
          <span className={styles.item}>
            <label htmlFor="Address">Your Address </label>

            <input
              type="Address"
              id="Address"
              required={true}
              placeholder="Your Address"
              ref={addressRef}
              disabled={isLoading}
              onChange={validateAddress}
            />
            <span style={{ color: "red" }}>{addressError}</span>
          </span>
          
       
          <span className={styles.item}>
            <label htmlFor="message1">Your Message </label>

            <textarea
              style={{ height: "150px" }}
              type="textarea"
              id="message1"
              required={true}
              placeholder="Enter your Message"
              ref={messageRef}
              disabled={isLoading}
              onChange={validateMessage}
            />
            <span style={{ color: "red" }}>{messageError}</span>
          </span>
          <Button
            style={{ width: "30%" }}
            label="Submit"
            appearance="primary"
            onClick={enter}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      
  
      </div>
    );
  }

export default ContactForm;
