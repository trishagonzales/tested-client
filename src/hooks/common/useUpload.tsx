import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from './useApiError';

const UPLOAD_PRODUCT_IMAGES = gql`
  mutation($id: String!, $files: [Upload!]!) {
    uploadProductImages(id: $id, files: $files)
  }
`;

const DELETE_PRODUCT_IMAGES = gql`
  mutation($id: String!, $filenames: [String!]!) {
    deleteProductImages(id: $id, filenames: $filenames)
  }
`;

const UPLOAD_AVATAR = gql`
  mutation($file: Upload!) {
    uploadAvatar(file: $file)
  }
`;

const DELETE_AVATAR = gql`
  mutation {
    deleteAvatar
  }
`;

type FileType = Blob | string | undefined;
type FilesType = (Blob | string)[];

interface UseUploadOptions {
  type: 'product' | 'profile';
  initialFile?: FileType;
  initialFiles?: FilesType;
}

export function useUpload({ type, initialFile, initialFiles = [] }: UseUploadOptions) {
  const [file, setFile] = useState<FileType>(initialFile);
  const [files, setFiles] = useState<FilesType>(initialFiles);

  const [isFileChanged, setIsFileChanged] = useState(false);
  const [areFilesChanged, setAreFilesChanged] = useState(false);

  const { addToast } = useToasts();
  let history = useHistory();

  const UploadButton: React.FC = useCallback(
    ({ children }) => {
      return (
        <UploadStyle>
          <input
            id='file-input'
            type='file'
            accept='image/*'
            onChange={(e: any) => {
              if (type === 'product') {
                setFiles(prev => {
                  const newState = [...prev, e.target.files[0]];
                  return newState;
                });
                setAreFilesChanged(true);
              } else {
                setFile(e.target.files[0]);
                setIsFileChanged(true);
              }
            }}
          />

          <label htmlFor='file-input' className='hoverable'>
            {children}
          </label>
        </UploadStyle>
      );
    },
    [file, files]
  );

  const [uploadAPI] = useMutation(type === 'product' ? UPLOAD_PRODUCT_IMAGES : UPLOAD_AVATAR, {
    onCompleted: data => {
      if (type === 'product') {
        setFiles([]);
        setAreFilesChanged(false);
        history.replace('/product/' + data.uploadProductImages);
        addToast('Product saved', { appearance: 'success' });
      } else {
        setFile(undefined);
        setIsFileChanged(false);
        history.replace('/profile');
        addToast('Profile saved', { appearance: 'success' });
      }
    },
    onError: err => {
      displayErrors(addToast, err);
    },
  });

  const [deleteAPI] = useMutation(type === 'product' ? DELETE_PRODUCT_IMAGES : DELETE_AVATAR, {
    onCompleted: () => {
      if (type === 'profile') {
        history.replace('/profile');
        addToast('Profile saved', { appearance: 'success' });
      }
    },
    onError: err => {
      displayErrors(addToast, err);
    },
  });

  const upload = useCallback(
    (productID?: string, currentProductImages?: string[]) => {
      if (type === 'product') {
        const [newFiles, oldFiles] = _.partition(files, file => typeof file !== 'string');
        const filesToRemove = _.difference(currentProductImages, oldFiles);

        if (newFiles.length > 0) uploadAPI({ variables: { id: productID, files: newFiles } });
        if (filesToRemove.length > 0)
          deleteAPI({ variables: { id: productID, filenames: filesToRemove } });
      } else {
        uploadAPI({ variables: { file } });
      }
    },
    [file, files]
  );

  const remove = useCallback(
    (index?: number) => {
      if (type === 'profile') {
        deleteAPI();
        setFile(undefined);
      } else {
        setFiles(files.filter((_, itemIndex) => index !== itemIndex));
      }
    },
    [file, files]
  );

  return {
    UploadButton,
    file,
    files,
    isFileChanged,
    areFilesChanged,
    remove,
    upload,
    setFile,
    setFiles,
  };
}

const UploadStyle = styled.div`
  display: flex;

  #file-input {
    width: 0;
    height: 0;
    display: 0;
  }
`;

export interface UploadHookReturn {
  UploadButton: React.FC;
  file?: FileType;
  files?: FilesType;
  remove: (index: number) => void;
  upload: (productID?: string) => void;
  isFileChanged?: boolean;
  areFilesChanged?: boolean;
}
