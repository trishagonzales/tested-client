import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { AvatarUpload } from './AvatarUpload';
import { FormikField } from '../../common/FormikField';
import { Label } from '../../common/Form';
import { Row } from '../../common/Layout';
import { Button } from '../../common/Button';
import { useProfile } from '../../../hooks/user/useProfile';
import { useUser } from '../../../hooks/user/useUser';

export interface ProfileProps {}

const profileSchema = yup.object().shape({
  name: yup.string().max(128),
  gender: yup.string().oneOf(['male', 'female', 'other']),
  month: yup.number().max(12).min(1),
  day: yup.number().max(31).min(1),
  year: yup.number(),
});

const Profile: React.FC<ProfileProps> = () => {
  const { user } = useUser();
  const { editProfile, uploadProps } = useProfile();

  const birth = user?.birthdate?.split('/') || '';

  return (
    <Div>
      <Row className='heading' justifyContent='space-between'>
        <h1>PROFILE</h1>
      </Row>

      <AvatarUpload className='avatar-upload' avatarUrl={user?.avatar} {...uploadProps} />

      <Formik
        initialValues={{
          name: user?.name,
          gender: user?.gender,
          month: Number(birth[0]) || undefined,
          day: Number(birth[1]) || undefined,
          year: Number(birth[2]) || undefined,
        }}
        onSubmit={input => editProfile({ variables: { input } })}>
        {() => (
          <Form>
            <FormikField className='fields ' name='name' label='name' />

            <div className='fields'>
              <Label>Gender</Label>
              <Row className='gender'>
                <FormikField name='gender' type='radio' label='Male' value='male' />
                <FormikField name='gender' type='radio' label='Female' value='female' />
                <FormikField name='gender' type='radio' label='Other' value='other' />
              </Row>
            </div>

            <div className='fields'>
              <Label>Birthdate</Label>
              <Row className='birthdate'>
                <FormikField name='month' label='month' placeholder='M' type='number' />
                <FormikField name='day' label='day' placeholder='D' type='number' />
                <FormikField name='year' label='year' placeholder='Y' type='number' />
              </Row>
            </div>

            <Row className='actions'>
              <Button primary>SAVE CHANGES</Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Div>
  );
};

export default Profile;

const Div = styled.div`
  .fields {
    margin-top: 22px;
  }

  .name {
    input {
      width: 100%;
    }
  }

  .gender {
    max-width: 300px;
  }

  .birthdate {
    max-width: 300px;
    label {
      font-weight: 400;
    }
    .month,
    .day {
      input {
        width: 50px;
      }
    }
    .year {
      input {
        width: 100px;
      }
    }
  }
`;
