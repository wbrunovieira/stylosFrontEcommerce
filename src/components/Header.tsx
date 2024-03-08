'use client';

import React, { useState, useEffect, use } from 'react';

import { BsInstagram, BsFacebook, BsTiktok, BsCart4 } from 'react-icons/bs';
import Image from 'next/image';
import logo from '/public/logo-prov.svg';
import SearchBox from './SearchBox';
import Button from './Button';
import FloatCart from './FloatCart';

const Header = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <header className='bg-gradient-to-r from-primary to-primaryLight h-32 flex justify-center items-center flex-col mx-auto px-16  pt-4'>
      <div className='flex justify-between items-center w-full mb-4'>
        <div className='social-icons flex gap-3'>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsInstagram className='text-secondary transition duration-300 hover:scale-125' />
          </a>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsFacebook className='text-secondary transition duration-300 hover:scale-125' />
          </a>
          <a
            href='https://tiktok.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <BsTiktok className='text-secondary transition duration-300 hover:scale-125' />
          </a>
        </div>
        <p className='text-xs text-fontColor font-light transition duration-300 hover:scale-110'>
          Entrega grátis a partir de R$ 200,00
        </p>
      </div>
      <hr className='w-full border-t line-white ' />
      <div className='flex justify-between items-center w-full  text-secondary'>
        <Image
          src={logo}
          alt='logo'
          width={100}
          height={100}
          className='mt-4 mb-4'
        />
        <div className='w-full'>
          <SearchBox />
        </div>
        <div className='flex gap-4'>
          <Button variant='secondary' size='small'>
            Login
          </Button>
          <button
            onClick={toggleCartModal}
            className='flex items-center justify-center'
          >
            <BsCart4 size={32} />
            <span className='absolute -bottom-2 -right-4 opacity-70 bg-primaryDark text-primaryLight border border-primaryDark text-[10px] rounded-full px-2 py-2 min-w-[20px] h-[20px] flex items-center justify-center'>
              5{' '}
              {/* Substitua o 5 pela quantidade dinâmica de itens no carrinho, se necessário */}
            </span>
          </button>
          {isCartModalOpen && <FloatCart onClose={toggleCartModal} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
