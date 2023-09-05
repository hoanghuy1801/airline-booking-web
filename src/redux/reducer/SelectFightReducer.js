
import { DATA_SELECT } from '../action/SelectFight';
const INITIAL_STATE = {
    data_select: {
        listByCondition: '',
        adultsPrice: '',
        adultsPriceFomat: '',
        childrenPrice: '',
        childrenPriceFomat: '',
        infantPrice: '',
        infantPriceFomat: '',
        taxesfight: '',
        taxesfightFomat: '',
        totalFight: '',
        totalFightFomat: ''
    }
};
const SelectFightReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_SELECT:
            return {
                ...state,
                data_select: {
                    listByCondition: action?.payload?.listByCondition,
                    adultsPrice: action?.payload?.adultsPrice,
                    adultsPriceFomat: action?.payload?.adultsPriceFomat,
                    childrenPrice: action?.payload?.childrenPrice,
                    childrenPriceFomat: action?.payload?.childrenPriceFomat,
                    infantPrice: action?.payload?.infantPrice,
                    infantPriceFomat: action?.payload?.infantPriceFomat,
                    taxesfight: action?.payload?.taxesfight,
                    taxesfightFomat: action?.payload?.taxesfightFomat,
                    totalFight: action?.payload?.totalFight,
                    totalFightFomat: action?.payload?.totalFightFomat
                }

            };

        default: return state;
    }
};

export default SelectFightReducer;