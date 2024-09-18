'use client';

import { setMenuIndex } from "@/lib/atoms";
import Profile from "./profile/page";
import { useAtom } from "jotai";
import PatientFeedback from "./patient-feedback/page";
import Advocacy from "./advocacy/page";
import Crowdfunding from "./crowdfunding/page";

export default function page() {
  const [currentIndex, setCurrentIndex] = useAtom(setMenuIndex)

  return (
    <>
      { currentIndex === 0 && <Profile/> }
      { currentIndex === 1 && <Crowdfunding/> }
      { currentIndex === 2 && <PatientFeedback/> }
      { currentIndex === 3 && <Advocacy/> }
    </>
  )
}
