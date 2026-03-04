// Validation schemas for production-level form validation

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\d{10,15}$/;

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  const cleaned = phone.replace(/[-\s]/g, "");
  if (!phoneRegex.test(cleaned)) {
    return "Phone number must be 10-15 digits";
  }
  return null;
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
};

export const validateDate = (date) => {
  if (!date) {
    return "Date is required";
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return "Date cannot be in the past";
  }
  
  return null;
};

export const validateTime = (time) => {
  if (!time) {
    return "Time is required";
  }
  return null;
};

export const validateBookingForm = (formData) => {
  const errors = {};
  
  const nameError = validateName(formData.patientName);
  if (nameError) errors.patientName = nameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;
  
  const dateError = validateDate(formData.date);
  if (dateError) errors.date = dateError;
  
  const timeError = validateTime(formData.time);
  if (timeError) errors.time = timeError;
  
  if (!formData.sessionType) {
    errors.sessionType = "Session type is required";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAuthForm = (formData, type = 'login') => {
  const errors = {};
  
  if (type === 'signup' && formData.name) {
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
  }
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  
  if (type === 'signup' && formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Payment validation
export const validatePaymentAmount = (amount) => {
  if (typeof amount !== 'number' || amount <= 0) {
    return "Invalid payment amount";
  }
  if (amount > 1000000) { // 10 lakh limit
    return "Amount exceeds maximum limit";
  }
  return null;
};
