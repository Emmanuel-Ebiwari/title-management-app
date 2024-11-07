/* eslint-disable import/no-unresolved */
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Title {
    id: string;
    title: string;
    description: string;
}

type TitleListProps = {
    titles: Title[];
    handleDelete: (id: string) => Promise<void>;
    openEditModal: (title: Title) => void;
};

const TitleList: FC<TitleListProps> = ({
    titles,
    openEditModal,
    handleDelete,
}) => {
    return (
        <>
            {titles && titles?.length === 0 && (
                <div className="text-center py-12">
                    <h2 className="text-3xl font-semibold text-gray-500 mb-4">
                        No Titles Created Yet
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Get started by creating your first title!
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {titles &&
                    titles?.map((title: Title) => (
                        <div
                            key={title.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-black">
                                    {title.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {title.description}
                                </p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-black"
                                    onClick={() => openEditModal(title)}
                                >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(title.id)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default TitleList;
