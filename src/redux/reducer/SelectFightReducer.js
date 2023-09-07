
import { DATA_SELECT, DATA_SELECT_RETURN, DATA_SERVICE } from '../action/SelectFight';
const INITIAL_STATE = {
    data_select: {
        conditionSelect: '',
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
    },
    data_select_return: {
        conditionSelectReturn: '',
        adultsPriceReturn: '',
        adultsPriceFomatReturn: '',
        childrenPriceReturn: '',
        childrenPriceFomatReturn: '',
        infantPriceReturn: '',
        infantPriceFomatReturn: '',
        taxesfightReturn: '',
        taxesfightFomatReturn: '',
    },
    data_service: {
        listService: '',
    }

};
const SelectFightReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATA_SELECT:
            return {
                ...state,
                data_select: {
                    conditionSelect: action?.payload?.conditionSelect,
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
        case DATA_SELECT_RETURN:
            return {
                ...state,
                data_select_return: {
                    conditionSelectReturn: action?.payload?.conditionSelectReturn,
                    adultsPriceReturn: action?.payload?.adultsPriceReturn,
                    adultsPriceFomatReturn: action?.payload?.adultsPriceFomatReturn,
                    childrenPriceFomatReturn: action?.payload?.childrenPriceFomatReturn,
                    childrenPriceFomat: action?.payload?.childrenPriceFomat,
                    infantPriceReturn: action?.payload?.infantPriceReturn,
                    infantPriceFomatReturn: action?.payload?.infantPriceFomatReturn,
                    taxesfightReturn: action?.payload?.taxesfightReturn,
                    taxesfightFomatReturn: action?.payload?.taxesfightFomatReturn
                }

            };
        case DATA_SERVICE:
            return {
                ...state,
                data_service: {
                    listService: action?.payload?.listService,
                }

            };

        default: return state;
    }
};

export default SelectFightReducer;