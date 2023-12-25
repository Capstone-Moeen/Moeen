import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
            <div className="min-h-screen bg-[#FAFAFB] text-gray-900 flex justify-center">
                <div className="lg:max-w-[60%] m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <img src="" className="w-mx-auto" alt="Logo" />
                        </div>

                        <div className="mt-5 text-center text-2xl">تسجيل جديد</div>

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

                                <p className="mt-6 text-xs font-bold text-center">
                                    أوافق على
                                    <a href="#" className="text-[#005B41]">
                                        {' '}
                                        الشروط والأحكام
                                    </a>{' '}
                                    و{' '}
                                    <a href="#" className="text-[#005B41]">
                                        سياسة الخصوصية
                                    </a>
                                </p>

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-[#005B41] text-white w-full py-4 rounded-lg hover:bg-[#E4EFE7] hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={sign_up}
                                >
                                    <span className="ml-">
                                        {loading ? 'الرجاء الانتظار' : 'انشاء حساب'}
                                    </span>
                                </button>

                                <div className="text-center mt-5">
                                    لديك حساب؟{' '}
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
