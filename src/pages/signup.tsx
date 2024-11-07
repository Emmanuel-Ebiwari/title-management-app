import SignupForm from "@/components/Auth/Signup";

export default function SignupPage() {
    return (
        <main className="py-10 min-h-screen flex justify-center items-center w-full mx">
            <section className="container py-10 h-full mx">
                <SignupForm />
            </section>
        </main>
    );
}
