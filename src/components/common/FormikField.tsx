import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage, FieldAttributes } from 'formik';
import { capitalize } from 'lodash';
import { Label, Input } from './Form';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

const choicetype = ['radio', 'checkbox'];

export interface FormikFieldProps extends FieldAttributes<any>, TextareaAutosizeProps {
  name: string;
  className?: string;
  fullwidth?: boolean;
  label?: string;
  required?: boolean;
}

export const FormikField: React.FC<FormikFieldProps> = ({
  children,
  className,
  label,
  required,
  type = 'text',
  ...props
}) => {
  const isTextLabel = label && !choicetype.includes(type!);
  const isRadioLabel = label && choicetype.includes(type!);

  const generateLabel = (className: string) => (
    <Label className={className} htmlFor={isRadioLabel ? (props.value as string) : props.name}>
      {capitalize(label)} {required && <span className='error-color'>*</span>}
    </Label>
  );

  return (
    <Div className={className + ' ' + props.name} isRadio={isRadioLabel}>
      {isTextLabel && generateLabel('text-label')}
      <Field
        id={isRadioLabel ? props.value : props.name}
        as={props.as ? props.as : Input}
        type={type}
        {...props}>
        {children}
      </Field>
      {isRadioLabel && generateLabel('radio-label')}
      <ErrorMessage name={props.name} render={msg => <p className='input-error'>{msg}</p>} />
    </Div>
  );
};

const Div = styled.div<{ isRadio: any }>`
  width: 100%;
  margin: 0.7em 0;
  ${p => p.isRadio && 'display: flex; align-items: center'};

  textarea {
    width: 100%;
  }

  .text-label {
    margin-bottom: 0.5em;
    display: block;
  }
  .radio-label {
    margin-left: 0.5em;
    font-weight: 400;
    cursor: pointer;
  }

  input[type='radio'] {
    width: 17px;
    height: 17px;
    cursor: pointer;
  }

  .input-error {
    display: block;
  }
`;
