import React, { useEffect, useState } from 'react';
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
import { Gender } from '../../../types/User.types';

export interface ProfileProps {}

const profileSchema = yup.object().shape({
  name: yup.string().max(128),
  gender: yup.mixed().oneOf(Object.values(Gender)),
  month: yup.number().max(12).min(1),
  day: yup.number().max(31).min(1),
  year: yup.number(),
});

const Profile: React.FC<ProfileProps> = () => {
  const { user } = useUser();
  const { updateProfile, uploadProps } = useProfile();
  const [inEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (inEditMode && user?.avatar) uploadProps.setFile(user.avatar);
  }, [user, inEditMode]);

  useEffect(() => {
    if (!inEditMode && uploadProps.file) uploadProps.setFile(undefined);
  }, [inEditMode]);

  const birth = user?.birthdate?.split('/') || '';

  return (
    <Div>
      <Row className='heading' justifyContent='space-between'>
        <h1>PROFILE</h1>
        {inEditMode ? (
          <Button fontsize='12px' outline onClick={() => setEditMode(false)}>
            CANCEL
          </Button>
        ) : (
          <Button fontsize='12px' outline onClick={() => setEditMode(true)}>
            EDIT
          </Button>
        )}
      </Row>

      <Label fontWeight='normal'>Avatar</Label>

      <AvatarUpload
        className='avatar-upload'
        inEditMode={inEditMode}
        avatarUrl={user?.avatar}
        {...uploadProps}
      />

      <Formik
        initialValues={{
          name: user?.name,
          gender: user?.gender,
          month: Number(birth[0]) || undefined,
          day: Number(birth[1]) || undefined,
          year: Number(birth[2]) || undefined,
        }}
        onSubmit={input => updateProfile({ variables: { input } })}>
        {() => (
          <Form>
            <hr />

            <div className='field'>
              <Label>Name</Label>
              {inEditMode ? <FormikField name='name' /> : <p className='userData'>{user?.name}</p>}
            </div>

            <hr />

            <div className='field'>
              <Label>Gender</Label>
              {inEditMode ? (
                <Row className='gender'>
                  <FormikField name='gender' type='radio' label='Male' value={Gender.MALE} />
                  <FormikField name='gender' type='radio' label='Female' value={Gender.FEMALE} />
                  <FormikField name='gender' type='radio' label='Other' value={Gender.OTHER} />
                </Row>
              ) : (
                <p className='userData'>{user?.gender}</p>
              )}
            </div>

            <hr />

            <div className='field'>
              <Label>Birthdate</Label>
              {inEditMode ? (
                <Row className='birthdate'>
                  <FormikField name='month' label='month' placeholder='M' type='number' />
                  <FormikField name='day' label='day' placeholder='D' type='number' />
                  <FormikField name='year' label='year' placeholder='Y' type='number' />
                </Row>
              ) : (
                <p className='userData'>{birth}</p>
              )}
            </div>

            {inEditMode && (
              <Row className='actions'>
                <Button primary>SAVE CHANGES</Button>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </Div>
  );
};

export default Profile;

const Div = styled.div`
  hr {
    margin: 2em 0;
  }

  .avatar-upload {
    margin-top: 1em;
    margin-bottom: 2em;
  }

  .field {
    label {
      font-weight: normal;
    }
    .userData {
      margin-top: 1em;
    }
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
