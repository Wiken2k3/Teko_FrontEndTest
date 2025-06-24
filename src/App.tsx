import { useEffect, useState } from 'react';
import DynamicRenderer from './components/DynamicRenderer';
import { Product } from './types/product';

function App() {
  const [componentsData, setComponentsData] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('https://hiring-test.stag.tekoapis.net/api/products/management');
        const result = await response.json();

        setComponentsData(result.data);

        const productListComponent = result.data.find(
          (component: unknown) =>
            typeof component === 'object' &&
            component !== null &&
            'type' in component &&
            (component as { type: string }).type === 'ProductList'
        );

        if (
          productListComponent &&
          'customAttributes' in productListComponent &&
          productListComponent.customAttributes?.productlist?.items
        ) {
          setProducts(productListComponent.customAttributes.productlist.items);
        }
      } catch (error) {
        console.error('Failed to fetch component data:', error);
      }
    };

    fetchComponents();
  }, []);

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <DynamicRenderer
      data={componentsData}
      onAddProduct={handleAddProduct}
      productList={products}
    />
  );
}

export default App;
