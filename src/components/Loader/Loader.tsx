import { emblemSvg } from '../../assets/assets';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader">
            <div className='loader__icon'>
                <img src={emblemSvg} alt="loader" />
            </div>
        </div>
    )
}

export default Loader;
