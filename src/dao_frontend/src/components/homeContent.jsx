import React, { useState, useEffect } from 'react';
import reward from '/reward.jpg';
import icpdao4 from '/icpdao4.png';
import { useTheme } from '../contexts/ThemeContext';

const HomeContent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [proposalId, setProposalId] = useState("1"); // Set default or dynamic based on use case
  const [loading, setLoading] = useState(false);
  const [proposalData, setProposalData] = useState(null);

 


    const myStyle = {
        translate: 'none',
        rotate: 'none',
        scale: 'none',
        opacity: 1,
        transform: 'translate(0px, 0px)'
    };
    const gradientClass = darkMode ? 'bg-gradient-to-r from-gray-950 to-gray-950' : 'bg-gradient-to-b from-orange-200 to-orange-500';
    const buttonClass = darkMode ? 'bg-gradient-to-r from-red-600 to-red-900' : 'bg-gradient-to-r from-red-400 to-red-600';


    return (
        <>
        <div>
                <div className="relative isolate px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">ICP Protector DAO</h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">
                                This DAO will be the first 100% on-Chain DAO without investing, but with rewards.
                                ICP Protector DAO will be the place where YOU can propose a potential scam &/or vote on a potential scam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center w-[100%] h-[100%] md:w-full">
                        
                        <img src={icpdao4} alt="DAO Image" style={{ width: '90%' }} />
                        </div>
                        <div className="flex flex-col justify-center lg:pr-8 pt-6 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <p className="mt-2 text-3xl font-bold dark:text-white tracking-tight text-gray-900 sm:text-4xl">Why the fairest DAO?</p>
                                <ul className="list-disc pl-5 mt-12 text-lg text-gray-900 dark:text-white">
                                    <li className='text-left mt-6 text-lg text-gray-900 dark:text-white'>The Voting power contribution is the key.</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>1 User = 1 VP</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        1 User holding 1 NFT = 3 VP but a max of 30 VP
                                        <br />(doesn’t matter if you own hundreds of NFTs)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-none grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col justify-center lg:pr-8">
                            <div className="lg:max-w-lg">
                                <p className=" text-3xl font-bold dark:text-white tracking-tight text-gray-900 sm:text-4xl">What rewards? </p>
                                <ul className="list-disc pl-5 mt-6 text-lg text-gray-900 dark:text-white">
                                    <li className='text-left mt-6 text-lg text-gray-900 dark:text-white'>1 Vote = 1 Point</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>1 Proposal = 2 Points (up to 10 points, depends on the file the user has)</li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        With 555 Points users can mint 1 NFT with a custom background cover.
                                    </li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        With 888 Points users can start to claim Merch on Dyor.shop.
                                    </li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        NFT mining = each NFT that a user stake, will reward them 1 Point each day/each NFT.
                                    </li>
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>
                                        NFT’s, DAO website, VP & Points are 100% on-chain.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[100%] h-[100%] md:w-full">
                        
                        <img src={reward} alt="DAO Image" style={{ width: '90%' }} className='mt-8' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="mt-2 text-3xl font-bold dark:text-white tracking-tight text-gray-900 sm:text-4xl">NFTs</p>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900 mb-5">
                        Here are some of our Genesis NFT collection that includes Voting Power & some hidden gems:
                    </p>
                    {/* <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                            </div>
                        </div>
                        <div class="grid gap-4">
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                            </div>
                            <div>
                                <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                            </div>
                        </div>
                    </div> */}
                </div>
                </div>
            </div>
        </>
    );
};

export default HomeContent;
