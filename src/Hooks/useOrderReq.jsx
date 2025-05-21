import  { useContext } from 'react';

import { OrderRequestContext } from '../Provider/OrderRequestProvider';

const useOrderReq = () => {
    const orderInfo = useContext(OrderRequestContext)
    return orderInfo;
};

export default useOrderReq;