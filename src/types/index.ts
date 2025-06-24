export interface Product {
  name: string;
  price: number;
  imageSrc: string;
}
export interface ComponentBlock {
  type: string;
  customAttributes?: {
    [key: string]: unknown;
    productlist?: {
      items: Product[];
    };
  };
}
