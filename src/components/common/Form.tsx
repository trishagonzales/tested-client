import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export interface FormProps {
  fullwidth?: boolean;
}

export const Label = styled.label<{ fontSize?: string }>`
  font-size: ${p => (p.fontSize ? p.fontSize : '14px')};
  font-weight: bold;
  color: var(--fg);
`;

export const Input = styled.input<FormProps>`
  width: ${p => (p.fullwidth ? '100%' : '400px')};
  padding: 0.7em;
  border: 2px solid #ccc;
  border-radius: var(--borderRadius);
  :focus {
    border-color: #777;
  }
`;

export const Textarea = styled(TextareaAutosize)<FormProps>`
  width: ${p => (p.fullwidth ? '100%' : '400px')};
  padding: 0.7em;
  border: 2px solid #ccc;
  border-radius: var(--borderRadius);
  resize: none;
  :focus {
    border-color: #777;
  }
`;

export const PasswordInput: React.FC = props => {
  const [visible, setVisible] = useState(false);
  return (
    <PasswordInputStyle>
      <Input {...props} type={visible ? 'text' : 'password'} />
      <i
        className={`fas fa-eye${visible ? ' visible' : '-slash'}`}
        onClick={() => setVisible(!visible)}
      />
    </PasswordInputStyle>
  );
};

const PasswordInputStyle = styled.div`
  position: relative;
  input {
    padding-right: 2.5em;
  }
  i {
    margin-top: -0.5em;
    padding: 0.6em;
    position: absolute;
    top: 0.6em;
    right: 0;
    color: var(--darkgrey);
    cursor: pointer;
  }
  .visible {
    color: var(--main);
  }
`;
