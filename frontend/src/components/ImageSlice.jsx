import React, { useEffect, useState } from 'react'

const ImageSlice = () => {
    const images = [
        "https://wallpaperaccess.com/full/795912.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/041/390/166/small_2x/ai-generated-camera-lens-in-snow-free-photo.jpeg",
        "https://png.pngtree.com/background/20230520/original/pngtree-5-colors-from-a-row-of-tee-shirts-picture-image_2672349.jpg"
    ]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
    }

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length)
    }

    return (
        <div className='w-full h-[400px] shadow-lg overflow-hidden relative'>

            {/* Slides */}
            <div
                className='flex h-full transition-transform duration-700 ease-in-out'
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="slide"
                        className='w-full h-full flex-shrink-0 object-cover'
                    />
                ))}
            </div>

            {/* Buttons */}
            <button
                onClick={prevSlide}
                className='absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded'
            >
                Prev
            </button>

            <button
                onClick={nextSlide}
                className='absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-1 rounded'
            >
                Next
            </button>

            {/* LINE INDICATOR (instead of dots) */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 w-40'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className='flex-1 h-1 bg-gray-400 rounded-full overflow-hidden'
                    >
                        <div
                            className={`h-full transition-all duration-500 ${
                                current === index ? "bg-blue-500 w-full" : "w-0"
                            }`}
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ImageSlice