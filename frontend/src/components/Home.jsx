import Product from "./auth/Product";
// import Showcase from "./auth/Showcase";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center p-6">
      <div>
        <Navbar />
      </div>
<div className="mt-15">
      </div>
      <Product />
    </div>
  );
};

export default Home;