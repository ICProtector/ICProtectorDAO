import React, { useState } from 'react';
import loginImg from '../assets/login.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
      navigate('/admin');  // Redirect to the admin route if credentials match
    } else {
      setAlertInfo({
        show: true,
        type: "error",
        message: "Invalid Username OR Password.",
    });
    setTimeout(() => setAlertInfo(false), 5000);  // Log error in the console if credentials do not match
    }
  };
  const alertStyles = {
    success: {
        backgroundColor: darkMode ? "#b9fbc0" : "#d4edda", // Green background
        color: darkMode ? "#1f7a1f" : "#155724", // Green text
    },
    error: {
        backgroundColor: darkMode ? "#fdb5b5" : "#f8d7da", // Red background
        color: darkMode ? "#971212" : "#721c24", // Red text
    },
};

  return (
    <div className="min-h-screen bg-white flex">
      {/* Background image section */}
      <div className="hidden lg:block relative w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={loginImg}
          alt="login img"
        />
      </div>

      {/* Form section */}
      <div className="flex md:w-1/2 sm:flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 dark:bg-gray-950">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {alertInfo.show && (
                            <div
                                style={{
                                    padding: "1rem",
                                    marginBottom: "1rem",
                                    borderRadius: "0.25rem",
                                    backgroundColor: alertStyles[alertInfo.type].backgroundColor,
                                    color: alertStyles[alertInfo.type].color,
                                }}
                                role="alert"
                            >
                                {alertInfo.message}
                            </div>
                        )}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
