import React from 'react';
import styled from 'styled-components';
import { RemoveButton } from '../../common/Button';
import { base64ToUrl } from '../../../utils/files.util';
import avatarPlaceholder from '../../../assets/avatar-placeholder.png';

export interface AvatarUploadProps {
  avatarUrl?: string;
  className?: string;
  inEditMode: boolean;
  [key: string]: any;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarUrl,
  className,
  inEditMode,
  UploadButton,
  file,
  setFile,
}) => {
  const url = file && typeof file !== 'string' ? URL.createObjectURL(file) : undefined;

  return (
    <Div className={className}>
      <img
        className='avatar'
        src={url ?? base64ToUrl(avatarUrl) ?? avatarPlaceholder}
        onLoad={() => {
          if (url) URL.revokeObjectURL(url);
        }}
        alt='avatar'
      />
      {inEditMode && (
        <>
          <UploadButton>
            <i className='fas fa-upload upload-btn'></i>
          </UploadButton>
          <RemoveButton onClick={() => setFile(undefined)} />
        </>
      )}
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .avatar {
    width: 55px;
    height: 55px;
    background: var(--lightgrey);
    border-radius: 50%;
    box-shadow: 1px 1px 5px #ddd;
  }

  i {
    margin-left: 1em;
  }

  .upload-btn {
    padding: 0.6em 0.7em;
    background: white;
    border: 1px solid var(--grey);
    border-radius: 5px;
    box-shadow: 1px 1px 5px #ccc;
    color: var(--main);
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    :active {
      background: var(--main);
      color: white;
    }
  }
`;
