import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Products from './components/product/ProductTable';
import {ProductsForm} from './components/product/ProductsForm';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/products/form' component={ProductsForm} />
    </Layout>
);
