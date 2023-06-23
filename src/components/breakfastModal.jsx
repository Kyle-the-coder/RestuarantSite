import { useEffect, useState } from "react";
import { doc, getDocs, collection, arrayRemove } from "firebase/firestore"
import { db } from "../config/firebase"
import leftArrow from "../assets/images/modalArrowLeft.png"
import rightArrow from "../assets/images/modalArrowRight.png"
import { Transition } from '@headlessui/react';


const BreakfastCarousel = () => {
    const [breakfastData, setBreakfastData] = useState({})
    const [activeSet, setActiveSet] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSetTracker, setActiveSetTracker] = useState(false)

    useEffect(() => {
        // GET BREAKFAST DATA
        const getBreakfastData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "breakfastMenuItems"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setBreakfastData(documents);
                setActiveSetTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getBreakfastData();

        activeSetTracker && setActiveSet(breakfastData.slice(0, 3))


    }, [activeSetTracker])

    const nextSet = () => {
        const newIndex = currentIndex + 1;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        setActiveSet(newSet);
        setCurrentIndex(newIndex);
    };

    const prevSet = () => {
        const newIndex = currentIndex - 1;
        const newSet = breakfastData.slice(newIndex, newIndex + 3);
        if (currentIndex < 0) {
            setCurrentIndex(0)
        } else {
            setActiveSet(newSet);
            setCurrentIndex(newIndex);

        }
    };

    const isPrevButtonDisabled = currentIndex === 0;
    const isNextButtonDisabled = currentIndex + 3 >= breakfastData.length;


    console.log(currentIndex)
    return (
        <div className="flex w-full h-full justify-evenly items-center">
            <button src={leftArrow} className={`${isPrevButtonDisabled ? "opacity-50" : "opacity-100"}`} onClick={prevSet} disabled={isPrevButtonDisabled}>
                <img className="h-[50px] w-[50px]" src={leftArrow} />
            </button>
            <Transition
                as="div"
                className="flex space-x-4 h-full"
                show={activeSet.length > 0}
                enter="transition-all duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-all duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                {activeSet.map((picture, index) => (
                    <img key={index} src={picture.menuItemImg} className={`   w-[200px] h-full object-cover opacity-70 hover:opacity-100 cursor-pointer`} alt={`Picture ${index}`} />
                ))}
            </Transition>

            <button className={`${isNextButtonDisabled ? "opacity-50" : "opacity-100"}`} src={rightArrow} onClick={nextSet} disabled={isNextButtonDisabled}>
                <img className={` h-[50px] w-[50px]`} src={rightArrow} />
            </button>
        </div>
    )
}

export default BreakfastCarousel;