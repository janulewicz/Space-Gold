import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "./Components/HeroSection/HeroSection";
import HeroNext from "./Components/HeroNext/HeroNext";
import ProblemAndSolution from "./Components/ProblemAndSolution/ProblemAndSolution";
import RoadMap from "./Components/Roadmap/Roadmap";
import Contact from "./Components/Contact/Contact";
import Tokenomics from "./Components/Tokenomics/Tokenomics";
import Team from "./Components/Team/Team";
import Header from "./Components/Header/Header";
import React from 'react';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
const TRACKING_ID = "G-46126YGGR3"; 
ReactGA.initialize(TRACKING_ID);

function App() {
  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  }, []);
  
  const problem = [
    "The museum grade antiques barrier to entry prevents thousands of investors from accessing the more exclusive assets that will benefit them in the long run.",
    "The time and money needed to hunt meteorites makes is almost impossible for small-scale companies and firms to enter the market and compete with established museums. ",
    "Meteorites are not only rare but exceedingly hard to find. Only with advanced technology and sufficient funds could people consistently recover meteorites successfully. ",
    "The US dollar is no longer pegged to the gold standard, making runaway inflation much harder to combat for traders and everyday citizens.",
    "After considerable and extensive money printing, the US dollar is depreciating quickly, making it harder to afford consumer goods and a reasonable standard of living. ",
  ];
  const solution = [
    "Space Gold Coin will lower the barrier to entry for museum-grade antiquity assets by tokenising the meteorites recovered by the team, granting investors direct, digital access to ancient antiquity.",
    "Our team will cover the recovery of meteorites using the funds generated by preceding expeditions and token minting, bringing further wealth to existing holders at no extra cost.",
    "Due to the equipment our team possesses, it has become increasingly easy for us to source meteorites in record time, and with the funds generated from the Space Gold Coin ecosystem, we’ll be able to reinvest money back into future expeditions. ",
    "In the absence of the gold standard, people will find strength and stability in SGC, backed by artefacts with timeless value, the coin will allow holders to exchange their tokens for sufficient dollars, and vice versa. ",
    "With antiquities being such a formidable asset class, SGC holders won’t be as open to inflationary damage by staking in our tokenised meteorites.",
  ];
  return (
    <>
      <Header />
      <HeroSection />
      <HeroNext />
      <ProblemAndSolution title="PROBLEMS" data={[...problem]} />
      <ProblemAndSolution title="SOLUTIONS" data={[...solution]} />
      <RoadMap />
      <Tokenomics />
      <Team />
      <Contact/>
    </>
  );
}

export default App;
