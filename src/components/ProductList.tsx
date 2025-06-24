import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-md-6" key={product.name}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
