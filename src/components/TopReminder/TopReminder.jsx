import React, { useState, useEffect } from "react";
import { BiArrowToTop } from "react-icons/bi";
import "./topreminder.css";

const TopReminder = () => {
  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollYValue(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTopHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {scrollYValue > 0 ? (
        <BiArrowToTop onClick={scrollTopHandler} className="top-reminder-btn" />
      ) : (
        ""
      )}
    </div>
  );
};

export default TopReminder;
