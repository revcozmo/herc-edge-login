import {
    FETCHING_DATA,
    FETCHING_DATA_SUCCESS,
    FETCHING_DATA_FAILURE
} from '../actions/types';

const ETH_STATE =
{
    isFetching: false,
    isFetched: false,
    fetchError: false,
    data: []
}

const EthReducers = (ethState = ETH_STATE, action) => {
    console.log("ETh reducer")
    switch (action.type) {

        case FETCHING_DATA:
        console.log("fetching Data Reducer");
        return Object.assign({}, ethState, {
            ...ethState,
            isFetching: action.isFetching
        })

        case FETCHING_DATA_SUCCESS:

            console.log('eth reducer data success');
            let ethData = action.data;
            return Object.assign({}, ethState, {
                ...ethState,
                isFetched: true,
                isFetching: false,
                data: ethData
            })


        case FETCHING_DATA_FAILURE:
            return {
                ...ethState,
                fetchError: true,
                error: action.error
            }

        default:
            return ethState

    }
}

export default EthReducers;