import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Head from 'next/head';
import styles from '../styles/home.module.css';
import Image from 'next/image';
import Logo from "/public/logo-2.png";
import Inu from "/public/inu-img.png";
import HODLHoneyMustard from "/public/hodl-honey-mustard.png";
import WhaleWanch from "/public/whale-wanch.png";
import CountUp from 'react-countup';
import PaperHandsPoly from "/public/paper-hands-poly.png";
import DiamondHandsSS from "/public/diamond-hands-ss.png";
import TwitterFeed from "/components/TwitterFeed";
import TokenHolders from "/components/utils/TokenHolders";
import FOMOBBQ from "/public/fomo-bbq.png";

const ScrollTrigger = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
    }
  }, [inView, delay]);

  return (
    <div ref={ref} className={`scroll-trigger ${isVisible ? 'visible' : ''}`} style={{ '--wiggle-delay': `${delay}s` }}>
      {children}
    </div>
  );
};

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const targetCount = 467;
  const maxCount = 5000;
  const progressPercentage = (targetCount / maxCount) * 100;

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [progressVisible, setProgressVisible] = useState(false);

  const songs = [
    { src: '/theme.mp3', title: 'Nuggie Inu Type', artist: 'Nuggie Inu' },
    { src: 'hug-jug.mp3', title: 'Hug JugChug Jug With You', artist: 'Leviathan' },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => setCurrentSong((currentSong + 1) % songs.length);
  const prevSong = () => setCurrentSong((currentSong - 1 + songs.length) % songs.length);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setPosition({
      x: (clientX - window.innerWidth / 2) / 50,
      y: (clientY - window.innerHeight / 2) / 50,
    });
  };


  useEffect(() => {
    if (inView) {
      setProgressVisible(true);

      const fetchData = async () => {
        const result = await TokenHolders();
        setCount(result);

      };

      fetchData();
    }
  }, [inView]);

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      <Head>
        <title>Nuggie Inu - A Crypto Project You Can Sink Your Teeth Into</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen relative overflow-hidden">
        <nav className="z-10 w-full border-b-2 border-neutral-50 border-opacity-20 px-4 fixed backdrop-blur-xl z-30">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between w-full items-center">
              <div className="py-4">
                <Image className="w-[130px] md:w-[169px] h-auto" src={Logo} alt="Nuggie Inu Logo" width={169} height={110.5} />
              </div>
              <div className="flex gap-2 md:gap-8">
                <button className="flex fill-cyan-400 text-[#A9FAFF] items-center gap-1 uppercase font-medium text-xs"><svg className="w-4" fill="#A9FAFF" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>Telegram</button>
                <button className="bg-white bg-opacity-10 p-2 px-4 rounded-2xl text-sm md:text-base font-bold text-neutral-50 hover:bg-opacity-100 transition-colors group hover:text-neutral-800"><span className="text-neutral-400 group-hover:text-neutral-700">Buy</span> $NuggieInu</button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-screen-xl mx-auto h-dvh min-h-[450px] md:min-h-[860px] flex items-center overflow-hidden">
          <div className="bg-blue-800 filter blur-3xl w-[800px] h-[800px] rounded-full absolute opacity-40 -translate-x-44"></div>

          <div className="flex flex-col items-start gap-4 md:gap-12 z-10 relative ml-4 pt-40 px-4">
            <h1 className="text-neutral-300 font-bold text-3xl md:text-6xl max-w-3xl leading-none md:tracking-tighter">
              <ScrollTrigger delay={0}>
                <span className="text-4xl md:text-8xl -mb-5 md:-mb-8 block text-neutral-50">Finally...</span>
              </ScrollTrigger>

              <ScrollTrigger delay={0.3}>
                <span>
                  <br /> Finally, a Crypto Project You Can Sink Your Teeth Into{" "}
                  <span
                    className="text-neutral-100 color-cycle"
                    style={{
                      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                      perspective: "600px",
                      textShadow: "3px 3px 5px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.3)",
                      transformStyle: "preserve-3d",
                      transition: "transform 0.2s ease-out",
                    }}
                  >
                    $NuggieInu
                  </span>
                </span>
              </ScrollTrigger>
            </h1>

            <ScrollTrigger delay={0.6}>
              <p className="text-orange-300 text-xl md:text-2xl font-bold">Join the Nuggie Inu fam today!</p>
            </ScrollTrigger>

            <ScrollTrigger delay={0.9}>
              <button className="bg-neutral-50 inline-block text-xl md:text-4xl font-bold p-5 md:p-7 rounded-full text-neutral-700 hover:bg-orange-300 hover:underline hover:rotate-1 transition-colors active:scale-[.98]">
                Buy <span className="text-neutral-800">$</span>Nuggie<span className="text-neutral-800">Inu</span>
              </button>
            </ScrollTrigger>

            {/* Music Player */}
            <div className="mt-8 text-center">
              <audio ref={audioRef} loop />
              <div className="flex items-center justify-center gap-4">
                <button onClick={prevSong}>⏮️</button>
                <button onClick={playPauseHandler}>{isPlaying ? '⏸️' : '▶️'}</button>
                <button onClick={nextSong}>⏭️</button>
              </div>
              <div className="mt-4">
                <div className={`flex gap-1 justify-center music-player-bars ${isPlaying ? 'playing' : ''}`}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{ height: `${6 + i * 3}px` }} />
                  ))}
                </div>
              </div>
              <div className="text-white mt-2">
                {songs[currentSong].title} by {songs[currentSong].artist}
              </div>
            </div>
          </div>

          {/* Inu Image with CSS Animation */}
          <div className="bg-red-800 filter blur-3xl w-[800px] h-[800px] rounded-full absolute opacity-40  right-0 -translate-y-10 translate-x-96"></div>
          <div
            className="inu-image-container inu-animation absolute right-0"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <Image className="opacity-30 md:opacity-100 z-10 relative" src={Inu} alt="Nuggie Inu" width={507} height={597.5} />
          </div>
        </div>

        <div className="border-b-2 border-neutral-50 border-opacity-20 w-full"></div>

        <div className="max-w-screen-xl mx-auto flex justify-between py-8 md:py-14 flex-wrap px-4">
          <div className="bg-green-800 filter blur-3xl w-[800px] h-[800px] rounded-full absolute left-1/2 -translate-y-24 transform -translate-x-1/2 opacity-40"></div>

          <div className="flex flex-wrap xl:justify-between w-full gap-9 items-center">
            <ScrollTrigger delay={0}>
              <h3 className="text-orange-300 text-2xl font-bold z-10 relative wiggle" style={{ '--wiggle-delay': '0s' }}>
                OWNERSHIP RENOUNCED.
              </h3>
            </ScrollTrigger>

            <ScrollTrigger delay={0.3}>
              <h3 className="text-orange-300 text-2xl font-bold z-10 relative wiggle" style={{ '--wiggle-delay': '0.3s' }}>
                0% BUY SELL TAX.
              </h3>
            </ScrollTrigger>

            <ScrollTrigger delay={0.6}>
              <h3 className="text-orange-400 text-3xl md:text-5xl  font-bold z-10 relative wiggle" style={{ '--wiggle-delay': '0.6s' }}>
                NO B.S, LETS MOON IT!
              </h3>
            </ScrollTrigger>
          </div>

          {/* Nuggie Meter Section */}
          <div className="max-w-full w-full md:max-w-screen-xl mx-auto mt-8 md:mt-20" ref={ref}>
            <ScrollTrigger delay={0}>
              <h4 className="text-3xl -mb-5 sm:text-3xl md:text-5xl  md:-mb-4 xl:-mb-8 md:text-6xl xl:text-8xl text-nowrap tracking-widest text-center text-neutral-50 opacity-15 font-bold w-full">
                THE NUGGIE METER!
              </h4>
            </ScrollTrigger>

            <div className="relative w-full bg-neutral-700 h-10 rounded-full mt-4">
              <div
                className={`absolute top-0 left-0 h-full border border-orange-400 rounded-full progress-bar ${progressVisible ? 'visible' : ''}`}
                style={{ '--progress-percentage': `${progressPercentage}%`, background: 'linear-gradient(to right, transparent 0%, #E29C19 100%)' }}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center text-md md:text-2xl text-white z-10 font-bold tracking-widest ${progressVisible ? 'visible' : ''}`}
                style={{ opacity: progressVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
              >
                <CountUp duration={50} end={count} />/{maxCount} NUGGIE MUCHERS
              </span>
            </div>
          </div>
        </div>

        {/* Buy the Dips Section */}
        <div className="max-w-screen-xl mx-auto pt-8 md:py-16 relative z-10 pb-0">
          <ScrollTrigger delay={0}>
            <div className="flex flex-wrap px-4 items-center gap-10">
              <h3 className="text-3xl md:text-5xl  font-bold text text-neutral-50">BUY <span className="text-neutral-300">THE</span> DIPS</h3>
              <p className="text-neutral-400 font-bold text-1xl">No, you can’t literally buy THESE dips... but you can buy Nuggie Inu’s dips!</p>
            </div>
          </ScrollTrigger>

          <div className="flex flex-wrap gap-12 mt-8 justify-around flex-wrap px-4">
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3">
                <Image src={HODLHoneyMustard} alt="HODL Honey Mustard" width={177} height={170} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:md:w-[177px] text-center"><span className="text-yellow-400">HODL</span> Honey Mustard</p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3">
                <Image src={FOMOBBQ} alt="Fomo BBQ" width={177} height={170} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[177px] text-center">FOMO<span className="text-orange-500"> BBQ</span></p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3">
                <Image src={WhaleWanch} alt="Whale Wanch" width={177} height={170} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[177px] text-center"><span className="text-blue-200">Whale</span> Wanch</p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3">
                <Image src={PaperHandsPoly} alt="Paper Hands Polynesian" width={177} height={170} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[177px] text-center">Paper Hands<span className="text-[#FF3D00]"> Polynesian</span></p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3">
                <Image src={DiamondHandsSS} alt="Diamond Hands Secret Sauce" width={177} height={170} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[177px] text-center">Diamond Hands <span className="text-[#5CCEFF]"> Secret Sauce</span></p>
              </div>
            </ScrollTrigger>
          </div>


          <div className="mt-24 px-4 relative">
            <div className="bg-yellow-800 filter left-1/2 top-0 -translate-x-1/2  blur-3xl w-[800px] h-[800px] rounded-full absolute opacity-40"></div>
            <h3 className="text-3xl md:text-5xl  font-bold text text-neutral-50 mb-3 z-10 relative">WHAT <span className="text-neutral-300">THE</span> NUGGIE IS UP?</h3>
            <TwitterFeed />
          </div>

          <footer className="py-7 px-4 bg-neutral-800 mt-4 rounded-2xl opacity-70">
            <p className="text-neutral-100 text-center">Copyright © 2024 Nuggie Inu</p>
          </footer>
        </div>
      </main>
    </div>
  );
}