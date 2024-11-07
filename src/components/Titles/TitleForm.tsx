/* eslint-disable import/no-unresolved */
import { FC, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

interface Title {
    id: string;
    title: string;
    description: string;
}

interface TitleFormProps {
    title: Title | null;
    onSave: (title: Title) => void;
    onCancel: () => void;
}

const TitleForm: FC<TitleFormProps> = ({ title, onSave, onCancel }) => {
    const [name, setName] = useState(title?.title || "");
    const [description, setDescription] = useState(title?.description || "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave({ id: title?.id || "", title: name, description });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Title Name
                </label>
                <Input
                    id="title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 text-black"
                />
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 text-black"
                />
            </div>
            <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    className="text-black"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Save
                </Button>
            </DialogFooter>
        </form>
    );
};

export default TitleForm;
