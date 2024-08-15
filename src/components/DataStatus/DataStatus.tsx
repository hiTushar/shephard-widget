import { emblemSvg, error, noData } from '../../assets/assets';
import { DataStatusType } from '../../Types';
import './DataStatus.css';

const DataStatusScreen = (props: { status: DataStatusType }) => {
    const { status } = props;
    const getStatusSection = (status: DataStatusType) => {
        switch (status) {
            case 'LOADING':
                return (
                    <>
                        <div className='data-status__icon brightness-animate'>
                            <img src={emblemSvg} alt="loader" />
                        </div>
                    </>
                )
            case 'EMPTY':
                return (
                    <>
                        <div className='data-status__icon'>
                            <img src={noData} alt="no data" />
                        </div>
                        <div className='data-status__text'>
                            No Data Found, Try Reloading
                        </div>
                    </>
                )
            case 'ERROR':
                return (
                    <>
                        <div className='data-status__icon'>
                            <img src={error} alt="error" />
                        </div>
                        <div className='data-status__text'>
                            Unexpected Error
                        </div>
                    </>
                )
            default:
                return <></>
        }
    }

    return (
        <div className="data-status">
            <div className='data-status__container'>
                {
                    getStatusSection(status)
                }
            </div>
        </div>
    )
}

export default DataStatusScreen;
