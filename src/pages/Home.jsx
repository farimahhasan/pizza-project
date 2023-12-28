import Banner from '../components/Banner';
import OurServices from '../components/OurServices';
import PopularPizzas from '../components/PopularPizzas';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div className='md:text-right text-center'>
            <Banner />
            <PopularPizzas />
            <Testimonials />
            <OurServices />
        </div>
    );
};

export default Home;