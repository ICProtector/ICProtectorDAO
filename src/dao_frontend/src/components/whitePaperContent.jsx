import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logoo.png';
import icp from '/icp.png';
import { useTheme } from '../contexts/ThemeContext';
import WhitePaperPage from '../pages/whitePaperPage';

const WhitePaperContent = () => {
    
  const { darkMode, toggleTheme } = useTheme();

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
            <div className="">
                <div className="relative isolate px-6  lg:px-8">

                    <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 dark:text-gray-300  text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Announcing our next round of voting. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">ICP Protector dao is created to alert the Community</h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                                <a href="#" className="text-sm font-semibold leading-6 dark:text-gray-300">Learn more <span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7  text-indigo-600"> Safeguarding Your Data</h2>
                                <p className="mt-2 text-3xl font-bold dark:text-white tracking-tight text-gray-900 sm:text-4xl">Introducing ICP Protector</p>
                                <p className="mt-6 text-lg leading-8 text-gray-900 dark:text-white">Make the switch to ICP Protector today and experience the difference in your deployment process. Deploy faster, work smarter, and stay secure with ICP Protector by your side.</p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900 dark:text-white">
                                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
                                            </svg>
                                            Streamline your deployment process with ICP Protector.
                                        </dt>
                                        <dd className="inline dark:text-white text-gray-900 ">ay goodbye to lengthy setup times and hello to lightning-fast deployment. Our innovative technology ensures that your workflow is smoother than ever before.</dd>
                                    </div>
                                    <div className="relative pl-9 dark:text-white text-gray-900 ">
                                        <dt className="inline font-semibold text-gray-900 dark:text-white">
                                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                            </svg>
                                            Enhanced Security Measures
                                        </dt>
                                        <dd className="inline dark:text-white text-gray-900 ">With ICP Protector, your SSL certificates are in safe hands. Our advanced encryption protocols guarantee the utmost security for your sensitive data. Rest easy knowing that your information is protected from prying eyes.</dd>
                                    </div>
                                    <div className="relative pl-9 dark:text-white text-gray-900 ">
                                        <dt className="inline font-semibold text-gray-900 dark:text-white">
                                            <svg className="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                                                <path fillRule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clipRule="evenodd" />
                                            </svg>
                                            Reliable Backup Solutions
                                        </dt>
                                        <dd className="inline dark:text-white text-gray-900 ">Never worry about losing valuable data again. ICP Protector offers robust database backup solutions, giving you peace of mind in case of unexpected emergencies. Your data is securely stored and readily accessible whenever you need it.</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <img src={logo} alt="Product screenshot" className="w-[24rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
                    </div>
                </div>
            </div>
            

            <section className="section2 flex h-[60vh] flex-col items-center justify-center">
                <div className="section2-line titleLinear mb-[30px] max-w-[1120px] text-[32px] leading-[50px] text-[#000] md:mb-0 md:h-[170px] md:text-[64px] md:leading-[70px] dark:text-white" >When we stick together, we can build a safer environment for everyone.</div>
            </section>
        </>
    );
};

export default WhitePaperContent;
