import { useState } from 'react';
import { auth } from '../../utils/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const LoginSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmResult, setConfirmResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Recaptcha setup
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            handleSendOtp();
          },
          'expired-callback': () => {
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ReCAPTCHA expired. Please try again.',
            });
          },
        },
        auth
      );
    }
  };

  // Sending OTP
  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      MySwal.fire({
        icon: 'error',
        title: 'Invalid Number',
        text: 'Please enter a valid 10-digit phone number.',
      });
      return;
    }

    setIsLoading(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const formattedPhoneNumber = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
      setConfirmResult(result);
      setOtpSent(true);
      MySwal.fire({
        icon: 'success',
        title: 'OTP Sent!',
        text: `OTP sent successfully to ${formattedPhoneNumber}`,
      });
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to send OTP. Please try again. Error: ${error.message}`,
      });
      console.error('Error sending OTP:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Verifying OTP
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      await confirmResult.confirm(otp);
      MySwal.fire({
        icon: 'success',
        title: 'Verified!',
        text: 'Phone number verified successfully!',
      });
      navigate('/home');
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to verify OTP. Please check the OTP and try again. Error: ${error.message}`,
      });
      console.error('Error verifying OTP:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handling phone number input
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center">Sign In / Sign Up</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 rounded p-2 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-2" viewBox="0 0 640 480">
              <g fillRule="evenodd" strokeWidth="1pt">
                <path fill="#ff9933" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="70" fill="#000088"/>
                <g fill="#fff">
                  {/* Inner symbols */}
                  <circle cx="320" cy="240" r="10" />
                  {/* Use proper paths */}
                </g>
              </g>
            </svg>
            <span className="text-xl">+91</span>
          </div>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="border border-gray-300 rounded p-2 w-full"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            maxLength="10"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white rounded p-2 shadow-lg disabled:bg-gray-300"
            disabled={isLoading || otpSent}
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
        {otpSent && (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-gray-300 rounded p-2 w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-600 text-white rounded p-2 shadow-lg disabled:bg-gray-300"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default LoginSignup;
