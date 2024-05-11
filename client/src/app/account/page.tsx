'use client';

import { setMenuIndex } from "@/lib/atoms";
import Profile from "./profile/page";
import { useAtom } from "jotai";
import Reviews from "./reviews/page";
import Finance from "./finance/page";
import Crowdfunding from "./crowdfunding/page";

export default function page() {
  const [currentIndex, setCurrentIndex] = useAtom(setMenuIndex)

  return (
    <>
      { currentIndex === 0 && <Profile/> }
      { currentIndex === 1 && <Crowdfunding/> }
      { currentIndex === 2 && <Reviews/> }
      { currentIndex === 3 && <Finance/> }
    </>
  )
}
