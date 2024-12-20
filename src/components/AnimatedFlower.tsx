'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Flower from '/public/images/flower.svg';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(MotionPathPlugin);

const AnimatedFlower = () => {
    const container = useRef<HTMLElement>(null);
    const petala1Ref = useRef(null);

    useGSAP(
        () => {
            if (container.current) {
                gsap.fromTo(
                    container.current,
                    { x: -400, opacity: 0 },
                    { x: 0, opacity: 1, duration: 2, ease: 'power3.out' }
                );
            }
        },
        { scope: container }
    );

    return (
        <div
            ref={container as React.RefObject<HTMLDivElement>}
            className="w-[200px] h-[200px]"
        >
            <Flower />
        </div>
    );
};

export default AnimatedFlower;
