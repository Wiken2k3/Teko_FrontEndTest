import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white pb-3 text-start">
      <img
        src={product.imageSrc}
        alt={product.name}
        style={{
          height: 300,
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto 12px',
        }}
      />
      <div style={{ maxWidth: 300, margin: '0 auto' }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 15, color: '#333' }}>
          {product.price.toLocaleString('vi-VN')} đ
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
