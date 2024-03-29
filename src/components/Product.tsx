'use client';
import Image from 'next/image';
import Button from './Button';

import { useRef, useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';

register();

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import Navigation from 'swiper';
import Pagination from 'swiper';
import Autoplay from 'swiper';

import 'swiper/css/pagination';

import SimilarProducts from './SimilarProducts';

interface ProductProps {
  title: string;
  images: string[];
  description: string;
  price: number;
  id: string;
  material?: string;
  categoria: string;
  fabricante: string;
  color?: string[];
  size?: string[];
}

const Product: React.FC<ProductProps> = ({
  title,
  images,
  description,
  price,
  id,
  material,
  categoria,
  fabricante,
  color,
  size,
}) => {
  const swiperElRef = useRef(null);
  const [mainImage, setMainImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    if (swiperElRef.current) {
      (swiperElRef.current as HTMLElement).addEventListener(
        'swiperprogress',
        (e) => {
          const [swiper, progress] = (e as CustomEvent).detail;
          console.log(progress);
        }
      );

      (swiperElRef.current as HTMLElement).addEventListener(
        'swiperslidechange',
        (e) => {
          console.log('slide changed');
        }
      );
    }
  }, []);

  const similarProducts = [
    { image: '/images/liz1.webp', title: 'Sutiã', price: 120 },
    { image: '/images/liz2.webp', title: 'Sutiã2', price: 130 },
    { image: '/images/liz3.webp', title: 'Sutiã3', price: 140 },
    { image: '/images/liz4.webp', title: 'Sutiã4', price: 150 },
  ];
  return (
    <section>
      <div className='flex flex-col ml-2'>
        <div className='w-full border-b-2 border-primary '>
          <h2 className='text-2xl font-bold mb-2 w-full text-primaryDark border-x-primary'>
            {title}
          </h2>
        </div>

        <div className='flex flex-col md:flex-row mt-4'>
          <div className='flex flex-col'>
            <div className='flex flex-wrap md:flex-nowrap flex-col h-10'>
              <Image
                src={mainImage}
                alt='Main Product Image'
                className='mb-4 border rounded-lg'
                width={350}
                height={350}
              />

              <div className='swiper-container md:w-1/2'>
                <Swiper
                  slidesPerView={3}
                  navigation={true}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  centeredSlides={true}
                  autoplay
                >
                  {images.slice(1).map((image, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => setMainImage(image)}
                      className='mySlide'
                    >
                      <Image
                        src={image}
                        alt={`Product Image ${index + 2}`}
                        width={150}
                        height={150}
                        className='w-10 object-cover cursor-pointer'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-2 '>
            <div className='flex w-96'>
              <p className=' border-r-4 border-secondary shadow-2xl p-4 rounded-md'>
                {description}
              </p>
            </div>
            <div className='flex gap-4 mt-4'>
              <Image
                src='/icons/heart-icon.svg'
                alt='Heart Icon'
                width={20}
                height={20}
              />
              <span className='text-xs font-light'>
                Adicionar aos Favoritos
              </span>
            </div>

            <div className='mt-4 rounded px-2 py-2 max-w-48'>
              <h3 className='text-base text-primaryDark font-semibold'>
                Cores
              </h3>
              <div className='flex gap-2 mt-2'>
                {color?.map((colorValue, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 rounded-full border border-transparent ${
                      selectedColor === colorValue
                        ? 'ring-2 ring-offset-2 shadow-lg ring-secondary'
                        : ''
                    }`}
                    style={{ backgroundColor: colorValue }}
                    onClick={() => setSelectedColor(colorValue)}
                  ></button>
                ))}
              </div>
            </div>

            <div className='mt-2 flex-initial rounded px-2 py-2 max-w-64'>
              <h3 className='text-base font-semibold text-primaryDark'>
                Tamanhos
              </h3>
              <div className='flex gap-2 justify-start p-2 w-60 cursor-pointer'>
                {size?.map((sizeValue, index) => (
                  <div
                    key={index}
                    className={`border rounded p-2 ${
                      selectedSize === sizeValue
                        ? 'bg-primary text-white'
                        : 'border-light'
                    }`}
                    onClick={() => setSelectedSize(sizeValue)}
                  >
                    {sizeValue}
                  </div>
                ))}
              </div>
            </div>

            <div className='my-4 px-4 py-2 border-r-4 border-secondary shadow-lg rounded-md bg-primaryLight w-auto'>
              <p className='text-primaryDark font-semibold text-lg'>
                R$ {price},00
              </p>
            </div>

            <div className='flex items-center p-2 max-w-md rounded-md'>
              <div className='flex items-center mr-4'>
                <span className='flex justify-center items-center w-8 h-8 bg-primaryDark text-primaryLight font-bold rounded-full border border-primaryDark'>
                  {quantity}
                </span>
                <div className='flex ml-2'>
                  <button
                    className='w-8 h-8 flex justify-center items-center text-primaryDark font-semibold border-r-2 border-primaryDark'
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                  <button
                    className='w-8 h-8 flex justify-center items-center text-primaryDark font-semibold'
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className='flex w-96 mt-4'>
              <Button variant='secondary' size='large'>
                Comprar
              </Button>
            </div>
            <div className='flex flex-col mt-4 border border-light rounded px-8 py-2 w-52 text-xs text-[#676666] '>
              <div className='flex gap-2 '>
                <p className='font-semibold'>SKU: </p>
                <p>{id}</p>
              </div>
              <div className='flex gap-2'>
                <p className='font-semibold'>Material: </p>
                <p>{material}</p>
              </div>

              <div className='flex gap-2'>
                <p className='font-semibold'>Categoria: </p>
                <p>{categoria}</p>
              </div>
              <div className='flex gap-2'>
                <p className='font-semibold'>Fabricante: </p>
                <p>{fabricante}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 w-auto border-t-2 border-primary mt-4'>
        <div className='w-full flex mt-4 '>
          <h2 className='text-lg text-primaryDark shadow-lg font-semibold border-r-4 border-secondary rounded p-4 whitespace-nowrap'>
            Produtos Parecidos
          </h2>
        </div>
        <div className='flex gap-4 w-[64rem]'>
          <Swiper
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            spaceBetween={20}
            centeredSlides={true}
            autoplay
          >
            {similarProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <SimilarProducts
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Product;
