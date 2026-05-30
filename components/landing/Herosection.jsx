import Link from 'next/link';
const video1 = "";
const video2 = "";
// Add your background video here

const Herosection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg: w-full relative overflow-hidden">
      {/* Background Video Section */}
      <div className="relative w-full h-auto ">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-screen h-full object-cover"
        >
          <source src="/landback.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative flex flex-col items-center text-white py-20 px-4 lg:px-20">
          <h1 className="text-4xl text-black sm:text-6xl lg:text-7xl text-center tracking-wide">
            Empowering Minds,
            <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
              {" "} 
              Shaping Futures
            </span>
          </h1>
          <p className="mt-10 text-lg text-center text-neutral-600 max-w-4xl">
            Unlock your potential with Equiskill-AI! Our innovative platform offers engaging courses that inspire creativity
            and critical thinking. Join our community today and turn your learning into real-world skills!
          </p>
          <div className="flex justify-center my-10 gap-6">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start for free
            </Link>
            <a
              href="https://drive.google.com/file/d/122dW2aeyuRYIDkj-1vAR_3ueqPm0cFyP/view?usp=drive_link" target="_blank"
              className="bg-white text-blue-600 font-medium py-3 px-8 rounded-full shadow-md border border-blue-100 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
