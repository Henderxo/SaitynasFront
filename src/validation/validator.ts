import { defineRule } from "vee-validate";

const endsWithSpecialSymbol = (value: string): boolean => {
  return /[ ,.!?']$/i.test(value);
};

const startsWithSpecialSymbol = (value: string): boolean => {
  return /^[ ,.!?']/i.test(value);
};

defineRule('required', (value: any) =>{
    if(!value){
        return `This field is required`     
    }
    return true
})

defineRule('end', (value: string)=>{
    if(endsWithSpecialSymbol(value)){
        return `Field can't end with a special symbol or a space`
    }
    return true
})

defineRule('photoValidation', (value: any) => {
  if (!value) {
    return 'A photo is required.'; // Checks if no file is selected
  }

  const MAX_SIZE_MB = 10;
  const file = value; // Since it's one file, we don't need to access an array element

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `The photo size must be less than ${MAX_SIZE_MB} MB.`; // Checks file size
  }

  // Optionally: Check file type (e.g., for images)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG, or GIF images are allowed.';
  }

  return true; // Passes validation
});

defineRule('start', (value: string)=>{
    if(endsWithSpecialSymbol(value)){
        return `Field can't start with a special symbol or a space`
    }
    return true
})

defineRule('minLength4', (value: string) => {
    if (value.length <= 4) {
      return 'Field must be longer than 4 characters';
    }
    return true;
  });
  
  defineRule('minLength10', (value: string) => {
    if (value.length <= 10) {
      return 'Field must be longer than 10 characters';
    }
    return true;
  });

  defineRule('maxLength15', (value: string) => {
    if (value.length >= 15) {
      return 'Field must be shorter than 15 characters';
    }
    return true;
  });
  
  defineRule('maxLength25', (value: string) => {
    if (value.length >= 25) {
      return 'Field must be shorter than 25 characters';
    }
    return true;
  });
  
  defineRule('maxLength45', (value: string) => {
    if (value.length >= 45) {
      return 'Field must be shorter than 45 characters';
    }
    return true;
  });

defineRule('email', (value: String) => {
    if (!value) {
        return 'Email cannot be empty.'
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value as string)) {
        return 'The email address is invalid.'
    }
    return true
});

defineRule('password', (value: String) => {
    if (!value) {
        return 'Password cannot be empty.'
    }
    // if (value.length < 8) {
    //     return 'Password must be at least 8 characters long.'
    // }
    
    // if (!/[a-z]/.test(value as string)) {
    //     return 'Password must contain at least one lowercase letter.'
    // }
    
    // if (!/[A-Z]/.test(value as string)) {
    //     return 'Password must contain at least one uppercase letter.'
    // }
    
    // if (!/\d/.test(value as string)) {
    //     return 'Password must contain at least one number.'
    // }
    
    // if (!/[!@#$%^&*.{}',;]/.test(value as string)) {
    //     return 'Password must contain at least one special character (e.g., !@#$%^&*).'
    // }
    return true
})