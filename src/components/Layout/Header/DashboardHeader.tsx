import React, { useState, useCallback, FC } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown } from "lucide-react";
import Web3 from "web3";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "@/context/AuthContext";
import Link from "next/link";
import { toast } from "sonner";

const DashboardHeader: FC = () => {
    // const [isConnected, setIsConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // const [ethBalance, setEthBalance] = useState<string>("");
    // const [accountId, setAccountId] = useState<string>("");
    const { logoutUser, saveWalletInfo, walletInfo } = useAuthState();
    const { ethBalance, isConnected, accountId } = walletInfo;

    const detectCurrentProvider = useCallback(() => {
        let provider;
        // @ts-expect-error: subside "Property does not exist on type 'Window & typeof globalThis" error
        if (window.ethereum) {
            // @ts-expect-error: subside "Property does not exist on type 'Window & typeof globalThis" error
            provider = window.ethereum;
            // @ts-expect-error: subside "Property does not exist on type 'Window & typeof globalThis" error
        } else if (window.web3) {
            // @ts-expect-error: subside "Property does not exist on type 'Window & typeof globalThis" error
            provider = window.web3.currentProvider;
        } else {
            toast.info(
                "Non-ethereum browser detected, you should install Metamask browser extension",
            );
            // console.log(
            //     "Non-ethereum browser detected, you should install Metamask browser extension",
            // );
        }
        return provider;
    }, []);

    const onConnect = useCallback(async () => {
        try {
            setLoading(true);
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({
                    method: "eth_requestAccounts",
                });
                const web3 = new Web3(currentProvider);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                const ethBalance = await web3.eth.getBalance(account);
                saveWalletInfo({
                    accountId: account,
                    ethBalance: web3.utils.fromWei(ethBalance, "ether"),
                    isConnected: true,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [detectCurrentProvider, saveWalletInfo]);

    const onDisconnect = useCallback(() => {
        saveWalletInfo({
            accountId: "",
            ethBalance: "",
            isConnected: false,
        });
    }, [saveWalletInfo]);

    return (
        <header className="bg-white shadow-sm w-full">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    <Link href={"/"}>TitleChain</Link>
                </div>
                <div>
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="default"
                        onClick={logoutUser}
                        className="mr-5 "
                    >
                        Log Out
                    </Button>
                    {!isConnected ? (
                        <Button
                            disabled={loading}
                            size="default"
                            onClick={onConnect}
                        >
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            CONNECT WALLET
                        </Button>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="text-black"
                                >
                                    {accountId.slice(0, 6)}...
                                    {accountId.slice(-4)}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuItem className="flex flex-col items-start">
                                    <span className="font-semibold">
                                        Balance:
                                    </span>
                                    <span>
                                        {parseFloat(ethBalance).toFixed(4)} ETH
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex flex-col items-start">
                                    <span className="font-semibold">
                                        Account:
                                    </span>
                                    <span className="truncate w-full">
                                        {accountId}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={onDisconnect}
                                    className="text-red-600 cursor-pointer hover:text-red-500"
                                >
                                    Disconnect
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default DashboardHeader;
