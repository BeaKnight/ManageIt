import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  // State for form inputs
  const [full_name, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [office, setOffice] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  // State for handling errors and loading
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!full_name || !position || !office || !contact_number || !password || !password_confirmation || !role) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Make API request to backend
      const response = await fetch('http://192.168.127.187:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          
        },
        body: JSON.stringify({
          full_name,
          position,
          office,
          contact_number,
          password,
          password_confirmation,
          role
        }),
        mode: 'cors'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Redirect to login page on success
      navigate('/loginpage');

    } catch (err) {
      setError(err.message || "An error occurred during signup");
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

      {/* Responsive Signup Container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 
                    border border-gray-200 transition-all duration-300">
        
        {/* Responsive Form Title */}
        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-6">
          SIGNUP ACCOUNT
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
            {/* Full Name Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none text-sm sm:text-base"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Position Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type="text"
                placeholder="Position"
                className="w-full outline-none text-sm sm:text-base"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            {/* Office Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type="text"
                placeholder="Office"
                className="w-full outline-none text-sm sm:text-base"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              />
            </div>

            {/* Contact Number Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full outline-none text-sm sm:text-base"
                value={contact_number}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="focus:outline-none text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full outline-none text-sm sm:text-base"
                value={password_confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Role Input */}
            <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 sm:p-3.5 hover:border-blue-300 
                          transition-colors duration-200">
              <input
                type="text"
                placeholder="Role"
                className="w-full outline-none text-sm sm:text-base"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          {/*  Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 sm:mt-7 bg-green-500 hover:bg-green-600 text-white 
                    py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-300
                    disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "LOADING..." : "SIGNUP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;