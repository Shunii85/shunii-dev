import { readdirSync } from "fs"

export const getRecursivePaths = (path: string): string[] => {
  const dirents = readdirSync(path, { withFileTypes: true })

  return dirents.flatMap((dirent) => {
    const resolvedPath = `${path}/${dirent.name}`
    if (dirent.isDirectory()) {
      return getRecursivePaths(resolvedPath)
    }
    return resolvedPath
  })
}
