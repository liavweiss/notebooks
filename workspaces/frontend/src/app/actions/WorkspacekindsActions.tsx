import { WorkspaceKind } from '~/shared/types';
import { getWorkspaceKinds } from '~/shared/api/notebookService';


const BFF_API_VERSION = 'v1'; // TODO: consider move this const to a more shared location
const BASE_URL = `/api/${BFF_API_VERSION}`;

/**
 * Fetches all workspacekinds from the API.
 * @returns {Promise<WorkspaceKind[]>} A promise resolving to an array of workspacekinds.
 * @throws An error if the API call fails.
 */
export async function fetchAllWorkspacekinds(): Promise<WorkspaceKind[]> {
  try {
    const apiOptions = {
      parseJSON: true,
      headers: {
        Accept: 'application/json',
      },
    };
    const getWorkspaceskindsFunc = getWorkspaceKinds(BASE_URL);
    const workspacekindsList = await getWorkspaceskindsFunc(apiOptions);
    return workspacekindsList;
  } catch (error) {
    console.error('Error fetching all workspacekinds:', error);
    throw error;
  }
}

type KindLogoDict = Record<string, string>;

/**
 * Fetches all workspace kinds, builds a dictionary of kind names to logos, and returns it.
 * @returns {Promise<KindLogoDict>} A promise resolving to a dictionary with kind names as keys and logo URLs as values.
 * @throws An error if fetching workspace kinds fails.
 */
export async function buildKindLogoDictionary(): Promise<KindLogoDict> {
  const kindLogoDict: KindLogoDict = {};

  try {
    const workspaceKinds: WorkspaceKind[] = await fetchAllWorkspacekinds();
    for (const workspaceKind of workspaceKinds) {
      kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
    }

    return kindLogoDict;
  } catch (error) {
    console.error('Error fetching workspace kinds or building kind logo dictionary:', error);
    throw error;
  }
}

