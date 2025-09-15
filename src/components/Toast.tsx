interface ToastProps {
  message: string;
  show: boolean;
}

const Toast = ({ message, show }: ToastProps) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 right-10 bg-primary text-white py-2 px-5 rounded-lg shadow-xl animate-toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
    