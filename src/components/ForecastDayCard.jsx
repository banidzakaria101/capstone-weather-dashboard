import React from "react";

const ForecastDayCard = ({ dayData }) => {
  if (!dayData) {
    return null;
  }

  const { data, day } = dayData;

  const getDayName = (dateString) => {
    const date = new Date(daterString);
    const options = { week: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div classNAme="flex flex-col items-center p-4 rounded-lg bg[#242424] text-white">
      {/* Day of the week */}
      <div className="text-sm font-semibold mb-2">{getDayName(data)}</div>

      <img
        src="{day.condition.icon}"
        alt="{day.condition.text}"
        className="w-12 h-12 mb-2"
      />

      {/* Max Temperature */}
    </div>
  );
};

export default ForecastDayCard;
