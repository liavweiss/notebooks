import useWorkspacekinds from '../hooks/useWorspacekinds';

type KindLogoDict = Record<string, string>;

/**
 * Fetches all workspace kinds, builds a dictionary of kind names to logos, and returns it.
 * @returns {Promise<KindLogoDict>} A promise resolving to a dictionary with kind names as keys and logo URLs as values.
 * @throws An error if fetching workspace kinds fails.
 */
export async function buildKindLogoDictionary(): Promise<KindLogoDict> {
  const kindLogoDict: KindLogoDict = {};
  console.log("Im here from WorkspaceActopns!")
  const [workspaceKinds, loaded, loadError] = useWorkspacekinds();
  if (loaded && workspaceKinds) {
    console.log("Im here !")
    for (const workspaceKind of workspaceKinds) {
      kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
    }
  } else {
    if (loadError) {
      console.error('Error loading workspacekinds: ', loadError);
    }
  }

  return kindLogoDict;
}


