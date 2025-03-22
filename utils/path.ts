import { readdirSync } from "fs"
import { isUndefined } from "./assertion"

export const getRecursivePaths = (path: string): string[] => {
  const dirents = readdirSync(path, { withFileTypes: true })

  const paths = dirents
    .flatMap((dirent) => {
      const resolvedPath = `${path}/${dirent.name}`
      if (dirent.isDirectory()) {
        return getRecursivePaths(resolvedPath)
      }
      return dirent.isFile() ? resolvedPath : undefined
    })
    .filter((path) => !isUndefined(path))
  return paths
}
