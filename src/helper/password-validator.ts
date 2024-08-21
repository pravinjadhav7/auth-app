import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    Validate,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'customPassword', async: false })
  export class PasswordValidator implements ValidatorConstraintInterface {
    validate(password: string, args: ValidationArguments) {
      const minLength = password.length >= 8;
      const hasLetter = /[A-Za-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[@$!%*#?&]/.test(password);
  
      return minLength && hasLetter && hasNumber && hasSpecialChar;
    }
  
    defaultMessage(args: ValidationArguments) {
      const messages = [];
      const password = args.value;
  
      if (password.length < 8) {
        messages.push('Password must be at least 8 characters long');
      }
      if (!/[A-Za-z]/.test(password)) {
        messages.push('Password must contain at least one letter');
      }
      if (!/\d/.test(password)) {
        messages.push('Password must contain at least one number');
      }
      if (!/[@$!%*#?&]/.test(password)) {
        messages.push('Password must contain at least one special character');
      }
  
      return messages.join(', ');
    }
  }
  