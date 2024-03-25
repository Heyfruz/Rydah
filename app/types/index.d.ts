interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryList;
  sellerLocation: string;
  imageUrl: string;
}

type CategoryList =
  | 'dresses'
  | 'jeans'
  | 'jackets'
  | 'shoes'
  | 'bags'
  | 'tops'
  | 'skirts'
  | 'sweaters'
  | 'jewelry'
  | 'dresses'
  | 'shoes'
  | 'accessories';

interface Category {
  id: string;
  name: CategoryList;
  imageUrl: string;
}

type PickerItemProps = {
  value: string;
  label: string;
};

interface Transaction {
  id: string;
  productName: string;
  status: 'sold' | 'purchased';
  feedback: string;
  customerName: string;
  date: string;
  price: number;
  imageUrl: string;
  category: CategoryList;
}
