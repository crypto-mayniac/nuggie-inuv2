import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Head from 'next/head';
import styles from '../styles/home.module.css';
import Image from 'next/image';
import Logo from "/public/logo-2.png";
import Inu from "/public/inu-img.png";
import HODLHoneyMustard from "/public/hodl-honey-mustard2.png";
import WhaleWanch from "/public/whale-wanch2.png";
import CountUp from 'react-countup';
import PaperHandsPoly from "/public/paper-hands-poly2.png";
import { Play, StepBack, StepForward, Pause } from 'lucide-react';
import { Tooltip } from 'react-tooltip'
import NotificationListener from '../components/NotificationListener';
import DiamondHandsSS from "/public/diamond-hands-ss2.png";
import TwitterFeed from "/components/TwitterFeed";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Countdown from 'react-countdown';
import { formatInTimeZone } from "date-fns-tz";
import FOMOBBQ from "/public/fomo-bbq2.png";


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

const TimerComponent = () => {
  const targetTimezone = "America/Denver";
  const targetTime = "2024-11-28T14:30:00"; // 4 PM Denver time

  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const formattedTargetTime = formatInTimeZone(targetTime, targetTimezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
    setEndTime(new Date(formattedTargetTime));
  }, [targetTime, targetTimezone]);

  if (!endTime) return null;

  // Custom renderer to format the countdown display
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span className="text-orange-400">
          {String(hours).padStart(2, "0")}:
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </span>
      );
    }
  };

  return (
    <div>
      <Countdown date={endTime} renderer={renderer} />
      <span className="md:text-3xl text-xl ml-4 tracking-wide text-orange-300">Until Launch</span>
    </div>
  );
};


