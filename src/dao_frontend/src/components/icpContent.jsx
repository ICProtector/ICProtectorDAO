import React, { useState, useEffect } from 'react';
import icp7 from '/icp7.webp';
import icpContent from '/icpContent.jpeg';
import above_footer from '/ab_footer.png';
import { useTheme } from '../contexts/ThemeContext';
const IcpContent = () => {

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
            <div>
                <div className="relative isolate px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-20 sm:py-20 lg:py-26">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-6xl">All about ICP Protector</h1>
                            <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-900">
                                ICP Protector is a noble group composed of multiple mostly anonymous members that decided to come together to expose the growing number of scams appearing in the ICP ecosystem and twitter community (the biggest ICP Community at the time of writing). Discussions began in early 2023 on how best to try to eliminate or reduce the growing problem of scams, fraudsters, ruggers, general bad practices, and taking advantage of others. We each believe that many of the scams and bad actors in the community are harming the ecosystem and slowing its growth while creating distrust.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section7 p-3">
                <div className="mx-auto flex h-full flex-col items-start justify-center md:w-[1120px] md:flex-row md:items-center">

                    <div className="section7-line mx-[15px] mt-[20px] text-center text-[#000] md:mt-0 md:w-[70%] md:pl-[40px] md:text-left" style={myStyle}>
                        <div className="mt-[20px] text-lg  dark:text-white">After noticing that there were more frequent scams and some well known ICP twitter accounts involved with promoting them, the founders of ICP Protector with their common goal of shining some light on the darkness, came together to form the ICPProtector twitter account. A group chat on Twitter & Openchat was started to track the scammers, compile evidence, and create a reports to inform the ICP Community.  Most members have been a part of ICP since or shortly after genesis and contribute to the cause on our free time to try to make a positive difference in the community. We are decentralized in the way we operate and each contributes at our own pace, so each member can post on the twitter at any time. After doing extensive research and following many of the leads, we started to put together evidence to expose some of the pump and dump or rugpull coins and NFTs being promoted on twitter. As traction was gained, we started receiving many DM’s from ICP community members appreciating what we were doing and also contributing with information and leads. ICPProtector has been steadily growing with the help of the community.</div>
                    </div> <div className="section7-img mx-auto flex items-center justify-center md:ml-0 md:w-[50%] md:justify-end" style={myStyle}>
                        <div className="flex items-center justify-center w-[100%] h-[100%] md:w-full">
                            <img src={icp7} className="w-[100%] h-[100%] md:w-full" alt="" />
                        </div>

                    </div>
                </div>
            </section>

            <section className="section10 flex flex-col items-center justify-center pt-[50px] md:h-[100vh] md:items-start md:pt-0">
                <div className="section10-line1 mx-[15px] items-center justify-center rounded-[30px] bg-[#fff] dark:bg-gray-950 dark:border-2 dark:border-white p-[20px] md:mx-auto md:flex md:w-[1120px] md:p-[50px]" style={myStyle}>
                    <div className="flex flex-1 flex-col items-center justify-center md:w-[50%] md:items-start md:text-left">
                        <div className="w-full">
                            <div className="text-left text-[16px] leading-[24px] text-[#000] md:text-[20px] md:leading-[30px] dark:text-white">Forward to 2024 after deep investigations & a successful track record, the group started to think of other ways of improving the ecosystem without having to solely rely on a web2 platform like twitter (X). Since the ICP Community is small (around 2000 active members) but growing, the group discussed the next step in their journey to help protect the community. It was decided to try to create a safer and more transparent environment for the whole ecosystem by forming the ICP Protector DAO. We all deeply care about ICP and put the time in to investigate and expose any clear threats to the ICP Community. We are here to protect your ICP from malicious people who target our ecosystem!</div>
                        </div>
                    </div>
                    <div className="mt-[30px] flex w-full items-center justify-center md:ml-[5%] md:mt-0 md:w-[40%]">
                        <img src={icpContent} className="" alt="" />
                    </div>
                </div>
            </section>
            <div className="overflow-hidden py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-center w-[20%] h-[20%] sm:w-full"> 
                    <img src={above_footer} alt="" style={{ width: '60%' }} /></div>
                </div>
            </div>
        </>
    );
};

export default IcpContent;
