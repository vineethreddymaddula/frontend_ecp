import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  as?: 'input' | 'textarea';
}

const FormInput = ({ label, id, as = 'input', ...props }: FormInputProps) => {
  const commonClasses = "block w-full px-3 py-3 sm:py-2 border border-primary-300 dark:border-primary-600 rounded-xl bg-white dark:bg-primary-700 text-primary-900 dark:text-primary-100 shadow-sm placeholder-primary-400 dark:placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm sm:text-base btn-touch";
  
  const InputComponent = as === 'textarea' 
    ? <textarea id={id} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} className={commonClasses + " h-24 sm:h-32 resize-none"} />
    : <input id={id} {...props as React.InputHTMLAttributes<HTMLInputElement>} className={commonClasses} />;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
        {label}
      </label>
      {InputComponent}
    </div>
  );
};

export default FormInput;