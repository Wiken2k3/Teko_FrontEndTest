import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '../types/product';

interface ComponentData {
  type: string;
  customAttributes: any;
}

interface Props {
  data: ComponentData[];
  onAddProduct: (product: Product) => void;
  productList: Product[];
}

const DynamicRenderer = ({ data, onAddProduct, productList }: Props) => {
  return (
    <div className="container py-4">
      {data.map((component, index) => {
        const { type, customAttributes } = component;

        switch (type) {
          case 'Label':
            return (
              <h4 key={index} className="text-center fw-semibold mb-4" style={{ color: '#222' }}>
                {customAttributes.label?.text}
              </h4>
            );

          case 'ProductSubmitForm':
            return (
              <ProductForm
                key={index}
                fields={customAttributes.form}
                onSubmit={onAddProduct}
              />
            );

          case 'Button':
            return null; // đã nằm trong ProductForm rồi

          case 'ProductList':
            return (
              <div key={index} className="mt-5">
                <ProductList products={productList} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DynamicRenderer;
