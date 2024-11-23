import React from 'react';
import icp7 from '/icp7.webp';
import icpContent from '/icpContent.jpeg';
import above_footer from '/ab_footer.png';
import { Shield, Users, Calendar, ChevronRight, ShieldCheck } from 'lucide-react'

const IcpContent = () => {

    return (
        <>
            <main className="container mx-auto px-4 py-16 md:w-[1120px]">
                <div className="bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-xl mb-12">
                    <div className="p-8">
                        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white mb-6">
                            About ICP Protector
                        </h1>
                        <section className="text-center mb-12">
                            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
                                Be part of the community that's making the ICP ecosystem safer and more transparent.
                            </p>
                            <button className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium text-lg transition hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500">
                                Connect Wallet to Join
                            </button>
                        </section>
                        <div className="flex flex-col items-center text-center mb-10">
                            <Shield className="w-16 h-16 text-orange-500 dark:text-white mb-4" />
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                                Our Mission
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">
                                ICP Protector is a noble group composed of multiple mostly anonymous members who have come together to expose the growing number of scams appearing in the ICP ecosystem and Twitter community.
                                <br />
                                <br />
                                We believe that many of the scams and bad actors in the community harm the ecosystem, slow its growth, and create distrust. Our goal is to shine a light on the darkness and make a positive difference in the community.
                            </p>
                        </div>
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
