import Link from 'next/link';
import { IOrder } from '@/interfaces/order.interface';

// Icons remain the same...
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>;

interface OrderCardProps {
  order: IOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6 border border-transparent hover:border-accent transition-all">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        
        {/* Left Side: Order Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-4 mb-3">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.isPaid ? 'Paid' : 'Payment Pending'}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <TagIcon />
              <span className="text-gray-600 flex-shrink-0">Order ID:</span>
              {/* --- THE DEFINITIVE FIX IS HERE --- */}
              <span className="font-mono text-primary font-medium break-all">{order._id}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-gray-600">Date Placed:</span>
              <span className="font-medium text-primary">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Total and Actions */}
        <div className="flex flex-col items-start md:items-end border-t md:border-none pt-4 md:pt-0 flex-shrink-0">
          <p className="text-gray-600 text-sm">Total</p>
          <p className="font-bold text-2xl text-primary mb-3">${order.totalPrice.toFixed(2)}</p>
          <Link href={`/profile/orders/${order._id}`} className="bg-accent text-white font-bold py-2 px-5 rounded-lg hover:bg-accent-hover transition-colors text-sm w-full md:w-auto text-center">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}