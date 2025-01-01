import * as React from 'react';
import useFetchState, {
  FetchState,
  FetchStateCallbackPromise,
} from '~/shared/utilities/useFetchState';
import { WorkspacekindsList } from '~/app/types';
import { useNotebookAPI } from '~/app/hooks/useNotebookAPI';

const useWorkspacekinds = (): FetchState<WorkspacekindsList | null> => {
  const { api, apiAvailable } = useNotebookAPI();

  const call = React.useCallback<FetchStateCallbackPromise<WorkspacekindsList | null>>(
    (opts) => {
      if (!apiAvailable) {
        return Promise.reject(new Error('API not yet available'));
      }

      return api.getWorkspacekinds(opts);
    },
    [api, apiAvailable],
  );

  return useFetchState(call, null);
};

export default useWorkspacekinds;
