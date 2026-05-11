import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 text-sm text-zinc-600">
            AI-Powered Accessible Communication
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl">
            Bridging
            <span className="bg-gradient-to-r from-[oklch(62.3%_0.214_259.815)] to-[oklch(78.9%_0.154_211.53)] bg-clip-text text-transparent">
              {" "}Speech & Sign Language{" "}
            </span>
            in Real Time
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base md:text-xl text-zinc-600 max-w-3xl leading-relaxed">
            SignBridge enables seamless communication between deaf and speaking users using AI-powered sign recognition, live captions, and real-time translation.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-5 mt-8 md:mt-12">
            <button className="gradient-button px-8 py-4 font-semibold">
              Create Meeting
            </button>

            <button className="px-8 py-4 rounded-[18px] border border-zinc-300 bg-white hover:bg-zinc-100">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
