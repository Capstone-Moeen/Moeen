import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({
        email: { value: '', errorMessage: '' },
        password: { value: '', errorMessage: '' },
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
            navigate('/');
            localStorage.setItem('user', JSON.stringify(inputs));
            localStorage.setItem('isLogged', true);
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center">
                <div className="lg:max-w-[1000%] m-0 sm:m-10 flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <img src="" className="w-mx-auto" alt="Logo" />
                        </div>

                        <div className="mt-5 text-center text-2xl font-bold">تسجيل الدخول</div>

                        <div className="mt-8 flex flex-col items-center">
                            <div className="w-full flex-1 mt-8">
                                <input
                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                        inputs.email.errorMessage ? 'border-red-500' : 'border-gray-200'
                                    } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 text-right`}
                                    type="email"
                                    placeholder=" ادخل البريد الإلكتروني  "
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

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-[#005B41] text-white w-full py-4 rounded-lg hover:bg-[#E4EFE7] hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={sign_in}
                                >
                                    <span className="ml-">{loading ? 'الرجاء الانتظار' : ' تسجيل الدخول '}</span>
                                </button>

                                <div className="text-right mt-5">
                                    ليس لديك حساب؟{' '}
                                    <Link to="/SignUp">
                                        <span className="text-[#005B41]">تسجيل جديد </span>
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

export default SignIn;
