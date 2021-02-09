import { gql, useMutation } from '@apollo/client';
import { useUpload } from '../useUpload';

const EDIT_PROFILE = gql`
  mutation($input: ProfileInput!) {
    editProfile(input: $input)
  }
`;

export function useProfile() {
  const uploadProps = useUpload({ type: 'profile' });
  const [editProfile] = useMutation<{ editProfile: boolean }>(EDIT_PROFILE, {
    onCompleted: () => uploadProps.upload(),
  });

  return { editProfile, uploadProps };
}
