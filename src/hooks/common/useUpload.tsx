import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { displayErrors } from './useApiError';

const UPLOAD_PRODUCT_IMAGES = gql`
  mutation($id: String!, $files: [Upload!]!) {
    uploadProductImages(id: $id, files: $files)
  }
`;

const UPLOAD_AVATAR = gql`
  mutation($file: Upload!) {
    uploadAvatar(file: $file)
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
  // const {} = useAdmin();
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
        addToast('Saved product', { appearance: 'success' });
      } else {
        setFile(undefined);
        setIsFileChanged(false);
        addToast('Saved profile', { appearance: 'success' });
      }
    },
    onError: err => {
      displayErrors(addToast, err);
    },
  });

  const upload = useCallback(
    (productID?: string) => {
      if (type === 'product') {
        uploadAPI({ variables: { id: productID, files } });
      } else {
        uploadAPI({ variables: { file } });
      }
    },
    [file, files]
  );

  const remove = useCallback(
    (index?: number) => {
      if (type === 'profile') {
        setFile(undefined);
      } else {
        setFiles(files.filter((_, itemIndex) => index !== itemIndex));
      }
    },
    [files, setFiles]
  );

  return { UploadButton, file, files, remove, upload, isFileChanged, areFilesChanged };
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
