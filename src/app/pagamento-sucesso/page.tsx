'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useCartStore } from '@/context/store';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const collection_id = searchParams.get('collection_id');
    const merchant_order_id = searchParams.get('merchant_order_id');
    const clearStorage = useCartStore((state) => state.clearStorage);
    const cartId = useCartStore((state) => state.cartId);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;

    console.log('cartId out', cartId);
    useEffect(() => {
        if (collection_id && cartId) {
            const sendCollectionIdToBackend = async () => {
                try {
                    console.log('collection_id', collection_id);
                    console.log('cartId', cartId);
                    const response = await axios.post(
                        `${BASE_URL}/shipping/payment-success`,
                        {
                            collection_id,
                            cartId,
                            merchant_order_id,
                        }
                    );
                    
                    console.log('Resposta do backend:', response.data);
                } catch (error) {
                    console.error(
                        'Erro ao enviar collection_id para o backend:',
                        error
                    );
                }
            };

            sendCollectionIdToBackend();
            clearStorage();
        }
    }, [collection_id, cartId]);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-primaryLight p-8 rounded-lg shadow-lg z-10 relative overflow-hidden lg:p-16 md:p-12 sm:w-full">
                <div className="relative z-10 bg-primary p-8 border-2 border-y-primaryDark rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center my-8">
                        Pagamento Efetuado com Sucesso
                    </h1>
                    <Fireworks autorun={{ speed: 3, duration: 5 }} />
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;