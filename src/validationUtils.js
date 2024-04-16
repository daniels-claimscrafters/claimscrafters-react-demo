// validationUtils.js

// validationUtils.js

export const isValidFirstName = (firstName) => {
  console.log('Checking first name:', firstName);
  // First name validation logic
  // Should contain only letters and have a minimum length of 2
  const nameRegex = /^[a-zA-Z']+$/; // Updated regex to include apostrophe

  return (
    firstName.trim() !== '' &&
    firstName.trim().length >= 2 &&
    nameRegex.test(firstName.trim())
  );
};

export const isValidLastName = (lastName) => {
  // Last name validation logic
  // Should contain only letters and have a minimum length of 2
  const nameRegex = /^[a-zA-Z']+$/; // Updated regex to include apostrophe

  return (
    lastName.trim() !== '' &&
    lastName.trim().length >= 2 &&
    nameRegex.test(lastName.trim())
  );
};


export const isValidTitle = (title) => {
  // Title validation logic
  // Add your own criteria (e.g., should not be empty and have a minimum length)
  return title.trim() !== '' && title.trim().length >= 2; // Adjust the minimum length as needed
};

export const isValidPostalCode = (postalCode) => {
  // Postal code validation logic
  // Should be a 5-digit number
  const postalCodeRegex = /^\d{5}$/;

  return postalCodeRegex.test(postalCode.trim());
};

export const isValidCompany = (company) => {
  // Company validation logic
  // Add your own criteria (e.g., should not be empty and have a minimum length)
  return company.trim() !== '' && company.trim().length >= 2; // Adjust the minimum length as needed
};

export const isValidPhone = (phone) => {
  // Phone validation logic
  // Allow numbers, spaces, parentheses, hyphens, and plus sign
  const phoneRegex = /^[\d\s().+-]+$/;

  return (
    phone.trim() !== '' &&
    phoneRegex.test(phone.trim()) &&
    phone.trim().replace(/[\s().+-]/g, '').length >= 10 // Require at least 10 digits
  );
};

export const isValidEmail = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(email);
};

export const isValidPhoneNPC = (phone) => {
  const phoneRegex = /^[\d\s().+-]+$/;
  
  const cleanedPhone = phone.trim().replace(/[\s().+-]/g, '');
  console.log('Cleaned Phone:', cleanedPhone);

  const isValid =
    cleanedPhone !== '' &&
    phoneRegex.test(phone.trim()) &&
    cleanedPhone.length >= 10;

  console.log('Is Valid Phone:', isValid);
  
  return isValid
    ? null // Validation passed
    : 'Invalid phone number'; // Validation failed
};

export const isValidEmailNPC = (email) => {
  const emailRegex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  console.log('Email:', email);
  const isValid = emailRegex.test(email);
  console.log('Is Valid Email:', isValid);
  
  return isValid
    ? null // Validation passed
    : 'Invalid email address'; // Validation failed
};

export const isValidCreatePassword = (createPassword) => {
  // Password must be at least 8 characters long and contain at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  return passwordRegex.test(createPassword);
};

export const isValidConfirmPassword = (confirmPassword, createPassword) => {
  // Confirm Password validation logic
  // Check if it matches the Create Password
  return confirmPassword === createPassword;
};

export const isFormComplete = (formData) => {
  // Check if all required fields in the form data are filled
  return (
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.title.trim() !== '' &&
    formData.company.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.createPassword.trim() !== '' &&
    formData.confirmPassword.trim() !== ''
    // Add other required fields as needed
  );
};

export const isNotEmpty = (value) => {
  console.log('XInput value:', value); // Add this line for debugging
  if (!value || value.trim() === '') {
    return 'Field cannot be empty.';
  }
  return ''; // No error
};

export const isNotEmpty2 = (value) => {
  console.log('Input value:', value);
  return value && value.trim() !== '';
};

export const isValidSalesTax = (value) => {
  // Regular expression to match float integers
  const floatIntegerPattern = /^[0-9]+(\.[0-9]+)?$/;

  // Return true if the value matches the pattern, otherwise false
  return floatIntegerPattern.test(value);
};

export const isValidDateFormat = (date) => {
  // Date format validation logic for YYYY-MM-DD format
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  return date.trim() !== '' && dateFormatRegex.test(date.trim());
};

export const isValidCardholderName = (name) => {
  // Cardholder name validation logic
  // Allow letters, spaces, and certain special characters like hyphens and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return name.trim() !== '' && nameRegex.test(name.trim());
};

export const isValidCardNumber = (number) => {
  // Remove spaces from the input number
  const trimmedNumber = number.replace(/\s/g, '');
  // Card number validation logic
  // Assume a valid card number should contain up to 16 digits
  const numberRegex = /^\d{1,16}$/;
  return trimmedNumber.trim() !== '' && numberRegex.test(trimmedNumber.trim());
};

export const isValidExpirationDate = (expiration) => {
  // Expiration date validation logic
  // Assume a valid expiration date should be in MM/YY format and should not be expired
  const expirationRegex = /^(0[1-9]|1[0-2])\/([2-9][2-9])$/; // MM/YY format
  if (!expirationRegex.test(expiration.trim())) {
    return false;
  }

  const [month, year] = expiration.split('/');
  const currentYear = new Date().getFullYear() % 100; // Get last two digits of the year
  const currentMonth = new Date().getMonth() + 1; // Months are 0-based, so add 1

  return (
    parseInt(year, 10) >= currentYear ||
    (parseInt(year, 10) === currentYear && parseInt(month, 10) >= currentMonth)
  );
};

export const isValidCVV = (cvv) => {
  // CVV validation logic
  // Assume a valid CVV should contain no more than 4 digits
  const cvvRegex = /^\d{3,4}$/;
  return cvv.trim() !== '' && cvvRegex.test(cvv.trim());
};