import { WorkspaceKind } from '~/shared/types';

const BFF_API_VERSION = 'v1'; // TODO: consider move this const to a more shared location
const WORKSPACE_KINDS_URL = `/api/${BFF_API_VERSION}/workspacekinds`;

const workspacekinds: WorkspaceKind[] = [
    {
    "name": "jupyter-lab",
    "displayName": "JupyterLab Notebook",
    "description": "A Workspace which runs JupyterLab in a Pod",
    "deprecated": false,
    "deprecationMessage": "This WorkspaceKind will be removed on 20XX-XX-XX, please use another WorkspaceKind.",
    "hidden": false,
    "icon": {
        "url": "https://jupyter.org/assets/favicons/apple-touch-icon-152x152.png"
    },
    "logo": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg"
    },
    "podTemplate": {
        "podMetadata": {
            "labels": {
                    "myWorkspaceKindLabel": "my-value"
            },
            "annotations": {
                    "myWorkspaceKindAnnotation": "my-value"
            }
        },
        "volumeMounts": {
            "home": "/home/jovyan"
        },
        "options": {
            "imageConfig": {
                "default": "jupyterlab_scipy_190",
                "values": [
                    {
                    "id": "jupyterlab_scipy_180",
                    "displayName": "jupyter-scipy:v1.8.0",
                    "labels": {
                        "pythonVersion": "3.11"
                    },
                    "hidden": true,
                    "redirect": {
                        "to": "jupyterlab_scipy_190",
                        "message": {
                            "text": "This update will change...",
                            "level": "Info"
                        }
                    }
                },
                ]
            },
            "podConfig": {
                "default": "tiny_cpu",
                "values": [
                    {
                    "id": "tiny_cpu",
                    "displayName": "Tiny CPU",
                    "description": "Pod with 0.1 CPU, 128 Mb RAM",
                    "labels": {
                        "cpu": "100m",
                        "memory": "128Mi"
                        }
                    }, 
                ]
            }
        }
    }
}]

/**
 * Fetches all workspacekinds from the API.
 * @returns {Promise<Workspace[]>} A promise resolving to an array of workspacekindes.
 * @throws An error if the API call fails.
 */
export async function fetchAllWorkspacekinds(): Promise<WorkspaceKind[]> {
  try {
    const response = await fetch(WORKSPACE_KINDS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch all workspacekinds: ${response.statusText}`);
    }
    const responseData = await response.json();
    if (responseData.data) {
      return responseData.data;
    }
    throw new Error('Data field not found in response');
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
    //Note: For now, we will use a mock API until the API mechanism is ready
    //const workspaceKinds: WorkspaceKind[] = await fetchAllWorkspacekinds();
    const workspaceKinds: WorkspaceKind[] = workspacekinds
    
    for (const workspaceKind of workspaceKinds) {
      kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
    }

    return kindLogoDict;
  } catch (error) {
    console.error('Error fetching workspace kinds or building kind logo dictionary:', error);
    throw error;
  }
}

