import React from 'react';
import { useState, useCallback } from 'react';
import { Button } from '../../components/common/Button';

export function useEdit() {
  const [editMode, setEditMode] = useState(false);

  const EditButton: React.FC = useCallback(
    () =>
      editMode ? (
        <Button fontsize='12px' onClick={() => setEditMode(!editMode)}>
          CANCEL
        </Button>
      ) : (
        <Button fontsize='12px' onClick={() => setEditMode(!editMode)}>
          EDIT
        </Button>
      ),
    [editMode]
  );

  return { EditButton, editMode, setEditMode };
}
