import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import starFill from "../assets/images/starFill.png"
import { db } from "../config/firebase";
import "../styles/reviewAverageCard.css"

const ReviewStats = () => {
    const [reviewData, setReviewData] = useState({})
    const [reviewDataTracker, setReviewDataTracker] = useState(false)
    const [reviewAverage, setReviewAverage] = useState(0)
    const [reviewCircle, setReviewCircle] = useState("")
    const [reviewCircleTracker, setReviewCircleTracker] = useState(false)

    useEffect(() => {
        // GET REVIEW DATA
        const getReviewData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "reviewInfo"));
                const documents = querySnapshot.docs.map((doc) => doc.data());
                setReviewData(documents);
                setReviewDataTracker(true)
            } catch (error) {
                console.log(error);
            }
        };
        getReviewData();

        if (reviewDataTracker) {
            const reviews = reviewData.map(item => item.reviewInfoRating)
            const sum = reviews.reduce((acc, curr) => acc + curr, 0);
            const average = Math.floor(sum / reviewData.length);
            setReviewAverage(average)
        }

        
    }, [reviewDataTracker])


    useEffect(() => {
        const circleOffsetHandler = [
            { 1: "580" },
            { 2: "460" },
            { 3: "280" },
            { 4: "220" },
            { 5: "0" }
        ]

        for (let i = 0; i < circleOffsetHandler.length; i++) {
            const keys = Object.keys(circleOffsetHandler[i]);
            if (reviewAverage == keys[0]) {
                setReviewCircle(circleOffsetHandler[i][keys[0]]);
                break;
            }
        }
    }, [reviewAverage])

    const handleCircleStyleTracker = () => {
        setReviewCircleTracker(true)
        setTimeout(() => {
            setReviewCircleTracker(false)
        }, 2000);
    }

    return (
        <div className="reviewAverageCardContainer">
            <div className="reviewCardBorder">

                <div className="reviewAverageCard beigeBg">

                    {/* REVIEW STATS TOP */}
                    <div className="reviewAverageCardTop">

                        {/* REVIEW STATS NUMBER */}
                        <div className="reviewAverageCardNumberContainer darkBg cursor-pointer" onClick={handleCircleStyleTracker}>
                            <div>
                                <h1 className="text-white mb-1">Overall:</h1>
                            </div>
                            <div className="reviewAverageCardNumberOuterCircle">
                                <div className="reviewAverageCardNumberInnerCircle ml-1">
                                    <h1 className="fontWriting ">{reviewAverage}</h1>
                                    <img className="w-[40px] h-[40px]" src={starFill} />
                                </div>
                            </div>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                width="80%" height="80%">
                                <defs>
                                    <linearGradient id="gradientColor" >
                                        <stop offest="0%" stopColor="#e1c7a8" />
                                        <stop offset="100%" stopColor="#ff5101" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50%" cy="52%" r="40%" strokeLinecap="round" style={{
                                    animation: `${reviewCircleTracker ? 'anim 1s linear forwards' : ''}`,
                                    strokeDashoffset: reviewCircle
                                }} />
                            </svg>
                        </div>

                        {/* REVIEW STATS DISPLAY */}
                        <div className="reviewAverageCardStatsContainer">
                            <div className="reviewStatsInfoContainer">
                                <h1>Average:</h1>
                                <div className="flex items-center">
                                    <h1 className="text-6xl">{reviewAverage}</h1>

                                    <h1 className="text-6xl">'s</h1>
                                </div>
                            </div>
                        </div>

                        {/* REVIEW STATS BOTTOM */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStats;