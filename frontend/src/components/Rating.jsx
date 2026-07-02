import React, { useEffect, useState } from "react";

const Rating = ({
  value = 0,
  onRatingChange,
  disable = false,
  showValue = true,
}) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (star) => {
    if (disable) return;
    setRating(star);
    onRatingChange?.(star);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;

        return (
          <span
            key={i}
            className={`cursor-pointer text-xl transition ${disable ? "cursor-default" : "cursor-pointer"
              } ${(hover || rating) >= starValue
                ? "text-yellow-500"
                : "text-gray-300"
              }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !disable && setHover(starValue)}
            onMouseLeave={() => !disable && setHover(0)}
          >
            ★
          </span>
        );
      })}

      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;