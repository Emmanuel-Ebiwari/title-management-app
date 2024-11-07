import React from "react";
import { Button } from "@/components/ui/button";
import {
    ShieldCheck,
    LayoutDashboard,
    Link as LinkIcon,
    Lock,
    // ArrowRight,
} from "lucide-react";
import { useRouter } from "next/router";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {number}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const LandingPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Manage Your Digital Titles with Blockchain Security
                    </h1>
                    <p className="text-xl mb-8">
                        Secure, transparent, and efficient title management for
                        the digital age
                    </p>
                    <div className="space-x-4">
                        <Button
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => router.push("/signup")}
                        >
                            Sign Up Now
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-white border-white hover:bg-gray-800 hover:text-white"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-black">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={
                                <ShieldCheck className="w-12 h-12 text-blue-600" />
                            }
                            title="Secure Ownership Verification"
                            description="Leverage blockchain technology for tamper-proof title records"
                        />
                        <FeatureCard
                            icon={
                                <LayoutDashboard className="w-12 h-12 text-blue-600" />
                            }
                            title="Easy-to-use Dashboard"
                            description="Manage all your digital titles from one intuitive interface"
                        />
                        <FeatureCard
                            icon={
                                <LinkIcon className="w-12 h-12 text-blue-600" />
                            }
                            title="Blockchain Integration"
                            description="Seamlessly connect with major blockchain networks for enhanced security"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-black">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StepCard
                            number="1"
                            title="Create"
                            description="Sign up and create your digital title with ease"
                        />
                        <StepCard
                            number="2"
                            title="Manage"
                            description="Update and track your titles through our secure dashboard"
                        />
                        <StepCard
                            number="3"
                            title="Verify"
                            description="Instantly verify ownership with blockchain-backed proof"
                        />
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4 text-black">
                        Decentralized Security
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto text-black">
                        Your data is protected by cutting-edge blockchain
                        technology, ensuring unparalleled security and
                        transparency in title management.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
