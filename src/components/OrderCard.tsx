import Link from 'next/link';
import { IOrder } from '@/interfaces/order.interface';

const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-500 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>;

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-subtle mobile-padding sm:p-6 border border-transparent hover:border-accent transition-all">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        
        {/* Left Side: Order Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-4 mb-3">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              order.isPaid 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
            }`}>
              {order.isPaid ? 'Paid' : 'Payment Pending'}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <TagIcon />
              <span className="text-primary-600 dark:text-primary-400 flex-shrink-0">Order ID:</span>
              <span className="font-mono text-primary-900 dark:text-primary-100 font-medium break-all text-xs sm:text-sm">{order._id}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-primary-600 dark:text-primary-400">Date Placed:</span>
              <span className="font-medium text-primary-900 dark:text-primary-100">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Total and Actions */}
        <div className="flex flex-col items-start sm:items-end border-t border-primary-200 dark:border-primary-600 sm:border-none pt-4 sm:pt-0 flex-shrink-0">
          <p className="text-primary-600 dark:text-primary-400 text-sm">Total</p>
          <p className="font-bold text-xl sm:text-2xl text-primary-900 dark:text-primary-100 mb-3">₹{order.totalPrice.toFixed(2)}</p>
          <Link href={`/profile/orders/${order._id}`} className="bg-accent text-white font-bold py-3 px-5 rounded-xl hover:bg-accent-hover transition-colors text-sm w-full sm:w-auto text-center btn-touch">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}