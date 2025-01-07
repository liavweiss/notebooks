import * as React from 'react';
import { NotebookAPIState } from '~/app/context/useNotebookAPIState';
import { NotebookContext } from '~/app/context/NotebookContext';

type UseNotebookAPI = NotebookAPIState & {
  refreshAllAPI: () => void;
};

export const useNotebookAPI = (): UseNotebookAPI => {
  console.log("Im here from useNotebookAPI")
  const { apiState, refreshAPIState: refreshAllAPI } = React.useContext(NotebookContext);
  console.log("Im here after useNotebookAPI")
  return {
    refreshAllAPI,
    ...apiState,
  };
};
