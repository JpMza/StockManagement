import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface ProductState {
    isLoading: boolean;
    startDateIndex?: number;
    products: Product[];
}

export interface Product {
    id?: number;
    price: number;
    loadDate: Date;
    category: number;
}

interface RequestProductsListAction {
    type: 'REQUEST_PRODUCTS_LIST';
    startDateIndex: number;
}


interface ReciveProductsListsAction {
    type: 'RECIVE_PRODUCTS';
    startDateIndex: number;
    products: Product[];
}


type KnownAction = RequestProductsListAction | ReciveProductsListsAction;

export const actionCreators = {
    requestProducts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.products && startDateIndex !== appState.products.startDateIndex) {
            fetch(`/lista/productos`)
                .then(response => response.json() as Promise<Product[]>)
                .then(data => dispatch({ type: 'RECIVE_PRODUCTS', startDateIndex: startDateIndex, products: data })
                );

            dispatch({ type: 'REQUEST_PRODUCTS_LIST', startDateIndex: startDateIndex });
        }
    }
}

//reducer

const unloadedState: ProductState = { products: [], isLoading: false };


export const reducer: Reducer<ProductState> = (state: ProductState | undefined, incomingAction: Action): ProductState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PRODUCTS_LIST':
            return {
                startDateIndex: action.startDateIndex,
                products: state.products,
                isLoading: true
            };
        case 'RECIVE_PRODUCTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    products: action.products,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
