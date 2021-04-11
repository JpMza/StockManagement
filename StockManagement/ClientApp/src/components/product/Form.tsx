import * as React from 'react';
import { Row } from 'reactstrap';

interface IFormProps {
  /* The http path that the form will be posted to */
  action: string;
  render: () => React.ReactNode;
}

export interface IFormState {
  /* The field values */
  values: IValues;

  /* The field validation error messages */
  errors: IErrors;

  /* Whether the form has been successfully submitted */
  submitSuccess?: boolean;
}

export interface IFormContext extends IFormState {
  /* Function that allows values in the values state to be set */
  setValues: (values: IValues) => void;
}
/*
 * The context which allows state and functions to be shared with Field.
 * Note that we need to pass createContext a default value which is why undefined is unioned in the type
 */
export const FormContext = React.createContext<IFormContext | undefined>(undefined);

export interface IValues {
  /* Key value pairs for all the field values with key being the field name */
  [key: string]: any;
}

export interface IErrors {
  /* The validation error messages for each field (key is the field name */
  [key: string]: string;
}




export class Form extends React.Component<IFormProps, IFormState>{

  constructor(props: IFormProps) {
    super(props);
    const errors: IErrors = {};
    const values: IValues = {};
    this.state = {
      errors,
      values
    };
  }



  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }


  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();


    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
    }
  };

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Whether the form is valid or not
   */
  private validateForm(): boolean {
    // TODO - validate form
    return true;
  }

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  private async submitForm(): Promise<boolean> {
    let inputData: any = Array.from(document.querySelectorAll('#productForm input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {})
    //console.log(inputData);
    let categoryData: any = document.querySelector('#category');
    //console.log(categoryData);
    let formData: any = {
      price: Number(85.22), [categoryData.id]: Number(categoryData.value)
    }
    console.log(formData)
    //debugger
    const response = await fetch(this.props.action, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    });

    return true;
  }

  public render() {
    const { submitSuccess, errors } = this.state;
    const context: IFormContext = { ...this.state, setValues: this.setValues };
    return (
      <div>
        <FormContext.Provider value={context}>
          <form onSubmit={this.handleSubmit} noValidate={true} id="productForm">
            <div className="container">

              {this.props.render()}

              <div className="form-group">
                <button
                  onClick={() => this.handleSubmit}
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.haveErrors(errors)}
                >
                  Confirmar
              </button>

                <button onClick={() => console.log(this.state.values)}>
                  Estado
              </button>
              </div>
            </div>
          </form>
        </FormContext.Provider>
      </div>
    );
  }
}