import Product from "./auth/Product";
// import Showcase from "./auth/Showcase";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 bg-pink-200">
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