import React, { useState, useEffect } from 'react';
import reward from '/reward.jpg';
import icpdao4 from '/icpdao4.png';
import above_footer from '/ab_footer.png';
import { useTheme } from '../contexts/ThemeContext';
import nft1 from '/nfts/nft1.jpg'
import nft2 from '/nfts/nft2.jpg'
import nft3 from '/nfts/nft3.jpg'
import nft4 from '/nfts/nft4.jpg'
import nft5 from '/nfts/nft5.jpg'
import nft6 from '/nfts/nft6.jpg'
import nft7 from '/nfts/nft7.jpg'
import nft8 from '/nfts/nft8.jpg'
import nft9 from '/nfts/nft9.jpg'

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
                            The first  100% on-chain DAO, without investing but with RWA rewards. Help us to protect your friends & the community, by reporting and voting of potential Scams.
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
                                    <li className='text-left mt-2 text-lg text-gray-900 dark:text-white'>1 Proposal = 2 Points (up to 20 points, depends on the file the user has)</li>
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft1} alt="Image 1" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft2} alt="Image 2" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft3} alt="Image 3" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft4} alt="Image 4" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft5} alt="Image 5" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft6} alt="Image 6" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft7} alt="Image 7" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft8} alt="Image 8" />
                            </div>
                            <div class="aspect-w-1 aspect-h-1">
                                <img class="object-cover w-full h-full rounded-lg" src={nft9} alt="Image 9" />
                            </div>
                        </div>
                </div>
                </div>
            </div>
            <div className="overflow-hidden py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-center w-[20%] h-[20%] sm:w-full"> 
                    <img src={above_footer} alt="" style={{ width: '60%' }} /></div>
                </div>
            </div>
        </>
    );
};

export default HomeContent;
