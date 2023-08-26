import "./home.css";

//sections
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Home/Hero";
import Footer from "../../components/Footer/Footer";
import TopReminder from "../../components/TopReminder/TopReminder";


const Home = () => {
  return (
    <div>
      <TopReminder />
      <Navbar />
      <Hero/>
      <Footer />
    </div>
  );
};

export default Home;
