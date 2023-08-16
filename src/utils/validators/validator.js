export const validation = (values, maxLength, newValue) => {
   const errors = {};
   if (!values[newValue]) {
      errors[newValue] = 'Field is required';
      return errors
   }

   else if (values[newValue].length > maxLength) {
      errors[newValue] = `Max length is ${maxLength} simbols`;
      return errors
   }
  
   return undefined;
};

export const validationLogin = (values, maxLength, newValue, validationPassword) => {
   const errors = {};
   if (!values[newValue]) {
      errors[newValue] = 'Field is required';
      return errors
   }

   else if (values[newValue].length > maxLength) {
      errors[newValue] = `Max length is ${maxLength} simbols`;
      return errors
   }
   

   if (!values[validationPassword]) {
      errors[validationPassword] = 'Field is required';
      return errors
   }
   else if (values[validationPassword].length > maxLength) {
      errors[validationPassword] = `Max length is ${maxLength} simbols`;
      return errors
   }
  
   return undefined;
};