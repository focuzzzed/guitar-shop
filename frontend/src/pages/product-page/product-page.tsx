import { Header } from '../../components/header/header.tsx';
import { Footer } from '../../components/footer/footer.tsx';
import { ProductCard } from '../../components/product-card/product-card.tsx';

export const ProductPage = () => (
  <>
    <Header />
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ProductCard />
      </div>
    </main>
    <Footer />
  </>
);
