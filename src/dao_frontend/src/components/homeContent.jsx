import React, { useEffect, useRef } from 'react';
import { Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Assuming these imports are correct and the images are in the right place
import reward from '/reward.jpg';
import icpdao4 from '/icpdao4.png';
import above_footer from '/ab_footer.png';
import nft1 from '/nfts/nft1.jpg';
import nft2 from '/nfts/nft2.jpg';
import nft3 from '/nfts/nft3.jpg';
import nft4 from '/nfts/nft4.jpg';
import nft5 from '/nfts/nft5.jpg';
import nft6 from '/nfts/nft6.jpg';
import nft7 from '/nfts/nft7.jpg';
import nft8 from '/nfts/nft8.jpg';
import nft9 from '/nfts/nft9.jpg';

const FeatureCard = ({ icon: Icon, title, items }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
        <div className="flex items-center space-x-2 mb-4">
            <Icon className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const NFTGrid = ({ images }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, index) => (
            <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <img src={src} alt={`NFT ${index + 1}`} className="object-cover w-full h-full" />
            </motion.div>
        ))}
    </div>
);

const HomeContent = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

            <main className="container mx-auto px-4 py-16 max-w-7xl">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20 py-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">ICP Protector DAO</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-75">
                        The first 100% on-chain DAO, without investing but with RWA rewards. Help us to protect your friends & the community, by reporting and voting of potential Scams.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition duration-300">
                            Get Started
                        </button>
                        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-lg transition duration-300">
                            Learn More
                        </button>
                    </div>
                </motion.section>

                <section className="grid md:grid-cols-2 gap-12 mb-20 px-6 py-12 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg items-center">
                    {/* Feature Card */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-8 md:p-10 flex flex-col justify-center items-start h-full">
                        <div className="flex items-center mb-6">
                            <div className="flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-full shadow-md">
                                <Shield className="w-7 h-7 text-orange-500" />
                            </div>
                            <h2 className="text-3xl font-bold ml-5 text-gray-900 dark:text-white">
                                Why Choose the Fairest DAO?
                            </h2>
                        </div>
                        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                            ICP Protector DAO redefines fairness by empowering every participant equally, regardless of financial status or influence. Here’s why we stand out:
                        </p>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-9 h-7 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">1</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">
                                        Equal Voting Power
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        Each user contributes equally to decision-making with one voting point (VP).
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-9 h-7 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">2</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-start">
                                        NFT Incentives
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        Owning NFTs grants additional voting power, capped at a fair maximum of 30 VP.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">3</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-start">
                                        Community-Driven
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        Decisions prioritize transparency, fairness, and collective impact.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Image Section */}
                    <motion.div
                        className="relative flex justify-center items-center h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="relative w-full max-w-lg">
                            <img
                                src={icpdao4}
                                alt="DAO Illustration"
                                className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                            <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold py-1 px-3 rounded-lg shadow-md">
                                Featured
                            </div>
                        </div>
                    </motion.div>
                </section>


                <section className="grid md:grid-cols-2 gap-12 mb-20 px-6 py-12 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg items-center">
                    {/* Feature Card */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-8 md:p-10 flex flex-col justify-center items-start h-full order-1 md:order-2">
                        <div className="flex items-center mb-6">
                            <div className="flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-900 rounded-full shadow-md">
                                <Award className="w-7 h-7 text-orange-500" />
                            </div>
                            <h2 className="text-3xl font-bold ml-5 text-gray-900 dark:text-white">
                                What Rewards?
                            </h2>
                        </div>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">1</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>1 Vote = 1 Point:</strong> Voting rewards users with 1 point.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-11 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">2</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>Proposals:</strong> 1 Proposal rewards 2 points (up to 20 points, depending on the user’s file).
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-11 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">3</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>Mint NFTs:</strong> With 555 points, users can mint 1 NFT with a custom background cover.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-10 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">4</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>Claim Merch:</strong> With 888 points, users can claim merchandise on Dyor.shop.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">5</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>Daily NFT Mining:</strong> Staked NFTs reward 1 point per day per NFT.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="flex items-center justify-center w-9 h-8 bg-orange-500 text-white rounded-full mr-4 shadow-md">
                                    <span className="font-semibold text-sm">6</span>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-start">
                                        <strong>On-Chain Rewards:</strong> NFTs, DAO website, VP, and points are fully on-chain.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Image Section */}
                    <motion.div
                        className="relative flex justify-center items-center h-full order-2 md:order-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="relative w-full max-w-lg">
                            <img
                                src={reward}
                                alt="Reward Image"
                                className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            />
                            <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold py-1 px-3 rounded-lg shadow-md">
                                Featured
                            </div>
                        </div>
                    </motion.div>
                </section>




                <section className="mb-20">
                    <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-200">
                        Featured Video
                    </h2>
                    <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8">
                        Explore our latest video to understand more about our mission and vision.
                    </p>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-3xl aspect-video rounded-xl shadow-lg overflow-hidden dark:border-orange-600 hover:scale-105 transition-transform duration-300">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/YTNSGmcsiSc?si=O1Zn29sqTssup7e2"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>


                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-4 text-center">Our NFT Collection</h2>
                    <p className="text-center mb-8 opacity-75">
                        Here are some of our Genesis NFT collection that includes Voting Power & some hidden gems:
                    </p>
                    <NFTGrid images={[nft1, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9]} />
                </section>
            </main>

            <footer className="py-8 bg-orange-500  dark:bg-gray-800">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <img src={above_footer} alt="Footer Image" className="w-41 mb-4" />
                    {/* <p className="text-sm opacity-75">© 2023 ICP Protector DAO. All rights reserved.</p> */}
                </div>
            </footer>
        </div>
    );
};

export default HomeContent;

