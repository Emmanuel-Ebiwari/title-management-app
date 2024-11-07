import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { createTitle, deleteTitles } from "@/services/titles";
import useSWR from "swr";
import { baseUrl } from "@/utils";
import { useAuthState } from "@/context/AuthContext";
import TitleForm from "./TitleForm";
import TitleList from "./TitleList";
import { useRouter } from "next/router";

interface Title {
    id: string;
    title: string;
    description: string;
}

const TitleManagement: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTitle, setCurrentTitle] = useState<Title | null>(null);
    const { data: titles, error, mutate } = useSWR(`${baseUrl}/title/`);
    const { walletInfo } = useAuthState();

    const handleCreateOrUpdate = async (title: Title) => {
        try {
            if (!currentTitle) {
                await createTitle(title);
                mutate();
            }
            setIsModalOpen(false);
            setCurrentTitle(null);
        } catch (error) {
            console.log({ error });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTitles(id);
            mutate();
        } catch (error) {
            console.log({ error });
        }
    };

    const openEditModal = (title: Title) => {
        setCurrentTitle(title);
        setIsModalOpen(true);
    };

    const DisplayData: FC = () => {
        const router = useRouter();
        if (error) {
            return (
                <div className="text-center py-12">
                    <h2 className="text-3xl font-semibold text-red-400 mb-4">
                        An Error Occured
                    </h2>
                    <p className="text-red-300 mb-8">
                        {error?.status === 401
                            ? "You are Unauthorized to use this service"
                            : "Check if your network connection is stable"}
                        {error?.status === 401 && (
                            <>
                                <br />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-black bg-white mt-7"
                                    onClick={() => router.push("/signin")}
                                >
                                    Log In
                                </Button>
                            </>
                        )}
                    </p>
                </div>
            );
        }

        return (
            <TitleList
                titles={titles}
                openEditModal={openEditModal}
                handleDelete={handleDelete}
            />
        );
    };

    return (
        <div className="min-h-screen p-4 md:p-8 w-full bg-[#111827]">
            <div className="max-w-5xl mx-auto mt-20">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-50 ">
                        Title Management
                    </h1>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                disabled={!walletInfo?.isConnected}
                                onClick={() => setCurrentTitle(null)}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="mr-2 h-4 w-4" /> Add New Title
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle className="text-black">
                                    {currentTitle
                                        ? "Edit Title"
                                        : "Create New Title"}
                                </DialogTitle>
                                <DialogDescription>
                                    {currentTitle
                                        ? "Edit the details of your title."
                                        : "Add a new title to your collection."}
                                </DialogDescription>
                            </DialogHeader>
                            <TitleForm
                                title={currentTitle}
                                onSave={handleCreateOrUpdate}
                                onCancel={() => setIsModalOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </header>
                {walletInfo.isConnected ? (
                    <DisplayData />
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-3xl font-semibold text-gray-500 mb-4">
                            Wallet Not Connected
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Connect your wallet to view/create your titles
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TitleManagement;
