import React from 'react';
import { APIState } from '~/shared/api/types';
import { NotebookAPIs } from '~/app/types';
import { getNamespaces, getWorkspacekinds} from '~/shared/api/notebookService';
import useAPIState from '~/shared/api/useAPIState';
import { APIOptions } from '~/shared/api/types';


export type NotebookAPIState = APIState<NotebookAPIs>;

const useNotebookAPIState = (
  hostPath: string | null,
): [apiState: NotebookAPIState, refreshAPIState: () => void] => {
  console.log("Im here from useNotebookApiSrate")
  const createAPI = React.useCallback(
    (path: string) => ({
      getNamespaces: getNamespaces(path),
      getWorkspacekinds: (opts: APIOptions) =>
        getWorkspacekinds(path)(opts),
    }),
    [],
  );

  return useAPIState(hostPath, createAPI);
};

export default useNotebookAPIState;
