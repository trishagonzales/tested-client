import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import { useModal, ModalButtons, ModalContent } from '../../../hooks/portal/useModal';
import { useFormInput } from '../../../hooks/common/useFormInput';
import { useValidatePassword } from '../../../hooks/user/useValidatePassword';

import { Label, Input } from '../../common/Form';
import { Row } from '../../common/Layout';
import { Button } from '../../common/Button';
import { BaseProps } from '../../../types/General.types';

export interface FormWithEditModeProps extends BaseProps {
  label: string;
  callback: any;
  data?: string;
  withPasswordValidation?: boolean;
}

const FormWithEditMode: React.FC<FormWithEditModeProps> = ({
  className,
  label,
  data,
  withPasswordValidation,
  callback,
}) => {
  const mainForm = useFormInput();
  const passwordForm = useFormInput();
  const [inEditMode, setEditMode] = useState(false);

  const { Modal, open, close } = useModal();
  const { isValid, validate } = useValidatePassword();
  const { addToast } = useToasts();

  useEffect(() => {
    if (isValid) setEditMode(true);
  }, [isValid]);

  return (
    <Div className={className}>
      <div>
        <Label>{label}</Label>
      </div>

      <Row className='form-control' justifyContent='space-between'>
        {inEditMode ? (
          <>
            <Input {...mainForm.props} />
            <Button
              onClick={() => {
                setEditMode(false);
                withPasswordValidation && passwordForm.setValue('');
              }}>
              CANCEL
            </Button>
            <Button
              onClick={() => {
                callback(mainForm.props.value);
                setEditMode(false);
                withPasswordValidation && passwordForm.setValue('');
              }}
              primary>
              SAVE
            </Button>
          </>
        ) : (
          <>
            <span>{data}</span>
            <Button onClick={() => (withPasswordValidation ? open() : setEditMode(true))} outline>
              EDIT
            </Button>
          </>
        )}
      </Row>

      {withPasswordValidation && (
        <Modal>
          <ModalContent center>
            <div>
              <Label>Validate Password:</Label>
              <Input type='password' {...passwordForm.props} />
            </div>
          </ModalContent>
          <ModalButtons>
            <Button onClick={close}>CANCEL</Button>
            <Button
              id='modal-submit'
              onClick={() => {
                if (passwordForm.props.value) {
                  validate(passwordForm.props.value);
                  passwordForm.setValue('');
                  close();
                }
              }}
              primary>
              SUBMIT
            </Button>
          </ModalButtons>
        </Modal>
      )}
    </Div>
  );
};

export default FormWithEditMode;

const Div = styled.div`
  .form-control {
    padding: 0.3em 0;
    button {
      margin-left: 1em;
      font-size: 12px;
    }
  }
`;
