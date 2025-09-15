import { IProduct } from '@/interfaces/product.interface';
import Link from 'next/link';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white">
        <div className="relative w-full h-64 bg-secondary overflow-hidden">
          <img
            src={product.images[0] || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-lg font-semibold text-primary truncate">{product.name}</h3>
          <p className="text-xl font-bold text-accent mt-2">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
