import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useUpload } from '../common/useUpload';
import { useUser } from './useUser';

const UPDATE_PROFILE = gql`
  mutation($input: ProfileInput!) {
    updateProfile(input: $input)
  }
`;

export function useProfile() {
  const { user } = useUser();
  const uploadProps = useUpload({ type: 'profile' });
  const { addToast } = useToasts();
  let history = useHistory();

  const [updateProfile] = useMutation<{ updateProfile: boolean }>(UPDATE_PROFILE, {
    onCompleted: data => {
      if (data.updateProfile && uploadProps.file && typeof uploadProps.file !== 'string') {
        uploadProps.upload();
      } else if (user?.avatar && !uploadProps.file) {
        uploadProps.remove();
      } else {
        history.replace('/profile');
        addToast('Profile saved', { appearance: 'success' });
      }
    },
  });

  return { updateProfile, uploadProps };
}
