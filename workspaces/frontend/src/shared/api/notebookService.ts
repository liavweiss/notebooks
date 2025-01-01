import { NamespacesList, WorkspacekindsList} from '~/app/types';
import { isNotebookResponse, restGET } from '~/shared/api/apiUtils';
import { APIOptions } from '~/shared/api/types';
import { handleRestFailures } from '~/shared/api/errorUtils';

export const getNamespaces =
  (hostPath: string) =>
  (opts: APIOptions): Promise<NamespacesList> =>
    handleRestFailures(restGET(hostPath, `/namespaces/`, {}, opts)).then((response) => {
      if (isNotebookResponse<NamespacesList>(response)) {
        return response.data;
      }
      throw new Error('Invalid response format');
    });

  export const getWorkspacekinds =
  (hostPath: string) =>
  (opts: APIOptions): Promise<WorkspacekindsList> =>
    handleRestFailures(restGET(hostPath, `/workspacekinds`, {}, opts)).then((response) => {
      if (isNotebookResponse<WorkspacekindsList>(response)) {
        return response.data;
      }
      throw new Error('Invalid response format');
    });
