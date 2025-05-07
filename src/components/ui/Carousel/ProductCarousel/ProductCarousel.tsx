import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import { FC } from "react";
import CardProducts from "../../Cards/CardProducts/CardProducts";
import styles from './ProductCarousel.module.css';

interface IProps {
  products: IDetalleDTO[];
}

const ProductCarousel: FC<IProps> = ({ products }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20} // Espacio entre los slides
        slidesPerView={3} // Número de productos por vista
        navigation
        pagination={{ clickable: true }}
        loop={true} // Permite hacer un loop de los productos
        className={styles.swiperContainer} // Clase personalizada para el contenedor de Swiper
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.swiperSlide}> {/* Clase personalizada para cada slide */}
            <CardProducts products={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
