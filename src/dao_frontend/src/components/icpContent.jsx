import React from 'react';
import icp7 from '/icp7.webp';
import icpContent from '/icpContent.jpeg';
import above_footer from '/ab_footer.png';
import { Shield, Users, Calendar, ChevronRight, ShieldCheck } from 'lucide-react'

const IcpContent = () => {

    return (
        <>
            <main className="container mx-auto px-4 py-16 md:w-[1120px]">
                <h1 className="text-4xl md:text-6xl dark:text-white font-bold mb-8 text-center">About ICP Protector</h1>
                <section className="text-center pb-20">
                    <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-300">
                        Be part of the community that's making the ICP ecosystem safer and more transparent.
                    </p>
                    <div className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-900 cursor-pointer text-lg font-semibold inline-block">
                        Connect Wallet to Join
                    </div>
                </section>
                <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl mb-12 rounded-lg">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-center mb-6">
                            <Shield className="w-16 h-16 text-orange-500 dark:text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center dark:text-white">Our Mission</h2>
                        <p className="text-lg mb-6 dark:text-white">
                            ICP Protector is a noble group composed of multiple mostly anonymous members that decided to come together to expose the growing number of scams appearing in the ICP ecosystem and Twitter community (the biggest ICP Community at the time of writing).

                            We believe that many of the scams and bad actors in the community are harming the ecosystem and slowing its growth while creating distrust. Our goal is to shine light on the darkness and make a positive difference in the community.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-lg">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-center mb-6">
                                <Users className="w-12 h-12 text-orange-500 dark:text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center  dark:text-white">Our Team</h2>
                            <p className="text-lg mb-4  dark:text-white">
                                Most members have been a part of ICP since or shortly after genesis and contribute to the cause in our free time. We are decentralized in the way we operate, and each contributes at our own pace.
                            </p>
                            <p className="text-lg  dark:text-white">
                                After doing extensive research and following many leads, we started to put together evidence to expose some of the pump and dump or rugpull coins and NFTs being promoted on Twitter.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-lg">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-center mb-6">
                                <Calendar className="w-12 h-12 text-orange-500 dark:text-white" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center  dark:text-white">Our Journey</h2>
                            <p className="text-lg mb-4  dark:text-white">
                                Discussions began in early 2023 on how best to try to eliminate or reduce the growing problem of scams, fraudsters, ruggers, general bad practices, and taking advantage of others.
                            </p>
                            <p className="text-lg  dark:text-white">
                                Forward to 2024, after deep investigations & a successful track record, the group started to think of other ways of improving the ecosystem without having to solely rely on a web2 platform like Twitter (X).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-800/90 shadow-xl mb-12 rounded-lg">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center justify-center mb-6">
                            <ShieldCheck className="w-12 h-12 text-orange-500 dark:text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center dark:text-white">Our Impact</h2>
                        <p className="text-lg mb-6  dark:text-white">
                            As traction was gained, we started receiving many DMs from ICP community members appreciating what we were doing and also contributing with information and leads. ICPProtector has been steadily growing with the help of the community.

                            We decided to try to create a safer and more transparent environment for the whole ecosystem by forming the ICP Protector DAO. We all deeply care about ICP and put the time in to investigate and expose any clear threats to the ICP Community.
                        </p>
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

export default IcpContent;
