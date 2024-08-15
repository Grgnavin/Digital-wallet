import { Card } from "@repo/ui/card"

type Transfer = {
    amount: number;
    timestamp: string; // Assuming timestamp is a string from the API
};

export const TransferHistory = ({
    transfer
} : {
    transfer: Transfer[]
}) => {
    if (!transfer.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions...
            </div>
        </Card>
    }
    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transfer.map((x, index) => {
                    // Convert timestamp string to Date object
                    const date = new Date(x.timestamp);
                    return (
                        <div key={index} className="flex justify-between">
                            <div>
                                <div className="text-sm">Send NPR</div>
                                <div className="text-slate-600 text-xs">
                                    {date.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                + Rs {x.amount / 100}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
} 
