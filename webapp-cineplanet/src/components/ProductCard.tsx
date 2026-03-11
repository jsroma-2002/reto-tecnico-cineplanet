import type { CandystoreProduct } from '../features/candystore/candystoreService';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: CandystoreProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price }));
  };

  return (
    <div className="product-card">
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__price">S/{product.price.toFixed(2)}</span>
      </div>
      <button className="btn btn-primary product-card__btn" onClick={handleAdd}>
        Agregar
      </button>
    </div>
  );
}

export default ProductCard;
