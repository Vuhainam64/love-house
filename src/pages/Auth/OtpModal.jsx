import React, { useState, useRef } from 'react';
import { Modal, Input, Button } from 'antd';
import { sendOTP } from '../../api';
import { toast } from 'react-toastify';

const OtpModal = ({ visible, onCancel, onOtpSubmit, email }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([]);

    const handleOtpChange = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        if (index < 5 && e.target.value !== '') {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Prevent backspace key from deleting input value
        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
            e.preventDefault();
            otpInputs.current[index - 1].focus();
        }
    };

    const handleOtpSubmit = () => {
        onOtpSubmit(otp.join(''));
        setOtp(['', '', '', '', '', '']);
    };
    const handleResendOtp = async () => {
        const result = await sendOTP(email);
        if (result.isSuccess) {
            toast.success("Resend OTP successfully")
        }
    }

    return (
        <Modal
            title="Enter OTP"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    className="inline-block px-4 text-xs text-center font-semibold leading-6 text-white bg-baseGreen hover:bg-green-600 rounded-lg transition duration-200"
                    onClick={handleOtpSubmit}
                >
                    Submit
                </Button>,
            ]}
            centered // To center the modal on the screen
        >
            <div className="flex justify-center">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        className="w-12 h-12 mx-2 text-center rounded-full border border-gray-300"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                        ref={(input) => (otpInputs.current[index] = input)}
                    />
                ))}
            </div>
            <div className="mt-4 text-end">
                <a className="text-blue-500 underline cursor-pointer" onClick={handleResendOtp}>
                    Resend OTP
                </a>
            </div>
        </Modal>
    );
};

export default OtpModal;
