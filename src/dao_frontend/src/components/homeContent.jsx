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

import { LucideShield, Sun, Menu, X, Shield, Award, Gift } from 'lucide-react'

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
            <main className='container mx-auto px-4 py-16 md:w-[1120px]'>
                <section className="text-center mb-20 py-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">ICP Protector DAO</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-300">
                        The first 100% on-chain DAO, without investing but with RWA rewards. Help us to protect your friends & the community, by reporting and voting of potential Scams.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-black text-white dark:bg-white dark:text-black font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300">
                            Get Started
                        </button>
                        <button className="border border-gray-300 text-black dark:text-white dark:border-gray-600 font-semibold py-2 px-6 rounded-lg bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </section>



                <section className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-lg p-6 md:p-8">
                        <div className="flex items-center mb-4">
                            <Shield className="w-8 h-8 text-orange-500 mr-2" />
                            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Why the fairest DAO?</h2>
                        </div>
                        <ul className="list-disc pl-5 mt-12 text-gray-900 dark:text-white">
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>The Voting power contribution is the key.</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>1 User = 1 VP</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>1 User holding 1 NFT = 3 VP but a max of 30 VP (doesn't matter if you own hundreds of NFTs)</li>
                        </ul>
                    </div>
                    <div className="p-4 md:p-8">
                        <div className="flex items-center justify-center w-full h-full md:w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">

                            <img src={icpdao4} alt="DAO Image" style={{ width: '90%' }} />
                        </div>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="p-4 md:p-8">
                        <div className="flex items-center justify-center w-full h-full md:w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">

                            <img src={reward} alt="DAO Image" style={{ width: '90%' }} className='mt-8' />
                        </div>
                    </div>
                    <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-lg p-6 md:p-8">
                        <div className="flex items-center mb-4">
                            <Award className="w-8 h-8 text-orange-500 mr-2" />
                            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">What rewards?</h2>
                        </div>
                        <ul className="list-disc pl-5 mt-12 text-gray-900 dark:text-white">
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>1 Vote = 1 Point</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>1 Proposal = 2 Points (up to 20 points, depends on the file the user has)</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>With 555 Points users can mint 1 NFT with a custom background cover.</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>With 888 Points users can start to claim Merch on Dyor.shop.</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>NFT mining = each NFT that a user stake, will reward them 1 Point each day/each NFT.</li>
                            <li className='text-left mt-2 text-gray-900 dark:text-white'>NFT's, DAO website, VP & Points are 100% on-chain.</li>
                        </ul>
                    </div>
                </section>
                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-8 dark:text-white text-center">Featured Video</h2>
                    <div className="flex justify-center">
                        <iframe allowFullScreen
                            className="w-full max-w-2xl aspect-video rounded-lg shadow-lg" src="https://www.youtube.com/embed/YTNSGmcsiSc?si=O1Zn29sqTssup7e2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </section>
                <div className="overflow-hidden py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <p className="mt-2 text-3xl font-bold dark:text-white tracking-tight text-gray-900 sm:text-4xl">Our NFT Collection</p>
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <p className="mt-2 leading-8 dark:text-gray-300 text-gray-900 mb-5">
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
            </main>

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
