import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox } from "@nextui-org/react";


function SignUp() {
    const navigate = useNavigate();
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

            navigate('/');
            localStorage.setItem('user', JSON.stringify(inputs));
            localStorage.setItem('isLogged', true);
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center bg-[#FAFAFB]">
                <div className="lg:max-w-[70%] m-0 sm:m-10  flex justify-center flex-1 bg-white shadow sm:rounded-lg">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Link to='/'><img src="" className="w-mx-auto" alt="Logo" /></Link>
                        </div>

                        <div className="mt-5 font-bold text-center text-2xl"> انشاء حساب جديد </div>

                        <div className="mt-8 flex flex-col items-center">
                            <div className="w-full flex-1 mt-8">
                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                        inputs.name.errorMessage ? 'border-red-500' : 'border-gray-200'
                                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white text-right`}
                                    type="text"
                                    placeholder=" ادخل الاسم الاول والاخير "
                                    onChange={addInputs}
                                    value={inputs.name.value}
                                    name="name"
                                />
                                {inputs.name.errorMessage && (
                                    <div className="text-red-500 text-sm text-right">{inputs.name.errorMessage}</div>
                                )}

                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                        inputs.email.errorMessage ? 'border-red-500' : 'border-gray-200'
                                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-right`}
                                    type="email"
                                    placeholder="ادخل البريد الإلكتروني  "
                                    onChange={addInputs}
                                    value={inputs.email.value}
                                    name="email"
                                />
                                {inputs.email.errorMessage && (
                                    <div className="text-red-500 text-sm text-right">{inputs.email.errorMessage}</div>
                                )}

                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                        inputs.password.errorMessage ? 'border-red-500' : 'border-gray-200'
                                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-right`}
                                    type="password"
                                    placeholder=" ادخل كلمة المرور "
                                    onChange={addInputs}
                                    value={inputs.password.value}
                                    name="password"
                                />
                                {inputs.password.errorMessage && (
                                    <div className="text-red-500 text-sm text-right">{inputs.password.errorMessage}</div>
                                )}

                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                        inputs.re_password.errorMessage ? 'border-red-500' : 'border-gray-200'
                                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-right`}
                                    type="password"
                                    placeholder=" إعادة ادخال كلمة المرور "
                                    onChange={addInputs}
                                    value={inputs.re_password.value}
                                    name="re_password"
                                />
                                {inputs.re_password.errorMessage && (
                                    <div className="text-red-500 text-sm text-right">
                                        {inputs.re_password.errorMessage}
                                    </div>
                                )}

                                <div className='flex flex-col w-full text-start pt-3 px-2'>
                                <Checkbox defaultSelected color="default" className="font-medium text-black"> 
                                    <span className='text-sm' >أوافق على </span>
                                <span className='text-[#005B41] text-sm'> الشروط والأحكام </span> 
                                وسياسة 
                                <span className='text-[#005B41] text-sm'> الخصوصية </span>
                                </Checkbox>
                                </div>

                                <Button
                                    className="mt-5 tracking-wide font-semibold bg-[#005B41] text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    size='lg'
                                    onClick={sign_up}
                                >
                                    <span className="ml-">
                                        {loading ? 'الرجاء الانتظار' : 'انشاء حساب'}
                                    </span>
                                </Button>

                                <div className="mt-5 text-right">
                                     هل لديك حساب؟{' '}
                                    <Link to="/SignIn">
                                        <span className="text-[#005B41]">تسجيل دخول </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
