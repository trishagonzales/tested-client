import React from 'react';
import styled from 'styled-components';
import { UploadHookReturn } from '../../hooks/common/useUpload';
import { base64ToUrl } from '../../utils/files.util';

import { Center } from '../common/Layout';

export const UploadProductImages: React.FC<UploadHookReturn> = ({
  files,
  remove,
  UploadButton,
}) => {
  const urls =
    files &&
    (typeof files[0] === 'string'
      ? files.map(f => base64ToUrl(f as string))
      : files.map(f => URL.createObjectURL(f)));

  return (
    <Div>
      {urls &&
        urls.map((url, i) => (
          <div key={i} className='image-container hoverable'>
            <img
              src={url}
              onLoad={function () {
                url && URL.revokeObjectURL(url);
              }}
              alt='product-images'
            />
            <i className='clear-btn fas fa-times' onClick={() => remove(i)}></i>
          </div>
        ))}

      <UploadButton>
        <Center className='upload-btn hoverable'>
          <i className='fas fa-plus'></i>
        </Center>
      </UploadButton>
    </Div>
  );
};

const Div = styled.div`
  width: 100%;
  height: auto;
  margin-top: 0.5em;
  display: flex;
  flex-wrap: wrap;

  .image-container,
  .upload-btn {
    flex: 0 0 80px;
    width: 80px;
    height: 80px;
    border: 1px solid var(--grey);
    border-radius: 5px;
  }

  .image-container {
    margin-right: 0.7em;
    margin-bottom: 0.7em;
    position: relative;
    :hover {
      .clear-btn {
        opacity: 1;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    .clear-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      color: maroon;
      opacity: 0;
      transition: opacity 200ms;
    }
  }

  .upload-btn {
    color: var(--grey);
  }
`;