const Modal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative w-9/12 m:w-2/5">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-lg"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">Nuggie Inu has <span className="text-orange-400 underline">NOT</span> launched yet!</h2>
      <p className="text-gray-300">
        Beware of fake and impersonating coins, an official announcement will be made on Telegram and here when we're live! <a className="text-blue-300 hover:underline" href="https://t.me/NuggieInuPortal">Telegram Link</a>
      </p>
      <button onClick={onClose} className="bg-neutral-50 mt-4 inline-block text-base font-bold p-3 rounded-full text-neutral-700 hover:bg-orange-300 hover:underline hover:rotate-1 transition-colors active:scale-[.98]">
        OK Thanks!
      </button>
    </div>
  </div >
);

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [memberCount, setMemberCount] = useState(null);
  const audioRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const maxCount = 1000;
  const progressPercentage = Math.min((count / maxCount) * 100, 100);

  const specificTime = '2024-11-28 15:00:00'; // 4 PM Mountain Time
  const targetTimezone = 'America/Denver';


  const contractAddress = "Coming Soon...";
  const pumpLink = "http://www.google.ca";

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [progressVisible, setProgressVisible] = useState(false);

  const songs = [
    { src: '/(Intro).wav', title: 'Nuggie Inu Theme', artist: 'Nuggie Inu' },
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

  async function fetchMemberCount() {
    try {
      const response = await fetch("https://tg-member-count-production.up.railway.app/member-count");
      const data = await response.json();
      setMemberCount(data.member_count);
    } catch (error) {
      console.error("Error fetching member count:", error);
    }
  }

  useEffect(() => {
    fetchMemberCount();
    setShowModal(true); // Show modal on page load
  }, []);

  useEffect(() => {
    if (inView) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://xawgeeapi-production.up.railway.app/api/holders');
          const data = await response.json();
          if (data.holdersCount !== undefined) {
            console.log('what we get ? ', data.holdersCount)
            setCount(data.holdersCount);
            setProgressVisible(true);
          } else {
            console.error('Failed to fetch holders count');
          }
        } catch (error) {
          console.error('Error fetching holders count:', error);
        }
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

      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <NotificationListener />

      <main className="min-h-screen relative overflow-hidden">
        <nav className="z-10 w-full border-b-2 border-neutral-50 border-opacity-20 px-4 fixed backdrop-blur-xl z-30">
          <div className="max-w-screen-xl mx-auto w-full">
            <div className="flex justify-between w-full items-center">
              <div className="py-4">
                <Image className="w-[130px] md:w-[169px] h-auto" src={Logo} alt="Nuggie Inu Logo" width={169} height={110.5} />
              </div>
              <div className="flex items-center gap-2 md:gap-8">
                <a href="https://t.me/+i8ZjFaqWznFjYzUx" target="_blank"><button className="flex fill-cyan-400 hover:underline hover:opacity-70 transition-all text-[#A9FAFF] items-center gap-1 uppercase font-medium text-xs"><svg className="w-4" fill="#A9FAFF" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>Telegram</button></a>
                <a className="relative z-10 opacity-35 pointer-events-none" href={pumpLink} target="_blank"><button className="bg-white bg-opacity-10  p-2 px-4 rounded-2xl text-sm md:text-base font-bold text-neutral-50 hover:bg-opacity-100 transition-colors group hover:text-neutral-800"><span className="text-neutral-400 group-hover:text-neutral-700">Buy</span> $NuggieInu</button></a>
              </div>
            </div>
          </div>
          <Tooltip className="relative z-10" id="my-tooltip" />

        </nav>


        <div className="mx-auto h-dvh min-h-[450px] md:min-h-[860px] flex items-center overflow-hidden relative w-full">
          <div className="bg-blue-800 filter blur-3xl w-[800px] h-[800px] rounded-full absolute opacity-40 -translate-x-44"></div>

          <div className="flex flex-col items-start gap-4 md:gap-8 z-10 relative pt-40 px-4 max-w-screen-xl mx-auto w-full">
            <h1 className="text-neutral-300 font-bold text-3xl md:text-6xl max-w-3xl leading-none md:tracking-tighter">
              <ScrollTrigger delay={0}>
                <span className="text-4xl md:text-8xl -mb-5 md:-mb-8 block text-neutral-50">Finally...</span>
              </ScrollTrigger>


              <ScrollTrigger delay={0.3}>
                <span>
                  <br /> A Crypto Project You Can Sink Your Teeth Into{" "}
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

                <div className="mt-10">
                  <TimerComponent targetTime={specificTime} targetTimezone={targetTimezone} />
                </div>

              </ScrollTrigger>
            </h1>

            <ScrollTrigger delay={0.6}>
              {/* <p className="text-orange-300 text-xl md:text-2xl font-bold">Join the Nuggie Fam Today!</p> */}
            </ScrollTrigger>



            <div className="flex border-2 border w-full max-w-[650px]  w-auto justify-between rounded-3xl p-3 border-opacity-15 border-neutral-50 items-center gap-2 overflow-hidden">
              <p className="text-orange-400 font-bold">CA:</p>
              <span
                className="text-neutral-50 opacity-80 font-bold truncate"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'inline-block',
                  maxWidth: 'calc(100% - 120px)', // Dynamically adjust to prevent overlap with the button
                }}
              >
                {contractAddress}
              </span>

              <CopyToClipboard text={contractAddress} onCopy={() => setCopied(true)}>
                <button
                  className="bg-white bg-opacity-10 p-2 px-4 rounded-2xl text-sm md:text-base font-bold text-neutral-50 hover:bg-opacity-100 transition-colors group hover:text-neutral-800"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
            </div>


            <ScrollTrigger delay={0.9}>
              <a className="pointer-events-none" target="_blank" href={pumpLink}>
                <button className="bg-neutral-50 opacity-20 inline-block text-xl md:text-4xl font-bold p-5 md:p-7 rounded-full text-neutral-700 hover:bg-orange-300 hover:underline hover:rotate-1 transition-colors active:scale-[.98]">
                  Buy <span className="text-neutral-800"></span>Nuggie<span className="text-neutral-800"> Inu!</span>
                </button>
              </a>
            </ScrollTrigger>


          </div>


          {/* Music Player */}
          <div className="text-center flex gap-5 fixed left-4 bottom-4 md:bottom-8 md:left-8 p-4 md:p-10 rounded-3xl z-50 bg-neutral-900 bg-opacity-50 backdrop-blur-lg items-center">
            <audio ref={audioRef} loop />
            <div className="flex items-center justify-center gap-4">
              {/* <button disabled className="hover:bg-orange-400 rounded-full py-2 md:p-4 bg-transparent outline-2 outline outline-orange-400 text:neutral-50 text-orange-400 opacity-40 hover:text-neutral-900 transition-colors" onClick={prevSong}><StepBack /></button> */}
              <button className="hover:bg-orange-400 active:scale-95 rounded-full p-2 md:p-4 bg-transparent border-2 border-orange-400 text:neutral-50 text-orange-400 hover:text-neutral-900 transition-colors" onClick={playPauseHandler}>{isPlaying ? <Pause /> : <Play />}</button>
              {/* <button disabled className="hover:bg-orange-400 rounded-full py-2 md:p-4 bg-transparent outline-2 outline outline-orange-400 text:neutral-50 text-orange-400  opacity-40 hover:text-neutral-900 transition-colors" onClick={nextSong}><StepForward /></button> */}
            </div>
            <div>
              <div className={`flex gap-1 justify-center music-player-bars items-center ${isPlaying ? 'playing' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ height: `${6 + i * 3}px` }} />
                ))}
              </div>
            </div>
            <div className="text-white text-left mt-2">
              <span>{songs[currentSong].title}</span>
              <br></br>
              <span className="text-xs uppercase tracking-widest opacity-70">{songs[currentSong].artist}</span>
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

          <div className="w-5 h-8 border-2 border-neutral-50 rounded-xl absolute justify-center bottom-4 left-1/2 transform -translate-x-1/2 hidden md:flex"><div className="h-2 w-[3px] top-1 relative rounded-full bg-neutral-50 scrollDown"></div></div>

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
          <div className="max-w-full w-full md:max-w-screen-xl mx-auto mt-14" ref={ref}>
            <ScrollTrigger delay={0}>
              <h4 className="text-3xl -mb-5 sm:text-3xl md:text-6xl  md:-mb-4 xl:-mb-8 md:text-6xl xl:text-8xl text-nowrap tracking-widest text-center text-neutral-50 opacity-15 font-bold w-full">
                THE NUGGIE METER!
              </h4>
            </ScrollTrigger>

            <div className="relative w-full bg-neutral-700 bg-opacity-60 backdrop-blur-lg h-10 rounded-full mt-4">
              <div
                className={`absolute top-0 left-0 h-full border rounded-full progress-bar rainbow-gradient ${progressVisible ? 'visible' : ''}`}
                style={{
                  '--progress-percentage': `${progressPercentage}%`,
                  width: `${progressPercentage}%`,
                }}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center text-md md:text-2xl text-white z-10 font-bold tracking-widest ${progressVisible ? 'visible' : ''
                  }`}
                style={{ opacity: progressVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
              >
                {count !== null && progressVisible ? (
                  <CountUp duration={2} end={0} />
                ) : (
                  `${count || 0}`
                )}
                /{maxCount} <span className="text-neutral-400 ml-2">NUGGIE MUNCHERS</span>
              </span>
            </div>
          </div>
          <p className="text-neutral-400 opacity-35 text-right w-full mt-2
          ">NuggieInu Unique Holders...</p>

        </div>

        {/* Buy the Dips Section */}
        <div className="max-w-screen-xl mx-auto pt-8 md:py-16 relative z-10 pb-0">
          <ScrollTrigger delay={0}>
            <div className="flex flex-wrap px-4 items-center gap-10">
              <h3 className="text-3xl md:text-5xl  font-bold text text-neutral-50">EAT <span className="text-neutral-300">THE</span> DIPS</h3>
              <p className="text-neutral-400 font-bold text-1xl">No, you can’t literally eat THESE dips... but you can eat Nuggie Inu’s dips!</p>
            </div>
          </ScrollTrigger>

          <div className="flex flex-wrap gap-12 mt-8 justify-around flex-wrap px-4">
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3 -mx-7">
                <Image className="w-[243px] -mb-6 floating  delay-400" src={FOMOBBQ} alt="Fomo BBQ" width={486} height={486} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[179px] text-center">FOMO<span className="text-orange-500"> BBQ</span></p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3 -mx-7">
                <Image className="w-[243px] -mb-6 floating delay-200" src={WhaleWanch} alt="Whale Wanch" width={486} height={486} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[179px] text-center"><span className="text-blue-200">Whale</span> Wanch</p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3 -mx-7">
                <Image className="w-[243px] -mb-6 floating" src={HODLHoneyMustard} alt="HODL Honey Mustard" width={486} height={486} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[179px] text-center"><span className="text-yellow-400">HODL</span> Honey Mustard</p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3 -mx-7">
                <Image className="w-[243px] -mb-6 floating delay-600" src={PaperHandsPoly} alt="Paper Hands Polynesian" width={486} height={486} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[179px] text-center">Paper Hands<span className="text-[#FF3D00]"> Polynesian</span></p>
              </div>
            </ScrollTrigger>
            <ScrollTrigger delay={0}>
              <div className="flex content-center flex-col items-center gap-3 -mx-7">
                <Image className="w-[243px] -mb-6 floating delay-800" src={DiamondHandsSS} alt="Diamond Hands Secret Sauce" width={486} height={486} />
                <p className="text-neutral-50 font-bold text-md md:text-lg w-[125px] md:w-[179px] text-center">Diamond Hands <span className="text-[#5CCEFF]"> Secret Sauce</span></p>
              </div>
            </ScrollTrigger>
          </div>

          {/* <div className="mt-24 px-4 relative">
            <div className="bg-yellow-800 filter left-1/2 top-0 -translate-x-1/2  blur-3xl w-[800px] h-[800px] rounded-full absolute opacity-40"></div>
            <h3 className="text-3xl md:text-5xl font-bold text text-neutral-50 mb-3 z-10 relative">HOW TO <span className="text-neutral-300">BUY?</span></h3>
            <div className="z-10 relative flex gap-2 flex-wrap">
              <div className="rounded-2xl border w-1/4 bg-neutral-50 bg-opacity-10 border-neutral-50 border-opacity-20 backdrop-blur-xl p-5">
                <div className="text-orange-400 font-bold">1. Install Wallet</div>
                <p className="text-neutral-300">Download a wallet that supports the Solana Blockchain, such as Phantom, or Solflare.</p>
              </div>

              <div className="rounded-2xl border  w-1/4 bg-neutral-50 bg-opacity-10 border-neutral-50 border-opacity-20 backdrop-blur-xl p-5">
                <div className="text-orange-400 font-bold">2. Get some Sol</div>
                <p className="text-neutral-300">Buy some Sol</p>
              </div>

              <div className="rounded-2xl border  w-1/4 bg-neutral-50 bg-opacity-10 border-neutral-50 border-opacity-20 backdrop-blur-xl p-5">
                <div className="text-orange-400 font-bold">3. Connect to Pump.fun</div>
                <p className="text-neutral-300">Connect to Pump.fun using your newly created wallet</p>
              </div>

              <div className="rounded-2xl border  w-1/4 bg-neutral-50 bg-opacity-10 border-neutral-50 border-opacity-20 backdrop-blur-xl p-5">
                <div className="text-orange-400 font-bold">4. Buy $Nuggie</div>
                <p className="text-neutral-300">Buy some Nuggie Inu!</p>
              </div>
            </div>
          </div> */}


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
