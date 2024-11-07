const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 w-full">
            <div className="container mx-auto px-4">
                {/* <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">TitleChain</div>
          <div className="space-x-4">
            <Button variant="link" className="text-white">
              Sign Up
            </Button>
            <Button variant="link" className="text-white">
              Log In
            </Button>
          </div>
        </div> */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <a href="#" className="hover:underline">
                        Terms of Service
                    </a>
                    {" | "}
                    <a href="#" className="hover:underline">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
