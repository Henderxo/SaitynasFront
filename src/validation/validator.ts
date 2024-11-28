import { defineRule } from "vee-validate";

const endsWithSpecialSymbol = (value: string): boolean => {
  return /[ ,.!?']$/i.test(value);
};

const startsWithSpecialSymbol = (value: string): boolean => {
  return /^[ ,.!?']/i.test(value);
};


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