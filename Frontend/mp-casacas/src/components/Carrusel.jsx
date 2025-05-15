import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carrusel.css';

const Home = () => {
  const [camisetas, setCamisetas] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then(res => res.json())
      .then(data => setCamisetas(data))
      .catch(err => console.error('Error al traer camisetas:', err));
  }, []);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const windowWidth = window.innerWidth;
      if (swiperRef.current) {
        if (windowWidth <= 768) {
          swiperRef.current.params.slidesPerView = 2;
        } else if (windowWidth <= 1000) {
          swiperRef.current.params.slidesPerView = 3;
        } else {
          swiperRef.current.params.slidesPerView = 5;
        }
        swiperRef.current.update();
      }
    };

    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  return (
    <>
      <section>
        <div className="imgpc">
          {/* <a href=""><img src="images/banerNey.jpeg" alt="" /></a> */}
        </div>
        
      </section>

      <div className="swiper">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Inicializamos slidesPerView
            const windowWidth = window.innerWidth;
            swiper.params.slidesPerView =
              windowWidth <= 768 ? 2 : windowWidth <= 1000 ? 3 : 5;
            swiper.update();
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          loop={true}
        >
          {camisetas.map((c) => (
            <SwiperSlide key={c.idproducto}>
              <div className="card">
                <Link to={`/detalle/${c.idproducto}`}>
                  <img src={c.url_imagen} alt={c.nombre} />
                  <div className="detalle">
                    <p className="currentPrice">$ {c.precio.toLocaleString()}</p>
                    <p>{c.nombre}</p>
                    <div className="estrellas">
                      <div className="ima">
                        <img src="/images/clasificacion.png" alt="" />
                        <p>2589</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>

      <div className="cen">
        <div className="line"></div>
      </div>

      <h5 className="subtitulo">Nuestros productos</h5>

      <div className="containerHomeCards">
        {camisetas.map((c) => (
          <div className="cardh" key={c.idproducto}>
            <Link to={`/detalle/${c.idproducto}`}>
              <img src={c.url_imagen} alt={c.nombre} />
              <div className="detalle">
                <p className="currentPrice">$ {c.precio.toLocaleString()}</p>
                <p>{c.nombre}</p>
                <div className="estrellas">
                  <div className="ima">
                    <img src="/images/clasificacion.png" alt="" />
                    <p>2589</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
