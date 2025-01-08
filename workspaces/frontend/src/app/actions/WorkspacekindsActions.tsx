import { WorkspaceKind } from '~/shared/types';

type KindLogoDict = Record<string, string>;

// /**
//  * Fetches all workspace kinds, builds a dictionary of kind names to logos, and returns it.
//  * @returns {KindLogoDict} A dictionary with kind names as keys and logo URLs as values.
//  * @throws An error if fetching workspace kinds fails.
//  */
// export async function buildKindLogoDictionary(worskspacekinds: WorkspaceKind[] | []): KindLogoDict {
//   const kindLogoDict: KindLogoDict = {};

//   for (const workspaceKind of worskspacekinds) {
//     kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
//   }
  
//   return kindLogoDict;
// }

/**
 * Fetches all workspace kinds, builds a dictionary of kind names to logos, and returns it.
 * @param {WorkspaceKind[]} workspaceKinds - The list of workspace kinds.
 * @returns {KindLogoDict} A dictionary with kind names as keys and logo URLs as values.
 */
export function buildKindLogoDictionary(workspaceKinds: WorkspaceKind[] | []): KindLogoDict {
  const kindLogoDict: KindLogoDict = {};

  for (const workspaceKind of workspaceKinds) {
    kindLogoDict[workspaceKind.name] = workspaceKind.logo.url;
  }
  
  return kindLogoDict;
}


