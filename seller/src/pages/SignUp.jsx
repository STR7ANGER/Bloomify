import React, { useState } from "react";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    companyEmail: "",
    companyNumber: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    upi: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Sign up data:", formData);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render different form steps based on currentStep
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {/* Personal and Company Information */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Email
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Number
                  </label>
                  <input
                    id="companyNumber"
                    name="companyNumber"
                    type="number"
                    value={formData.companyNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="upi" className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    id="upi"
                    name="upi"
                    type="text"
                    value={formData.upi}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-md transition-all flex items-center"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Company Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    id="street"
                    name="companyAddress.street"
                    type="text"
                    value={formData.companyAddress.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    name="companyAddress.city"
                    type="text"
                    value={formData.companyAddress.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    id="state"
                    name="companyAddress.state"
                    type="text"
                    value={formData.companyAddress.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code
                  </label>
                  <input
                    id="zipCode"
                    name="companyAddress.zipCode"
                    type="text"
                    value={formData.companyAddress.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    id="country"
                    name="companyAddress.country"
                    type="text"
                    value={formData.companyAddress.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-800 hover:underline">Terms and Conditions</a> and <a href="#" className="text-emerald-600 hover:text-emerald-800 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 shadow-md transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-md transition-all"
              >
                Sign Up
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Progress indicator
  const renderProgress = () => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <span className="text-xs mt-1">Personal & Company</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <span className="text-xs mt-1">Address</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-black p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Top colored banner */}
        <div className="h-24 bg-gradient-to-r from-emerald-800 to-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-emerald-100">Join our seller community</p>
          </div>
        </div>

        {/* Signup form */}
        <div className="p-8">
          {renderProgress()}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderFormStep()}
          </form>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;