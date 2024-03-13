import { Formik, Form, Field } from 'formik';
import { Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import google from "../../assets/images/google.svg";
import section_two_image from "../../assets/images/section_two_image.jpg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { FcGoogle } from "react-icons/fc";
import { LoginBG, Logo } from "../../assets";
import { buttonClick } from "../../assets/animations";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { alert } from "../../components/Alert/Alert";
import { LoadingOverlay, MutatingDots } from "../../components";

import Register from "./Register";
import Login from "./Login";
import PopupSubmitOTP from "./PopupSubmitOTP";
import ResetPassword from "./ResetPassword";
import { auth } from "../../config/firebase.config";
import { activeAccount, createAccount, googleCallback, loginWithEmailPass, submitOTPResetPass } from "../../api";
import OtpModal from './OtpModal';
import { toast } from 'react-toastify';
import ForgotPasswordModal from './ForgotPasswordModal';
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)')
});
const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'),
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    repassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    phoneNumber: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("Phone number is requried")
});
const Login2 = () => {
    const user = useSelector((state) => state?.user?.user);
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalForgotPasswordVisible, setIsModalForgotPasswordVisible] = useState(false);

    const [email, setEmail] = useState("")
    const handleOtpSubmit = async (otp) => {
        console.log('Submitted OTP:', otp);
        const result = await activeAccount(email, otp);
        if (result.isSuccess) {
            toast.success("Verify successfully")
            setIsModalVisible(false);
            setIsSignUp(false)

        }
    };
    const handleForgotSubmit = async (data) => {
        console.log(data);
        const result = await submitOTPResetPass(data.email, data.recoveryCode, data.newPassword);
        if(result.isSuccess){
            toast.success("Reset password successfully")
        }else{
            for (var i = 0; i < result.messages.length; i++) {
                toast.error(result.messages[i]);
            }
        }
        setIsModalForgotPasswordVisible(false)

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleForgotCancel = () => {
        setIsModalForgotPasswordVisible(false);
    };
    const showOtpModal = () => {
        setIsModalVisible(true);
    };
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            const userCred = await signInWithPopup(auth, googleProvider);
            console.log("userCred: ", userCred);

            if (userCred) {
                const accessToken = userCred._tokenResponse.idToken;
                console.log("Google Access Token: ", accessToken);
                var result = await googleCallback(accessToken);
                if (result.isSuccess) {
                    console.log("callback: ", result);
                    localStorage.setItem("accessToken", result?.result?.data?.token);
                    localStorage.setItem(
                        "refreshToken",
                        result?.result?.data?.refreshToken
                    );
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `<h1>Welcome </h1>`,
                        html: `<h3>Log In Successfully</h3>`,
                        showConfirmButton: false,
                        timer: 1600,
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                }
            }


        } catch (error) {
            console.error("Error signing in with Google:", error);
            alert.alertFailedWithTime(
                "Failed To Log In",
                "This Email has not been registered",
                3300,
                "33",
                () => { }
            );
        }
        setIsLoading(false);

    };
    return (
        <>
            <LoadingOverlay loading={isLoading} ></LoadingOverlay>
            {isSignUp ? <div className="flex items-center justify-center min-h-screen bg-base2">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    <div className="flex flex-col justify-center px-8 md:p-14">
                        <span className="mb-3 text-4xl font-bold">Welcome back</span>
                        <span className="font-light text-gray-400 mb-2">
                            Welcome back! Please enter your details
                        </span>
                        <Formik
                            initialValues={{ email: '', password: '', firstName: '', lastName: '', repassword: '', phoneNumber: '' }}
                            validationSchema={SignUpSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    setIsLoading(true)
                                    try {
                                        const result = await createAccount(
                                            values.email,
                                            values.firstName,
                                            values.lastName,
                                            values.password,
                                            true,
                                            values.phoneNumber,
                                            "Customer"
                                        );
                                        console.log("Register result: ", result);
                                        if (result.isSuccess === true) {
                                            setEmail(values.email)
                                            setIsModalVisible(true)
                                            toast.success("Registration successful! Please verify email.");
                                        } else {
                                            console.error(
                                                "Registration failed:",
                                                result ? result.message : "Unknown error"
                                            );
                                            toast.error("Registration failed. Please try again.");
                                        }
                                        setIsLoading(false);
                                    } catch (error) {
                                        console.error("Error signing up:", error);
                                        toast.error("An error occurred. Please try again later.");
                                    }
                                } catch (err) {
                                    console.error(err);
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="py-2">
                                        <span className="mb-2 text-md">Email</span>
                                        <Field
                                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                            type="email"
                                            name="email"
                                            as={Input}
                                            prefix={<MailOutlined />}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                                    </div>

                                    <div className="py-2 flex justify-between">
                                        <div className='flex flex-col justify-between  mr-5'>
                                            <span className="mb-2 text-md mr-6">First Name</span>
                                            <Field
                                                className="w-full mr-2 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                name="firstName"
                                                as={Input}
                                                placeholder=" First name"
                                            />
                                            {errors.firstName && touched.firstName && <div className="text-red-500">{errors.firstName}</div>}
                                        </div>
                                        <div className='flex flex-col justify-between '>
                                            <span className="mb-2 text-md mr-6">Last Name</span>
                                            <Field
                                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                name="lastName"
                                                as={Input}
                                                placeholder="Last name"
                                            />
                                            {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <span className="mb-2 text-md">Phone Number</span>
                                        <Field
                                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                            name="phoneNumber"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phoneNumber && touched.phoneNumber && (
                                            <div className="text-red-500" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.phoneNumber}
                                            </div>
                                        )}
                                    </div>
                                    <div className="py-2">
                                        <span className="mb-2 text-md">Password</span>
                                        <Field
                                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                            type="password"
                                            name="password"
                                            as={Input.Password}
                                            prefix={<LockOutlined />}
                                            placeholder="Enter your password"
                                        />
                                        {errors.password && touched.password && (
                                            <div className="text-red-500" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="py-2">
                                        <span className="mb-2 text-md">Confirm Password</span>
                                        <Field
                                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                            type="password"
                                            name="repassword"
                                            as={Input.Password}
                                            prefix={<LockOutlined />}
                                            placeholder="Confirm password"
                                        />
                                        {errors.repassword && touched.repassword && (
                                            <div className="text-red-500" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                {errors.repassword}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        htmlType="submit"
                                        className="w-full mb-3 inline-block  px-4 py-2 text-xs text-center font-semibold leading-6 text-white bg-baseGreen hover:bg-base4 rounded-lg transition duration-200"
                                        disabled={isSubmitting}
                                        loading={isLoading}
                                    >
                                        Sign Up
                                    </button>
                                    <div className="text-center text-gray-400">
                                        I have an account? 
                                        <a style={{ cursor: 'pointer' }} onClick={() => setIsSignUp(false)} className="font-bold text-black hover:text-baseGreen"> Login</a>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                    <div className="relative">
                        <img
                            src={section_two_image}
                            alt="img"
                            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                        />
                        <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-20 backdrop-blur-sm rounded drop-shadow-lg md:block">
                            <span className="text-black italic text-xl">
                                We've been using Untitle to kick<br />start every new project
                                and can't <br />imagine working without it.
                            </span>
                        </div>
                    </div>

                </div>
            </div> :
                <div className="flex items-center justify-center min-h-screen bg-base2">
                    <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                        <div className="flex flex-col justify-center p-8 md:p-14">
                            <span className="mb-3 text-4xl font-bold">Welcome back</span>
                            <span className="font-light text-gray-400 mb-8">
                                Welcome back! Please enter your details
                            </span>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={LoginSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        setIsLoading(true)
                                        const data = await loginWithEmailPass(values.email, values.password);
                                        if (data.isSuccess) {
                                            localStorage.setItem("accessToken", data.result.data.token);
                                            localStorage.setItem("refreshToken", data.result.data.refreshToken);
                                            console.log(data.result.data);

                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: `<h1>Welcome </h1>`,
                                                html: `<h3>Log In Successfully</h3>`,
                                                showConfirmButton: false,
                                                timer: 1600,
                                            });
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        } else {
                                            for (var i = 0; i < data.messages.length; i++) {
                                                toast.error(data.messages[i]);
                                                if (data.messages[i] == "The account is not verified !") {
                                                    setEmail(values.email)
                                                    setIsModalVisible(true)
                                                }
                                            }
                                        }
                                    } catch (err) {
                                        console.error(err);
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <div className="py-4">
                                            <span className="mb-2 text-md">Email</span>
                                            <Field
                                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                type="email"
                                                name="email"
                                                as={Input}
                                                prefix={<MailOutlined />}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                                        </div>
                                        <div className="py-4">
                                            <span className="mb-2 text-md">Password</span>
                                            <Field
                                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                                type="password"
                                                name="password"
                                                as={Input.Password}
                                                prefix={<LockOutlined />}
                                                placeholder="Enter your password"
                                            />
                                            {errors.password && touched.password && (
                                                <div className="text-red-500" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between w-full py-4  mr-24">

                                            <span style={{cursor:'pointer'}} onClick={() => setIsModalForgotPasswordVisible(true)} className=" text-md w-full block text-baseGreen italic">Forgot password?</span>
                                        </div>
                                        <Button
                                            htmlType="submit"
                                            className="w-full mb-6 inline-block  px-4  text-xs text-center font-semibold leading-6 text-white bg-baseGreen hover:bg-green-600 rounded-lg transition duration-200"
                                            disabled={isSubmitting}
                                            loading={isLoading}
                                        >
                                            Login
                                        </Button>
                                        <Button className="w-full mb-6" onClick={handleGoogleSignIn}>
                                            <img src={google} alt="Google" className="w-6 h-6 inline mr-2"
                                            />
                                            Login with Google
                                        </Button>
                                        <div className="text-center text-gray-400">
                                            Don't have an account?
                                            <a style={{ cursor: 'pointer' }} className="font-bold text-black hover:text-baseGreen" onClick={() => setIsSignUp(true)}> Sign up for free</a>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                        <div className="relative">
                            <img
                                src={section_two_image}
                                alt="img"
                                className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                            />
                            <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-20 backdrop-blur-sm rounded drop-shadow-lg md:block">
                                <span className="text-black italic text-xl">
                                    We've been using Untitle to kick<br />start every new project
                                    and can't <br />imagine working without it.
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            }
            <OtpModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onOtpSubmit={handleOtpSubmit}
                email={email}
            />
            <ForgotPasswordModal
                visible={isModalForgotPasswordVisible}
                onCancel={handleForgotCancel}
                onSubmit={handleForgotSubmit} />
        </>
    );
};

export default Login2;
