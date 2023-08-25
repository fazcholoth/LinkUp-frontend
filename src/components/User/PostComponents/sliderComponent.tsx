import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon ,XCircleIcon} from '@heroicons/react/24/solid';

type ImagesProps = {
  image: string[];
  clearImages:()=>void;
};

const Carousel = ({ image ,clearImages}: ImagesProps) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? image.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === image.length - 1 ? 0 : prevIndex + 1));
  };
 const handleImage=()=>{
 clearImages()
 
 }
  return (
    <div className="relative w-1/2 h-32 md:h-44 flex mt-1">
      <img src={image[currentIndex]} alt="Carousel Slide" className="absolute w-full h-full object-cover justify-center items-center px-6 py-8" />
      <button
        type="button" 
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 focus:outline-none"
        onClick={goToPreviousSlide}
      >
        <ChevronLeftIcon className="w-6 h-6 text-black" />
      </button>
      <XCircleIcon
        className="absolute top-0 right-0 w-8 h-8 text-black  -translate-x-2 md:-translate-x-4 focus:outline-none cursor-pointer"
        onClick={handleImage}
      />
      <button
        type="button" 
        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 md:translate-x-4 focus:outline-none"
        onClick={goToNextSlide}
      >
        <ChevronRightIcon className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default Carousel;
