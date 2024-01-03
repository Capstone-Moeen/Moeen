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
import { UserSignUpIcon } from "../Assets/Icons/UserSignUpIcon";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { usePassword } from "../Context/PasswordContext";


function SignUpWindow({ isSignUpModel, openSignUpModel, openModal }) {

  const navigate = useNavigate();
  const { onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = React.useState(false);
  const { updatePassword } = usePassword();

  const [inputs, setInputs] = React.useState({
    name: { value: '', errorMessage: '' },
    email: { value: '', errorMessage: '' },
    password: { value: '', errorMessage: '' },
    re_password: { value: '', errorMessage: '' },
});

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

    if (inputs.name.value.trim().length < 2) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            name: {
                ...prevInputs.name,
                errorMessage: 'الرجاء إدخال اسم يحتوي على اكثر من حرفين',
            },
        }));
        isValid = false;
    }

    if (inputs.name.value.trim() === 'admin') {
      setInputs((prevInputs) => ({
          ...prevInputs,
          name: {
              ...prevInputs.name,
              errorMessage: 'اسم غير مصرح به، الرجاء ادخال اسمك الصحيح',
          },
      }));
      isValid = false;
  }

    if (!inputs.email.value || (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputs.email.value.trim()))) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            email: {
                ...prevInputs.email,
                errorMessage: 'الرجاء إدخال بريد إلكتروني صالح',
            },
        }));
        isValid = false;
    }
    

    if (
        !inputs.password.value || inputs.password.value.trim().length < 6 || !/[a-zA-Z]/.test(inputs.password.value.trim()) || !/\d/.test(inputs.password.value.trim())
    ) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            password: {
                ...prevInputs.password,
                errorMessage: ' كلمة المرور يجب ان تكون اطول من 6 و تحتوي على ارقام وحروف ',
            },
        }));
        isValid = false;
    }

    if (!inputs.re_password.value || inputs.re_password.value.trim() !== inputs.password.value.trim()) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            re_password: {
                ...prevInputs.re_password,
                errorMessage: ' كلمة المرور غير متطابقة ',
            },
        }));
        isValid = false;
    }

    return isValid;
};

const sign_up = () => {
    setLoading(true);

    if (validateInputs()) {
        createUserWithEmailAndPassword(auth, inputs.email.value, inputs.password.value)
        .then((res)=>{
            updateProfile(res.user,{
             displayName:inputs.name.value
            })
            .then((res)=>{
                navigate('/');
                updatePassword(inputs.password.value);
                localStorage.setItem('userEmail', inputs.email.value);
                localStorage.setItem('username', inputs.name.value);
                localStorage.setItem('isLogged', true);
                openSignUpModel(false);
            })
           }) 
        } else {
        setLoading(false);
    }
};

React.useEffect(() => {
    if (isSignUpModel) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isSignUpModel]);

  return (
    <>
      <Modal isOpen={isOpen} onOpen={onOpen} onClose={() => setIsOpen(false)} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 py-9">انشاء حساب</ModalHeader>

              <ModalBody>
              <Input
                  autoFocus
                  endContent={<UserSignUpIcon className={`
                  text-2xl text-default-400 pointer-events-none flex-shrink-0`} />}
                  label="اسم المستخدم"
                  placeholder=" ادخل اسم المستخدم  "
                  variant="bordered"
                  type="text"
                  onChange={addInputs}
                  value={inputs.name.value}
                  name="name"
                />
                {inputs.name.errorMessage && (
                    <div className="text-red-500 text-sm text-right">{inputs.name.errorMessage}</div>
                )}

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

                <Input
                  endContent={<LockIcon className={`
                  text-2xl text-default-400 pointer-events-none flex-shrink-0`} />}
                  label=" تأكيد كلمة المرور "
                  placeholder=" اعادة ادخال كلمة المرور "
                  type="password"
                  variant="bordered"
                  onChange={addInputs}
                  value={inputs.re_password.value}
                  name="re_password"
                />
                 {inputs.re_password.errorMessage && (
                      <div className="text-red-500 text-sm text-right">{inputs.re_password.errorMessage}</div>
                  )}

                <div className="flex py-2 px-1 justify-between">
              
                                <Checkbox color="default" required className="font-medium text-black"> 
                                    <span className='text-xs' >أوافق على </span>
                                <span className='text-[#005B41] text-xs'> الشروط والأحكام </span> 
                               <span className="text-xs"> وسياسة </span>
                                <span className='text-[#005B41] text-xs'> الخصوصية </span>
                                </Checkbox>

                  <div className="text-sm">
                    لديك حساب؟
                    <button onClick={() => { openSignUpModel(); openModal(); }}> 
                        تسجيل دخول
                    </button>
                    </div>

                </div>

              </ModalBody>

              <ModalFooter className="self-center">
                
                <Button color="primary" onClick={sign_up}>
                  تسجيل جديد
                </Button>
                <Button color="danger" variant="flat" onClick={openSignUpModel}>
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

export default SignUpWindow;