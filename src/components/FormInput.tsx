import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  as?: 'input' | 'textarea';
}

const FormInput = ({ label, id, as = 'input', ...props }: FormInputProps) => {
  const commonClasses = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm";
  
  const InputComponent = as === 'textarea' 
    ? <textarea id={id} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} className={commonClasses + " h-32"} />
    : <input id={id} {...props as React.InputHTMLAttributes<HTMLInputElement>} className={commonClasses} />;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {InputComponent}
    </div>
  );
};

export default FormInput;