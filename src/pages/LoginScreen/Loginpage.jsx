import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  
  // State for form inputs
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // State for handling errors and loading
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!userId || !password) {
      setError("Please enter both user ID and password");
      return; // Add this return statement to stop form submission
    }
    
    try {
      setIsLoading(true);
      setError("");
      
      // Make API request to your backend
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
          rememberMe
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store the token in localStorage or sessionStorage
      if (rememberMe) {
        localStorage.setItem('authToken', data.token);
      } else {
        sessionStorage.setItem('authToken', data.token);
      }
      
      // Store user info if needed
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to dashboard on success
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      {/* Title */}
      <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mb-20">
        JOSE RIZAL MEMORIAL STATE UNIVERSITY
        <br />
        GENERAL SERVICE OFFICE MANAGEMENT SYSTEM
      </h1>

      {/* Responsive Login Container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 
                    border border-gray-200 transition-all duration-300">
        
        {/* Responsive Form Title */}
        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-6">
          LOGIN ACCOUNT
        </h2>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form - Added onSubmit handler */}
        <form onSubmit={handleSubmit}>
          {/* Input Fields Container */}
          <div className="space-y-5 sm:space-y-6">
            {/* User ID Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <input
                type="text"
                placeholder="Enter User ID"
                className="w-full outline-none text-sm sm:text-base"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full outline-none text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              {/* Password Toggle Button */}
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="focus:outline-none text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? (
                  // Eye icon when password is visible
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  // Eye-slash icon when password is hidden (default)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Responsive Checkbox and Links */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <input 
                type="checkbox" 
                id="rememberMe" 
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm sm:text-base text-gray-600">Remember Me</label>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <a href="#" className="text-xs sm:text-sm text-red-500 hover:text-red-600">Reset Password</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-xs sm:text-sm text-red-500 hover:text-red-600">Retrieve ID</a>
            </div>
          </div>
          
          {/* Responsive Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 sm:mt-7 bg-green-500 hover:bg-green-600 text-white 
                    py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-300
                    disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "LOADING..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;