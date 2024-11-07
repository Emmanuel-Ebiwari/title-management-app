import SigninForm from "@/components/Auth/Signin";

export default function SigninPage() {
    return (
        <main className="py-10 min-h-screen flex justify-center items-center w-full mx">
            <section className="container py-10 h-full mx">
                <SigninForm />
            </section>
        </main>
    );
}
