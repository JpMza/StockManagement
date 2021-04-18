import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Row, Col,Button } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as ProductsStore from '../../store/Products';
import './Product.css';
import moment from 'moment';

// At runtime, Redux will merge together...
type ProductsProps =
    ProductsStore.ProductState // ... state we've requested from the Redux store
    & typeof ProductsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class ProductsTable extends React.PureComponent<ProductsProps> {
   // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    // public componentDidUpdate() {
    //     this.ensureDataFetched();
    // }

    public render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs="10" sm="8" md="8" lg="9" xl="9">
                        <h1 id="tabelLabel">Lista de Produfgvctos</h1>
                        <p>Aqui puede observar el listado de los productos disponibles</p>
                    </Col>
                    <Col xs="2" sm="4" md="4" lg="3" xl="3">
                        <button onClick={() => this.props.history.push('/products/form')} type="button" className="btn btn-primary cm-button">Crear Producto</button>
                    </Col>
                </Row>
                {this.renderForecastsTable()}
                {this.renderPagination()}
            </React.Fragment>
        );
    }

    private getStartDateIndex() {
        return parseInt(this.props.match.params.startDateIndex, 10) || 0
    }

    private ensureDataFetched() {
        const startDateIndex = this.getStartDateIndex();
        this.props.requestProducts(startDateIndex);
    }

    private renderForecastsTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map((product: ProductsStore.Product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.price}</td>
                            <td>{moment(product.loadDate).format('DD-mm-YYYY')}</td>
                            <td>{product.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {
        return (
            <div className="d-flex justify-content-between">
                <Button color="primary" disabled={!this.props.pagination.firstPage} onClick={() => this.props.goToPage(this.getStartDateIndex(), this.props.pagination.firstPage)}>{`<< Primera`}</Button>
                <Button color="secondary" disabled={!this.props.pagination.previousPage} onClick={() => this.props.goToPage(this.getStartDateIndex(), this.props.pagination.previousPage)}>{`< Anterior`}</Button>
                {this.props.isLoading && <span>Cargando...</span>}
                <Button color="secondary" disabled={!this.props.pagination.nextPage} onClick={() => this.props.goToPage(this.getStartDateIndex(), this.props.pagination.nextPage)}>{`Siguiente >`}</Button>
                <Button color="primary" disabled={!this.props.pagination.lastPage} onClick={() => this.props.goToPage(this.getStartDateIndex(), this.props.pagination.lastPage)}>{`Última >>`}</Button>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.products, // Selects which state properties are merged into the component's props
    ProductsStore.actionCreators // Selects which action creators are merged into the component's props
)(ProductsTable as any); // eslint-disable-line @typescript-eslint/no-explicit-any
