import * as React from "react";
import { Form } from "./Form";
import { Field, Option } from "./Field";
import { useHistory } from "react-router";

const options: Array<Option> = [
    {
        "key": 1,
        "value": "PRODUNO"
    },
    {
        "key": 2,
        "value": "PRODDOS"
    }
]

export const ProductsForm: React.FunctionComponent = () => {
    const history = useHistory();

    return (
        <div>
            <Form
                action="https://localhost:44315/products"
                history={history}
                render={() => (
                    <React.Fragment>
                        <div className="alert alert-info" role="alert">
                            Ingrese los datos del producto
          </div>
                        <Field id="price" label="Precio" />
                        <Field id="loadDate" label="Fecha de Carga" />
                        <Field
                            id="category"
                            label="Categoria"
                            editor="dropdown"
                            options={options}
                        />
                    </React.Fragment>
                )}
            />
        </div>
    );
};