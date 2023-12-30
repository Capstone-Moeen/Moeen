import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,} from "@nextui-org/react";
import { MailIcon } from "../Assets/Icons/MailIcon";
import { LockIcon } from "../Assets/Icons/LockIcon";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignInWindow({ isOpen: Open, openModal, openSignUpModel }) {

  const { onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
      email: { value: '', errorMessage: '' },
      password: { value: '', errorMessage: '' },
  })

  const [loading, setLoading] = React.useState(false);

  const addInputs = (event) => {
      const { name, value } = event.target;
  
      setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: { value, errorMessage: '' },
      }));
  };
  

  const validateInputs = () => {
      let isValid = true;
  
      if (!inputs.email.value.trim()) {
          setInputs((prevInputs) => ({
              ...prevInputs,
              email: {
                  ...prevInputs.email,
                  errorMessage: 'الرجاء إدخال البريد الإلكتروني',
              },
          }));
          isValid = false;
      }
  
      if (!inputs.password.value.trim()) {
          setInputs((prevInputs) => ({
              ...prevInputs,
              password: {
                  ...prevInputs.password,
                  errorMessage: 'الرجاء إدخال كلمة المرور',
              },
          }));
          isValid = false;
      }
  
      return isValid;
  }
  

  const sign_in = () => {
      setLoading(true);

      if (validateInputs()) {
        signInWithEmailAndPassword(auth, inputs.email.value, inputs.password.value)
        .then(res=>{
          console.log(res.user);
          navigate('/');
          localStorage.setItem('user', JSON.stringify(inputs));
          localStorage.setItem('isLogged', true);
          openModal()
        })
      } else {
          setLoading(false);
      }
  };

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (Open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [Open]);


  return (
    <>
      <Modal isOpen={Open} onOpenChange={onOpenChange} onClose={() => setIsOpen(false)} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-9">تسجيل دخول</ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  endContent={<MailIcon className={`
                  text-2xl text-default-400 pointer-events-none flex-shrink-0`} />}
                  label="البريد الالكتروني"
                  placeholder=" ادخل البريد الإلكتروني  "
                  variant="bordered"
                  type="email"
                  onChange={addInputs}
                  value={inputs.email.value}
                  name="email"
                />
                {inputs.email.errorMessage && (
                    <div className="text-red-500 text-sm text-right">{inputs.email.errorMessage}</div>
                )}

                <Input
                  endContent={<LockIcon className={`
                  text-2xl text-default-400 pointer-events-none flex-shrink-0`} />}
                  label=" كلمة المرور "
                  placeholder=" ادخل كلمة المرور "
                  type="password"
                  variant="bordered"
                  onChange={addInputs}
                  value={inputs.password.value}
                  name="password"
                />
                 {inputs.password.errorMessage && (
                      <div className="text-red-500 text-sm text-right">{inputs.password.errorMessage}</div>
                  )}

                <div className="flex py-2 px-1 justify-between">
              
                  <Link color="primary" to="#" size="sm">
                    نسيت كلمة المرور؟
                  </Link>

                  <div className="text-sm">
                    ليس لديك حساب؟
                    <button onClick={() => { openSignUpModel(); openModal(); }}>
                      تسجيل جديد
                    </button>
                  </div>
                </div>

              </ModalBody>

              <ModalFooter className="self-start">
                
                <Button color="primary" onClick={sign_in}>
                  تسجيل دخول
                </Button>
                <Button color="danger" variant="flat" onClick={openModal}>
                  تراجع
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      
    </>
  );
}

export default SignInWindow;
