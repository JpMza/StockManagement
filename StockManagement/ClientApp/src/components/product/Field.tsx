import { type } from "os";
import * as React from "react";
import { IErrors } from "./Form";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";
export type Option = { key: number, value: string }


export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: Array<Option>;

  /* The field value */
  value?: any;
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor,
  options,
  value
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}

      {editor!.toLowerCase() === "textbox" && (
        <input
          id={id}
          type="text"
          value={value}
          onChange={
            (e: React.FormEvent<HTMLInputElement>) =>
              console.log(e) /* TODO: push change to form values */
          }
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "multilinetextbox" && (
        <textarea
          id={id}
          value={value}
          onChange={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
              console.log(e) /* TODO: push change to form values */
          }
          onBlur={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "dropdown" && (
        <select
          id={id}
          name={id}
          value={value}
          onChange={
            (e: React.FormEvent<HTMLSelectElement>) =>
              console.log(e) /* TODO: push change to form values */
          }
          onBlur={
            (e: React.FormEvent<HTMLSelectElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        >
          {options &&
            options.map(option => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
        </select>
      )}

      {/* TODO - display validation error */}
    </div>
  );
};
Field.defaultProps = {
  editor: "textbox"
};