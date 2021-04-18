import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface ProductState {
    isLoading: boolean;
    startDateIndex?: number;
    products: Product[];
    pagination: Pagination
}

export interface Product {
    id?: number;
    price: number;
    loadDate: Date;
    category: number;
}

interface Pagination {
    firstPage: string,
    lastPage: string,
    previousPage: string,
    nextPage: string,
    pageNumber?: number,
    pageSize?: number,
}

interface Response {
    pageNumber: number,
    pageSize: number,
    firstPage: string,
    lastPage: string,
    previousPage: string,
    nextPage: string,
    totalPages: number,
    totalRecords: number,
    data: Product[]
}

interface RequestProductsListAction {
    type: 'REQUEST_PRODUCTS_LIST';
    startDateIndex: number;
}


interface ReciveProductsListsAction {
    type: 'RECIVE_PRODUCTS';
    startDateIndex: number;
    data: Response;
}


type KnownAction = RequestProductsListAction | ReciveProductsListsAction;

export const actionCreators = {
    requestProducts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.products && startDateIndex !== appState.products.startDateIndex) {
            fetch(`/lista/productos`)
                .then(response => response.json() as Promise<Response>)
                .then(result => dispatch({ type: 'RECIVE_PRODUCTS', startDateIndex: startDateIndex, data: result })
                );

            dispatch({ type: 'REQUEST_PRODUCTS_LIST', startDateIndex: startDateIndex });
        }
    },
    goToPage: (startDateIndex: number, page : string) : AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.products && startDateIndex !== appState.products.startDateIndex) {
            fetch(page)
                .then(response => response.json() as Promise<Response>)
                .then(result => dispatch({ type: 'RECIVE_PRODUCTS', startDateIndex: startDateIndex, data: result })
                );

            dispatch({ type: 'REQUEST_PRODUCTS_LIST', startDateIndex: startDateIndex });
        }
    }
}

//reducer

const unloadedState: ProductState = { products: [], isLoading: false, pagination: {firstPage: "", lastPage:"", previousPage: "",nextPage: ""} };


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
                isLoading: true,
                pagination: {firstPage: "", lastPage:"", previousPage: "",nextPage: ""} 
            };
        case 'RECIVE_PRODUCTS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                console.log(action)
                return {
                    products: action.data.data,
                    isLoading: false,
                    pagination: {
                        firstPage : action.data.firstPage,
                        lastPage: action.data.lastPage,
                        nextPage: action.data.nextPage,
                        previousPage: action.data.previousPage
                    }
                };
            }
            break;
    }

    return state;
};
