import { readdirSync } from "fs"
import { isUndefined } from "./assertion"

export const getFileNames = (path: string): string[] => {
  const dirents = readdirSync(path, { withFileTypes: true })

  const paths = dirents
    .map((dirent) => {
      if (dirent.isFile()) return dirent.name
      return undefined
    })
    .filter((path) => !isUndefined(path))
  return paths
}
