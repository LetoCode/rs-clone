interface Paths {
   [key: string]: {
      cb: () => void,
      title: string
   }
}

interface Path {
   cb: () => void,
   title: string
}