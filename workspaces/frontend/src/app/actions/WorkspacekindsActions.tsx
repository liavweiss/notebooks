import useWorkspacekinds from '../hooks/useWorspacekinds';

type KindLogoDict = Record<string, string>;

/**
 * Fetches all workspace kinds, builds a dictionary of kind names to logos, and returns it.
 * @returns {Promise<KindLogoDict>} A promise resolving to a dictionary with kind names as keys and logo URLs as values.
 * @throws An error if fetching workspace kinds fails.
 */
export async function buildKindLogoDictionary(): Promise<KindLogoDict> {
  const kindLogoDict: KindLogoDict = {};

  try {
    const [workspaceKinds, loaded, loadError] = useWorkspacekinds();
    if (loaded && workspaceKinds) {
      for (const workspaceKind of workspaceKinds.data) {
        kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
      }
    }
    
    return kindLogoDict;
  } catch (error) {
    console.error('Error fetching workspace kinds or building kind logo dictionary:', error);
    throw error;
  }
}

