interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-primary-800 p-6 rounded-xl shadow-xl max-w-sm w-full animate-fade-in-up">
        <h2 className="text-app-base font-bold text-primary-900 dark:text-primary-100 mb-3">{title}</h2>
        <p className="text-app-sm text-primary-600 dark:text-primary-400 mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 bg-primary-200 dark:bg-primary-600 text-primary-800 dark:text-primary-200 font-semibold py-3 px-4 rounded-lg hover:bg-primary-300 dark:hover:bg-primary-500 transition-colors text-app-sm"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 bg-red-600 dark:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-app-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}