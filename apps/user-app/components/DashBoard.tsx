import { Card } from '@repo/ui/card'
import React from 'react'
import { GetName } from '../app/lib/actions/getUserDetails'
import { getBalance } from '../app/(dashboard)/transfer/page';
import { TransferMoney } from '../app/lib/actions/onClickforDashboard';

const DashBoard =async () => {
    const user = await GetName();
    const balance = await getBalance();
    const username = user?.userDetails?.name;
    
    return (
        <div className="w-full p-4">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold text-center">
                WELCOME TO THE DIGITAL WALLET
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Left Section - Account Balance and User Greeting */}
                <div className="col-span-2">
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <Card title={`Good Morning, ${username}`}>
                                <div className="text-2xl font-semibold pt-2">
                                    {`Your Balance: NPR ${balance.amount / 100}`}
                                </div>
                                <div className="pt-4">
                                    {/* Quick Actions */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <button className="bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700"
                                        onClick={TransferMoney}>
                                            Transfer Money
                                        </button>
                                        <button className="bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700">
                                            See Transactions
                                        </button>
                                        <button className="bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700">
                                            Load Money
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Right Section - Offers and Ads */}
                <div className="col-span-1">
                    <div className="h-full flex flex-col">
                        <div className="flex-1">
                            <Card title="Exclusive Offers">
                                <div className="space-y-4">
                                    <div className="bg-yellow-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">10% Cashback on Transfers!</h3>
                                        <p className="text-sm">Use code <strong>WALLET10</strong> on your next transfer.</p>
                                    </div>
                                    <div className="bg-pink-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">Special Savings Offer</h3>
                                        <p className="text-sm">Save more with our new saving plans. <a href="#" className="text-blue-700 underline">Learn more</a></p>
                                    </div>
                                    <div className="bg-blue-300 p-4 rounded-lg shadow-md">
                                        <h3 className="font-bold text-lg">Refer a Friend</h3>
                                        <p className="text-sm">Earn NPR 500 for every friend you refer who signs up.</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section - Recent Transactions */}
            <div className="mt-8">
                <Card title="Recent Transactions">
                    <div className="text-lg font-medium">
                        {/* Placeholder for recent transactions */}
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>Payment to ABC Store</span>
                                <span>- NPR 1500</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Received from XYZ</span>
                                <span>+ NPR 2000</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Transfer to John Doe</span>
                                <span>- NPR 500</span>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashBoard