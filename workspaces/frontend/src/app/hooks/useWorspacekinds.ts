import * as React from 'react';
import useFetchState, {
  FetchState,
  FetchStateCallbackPromise,
} from '~/shared/utilities/useFetchState';
import { WorkspaceKind } from '~/shared/types';
import { useNotebookAPI } from '~/app/hooks/useNotebookAPI';

const useWorkspacekinds = (): FetchState<WorkspaceKind[]> => {
    console.log("Im here from useWorkspacekinds")
  const { api, apiAvailable } = useNotebookAPI();
  console.log("Im here after useWorkspacekinds!!!!")
  const call = React.useCallback<FetchStateCallbackPromise<WorkspaceKind[]>>(
    (opts) => {
      if (!apiAvailable) {
        return Promise.reject(new Error('API not yet available'));
      }
      console.log("Im here before calling the api")
      return api.getWorkspacekinds(opts);
    },
    [api, apiAvailable],
  );

  return useFetchState(call, []);
};

export default useWorkspacekinds;
