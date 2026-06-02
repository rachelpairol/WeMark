"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PhotosContextType {
  photos: File[]
  setPhotos: (files: File[]) => void
  clearPhotos: () => void
}

const PhotosContext = createContext<PhotosContextType | undefined>(undefined)

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotosState] = useState<File[]>([])

  const setPhotos = (files: File[]) => setPhotosState(files)
  const clearPhotos = () => setPhotosState([])

  return (
    <PhotosContext.Provider value={{ photos, setPhotos, clearPhotos }}>
      {children}
    </PhotosContext.Provider>
  )
}

export function usePhotos() {
  const ctx = useContext(PhotosContext)
  if (!ctx) throw new Error("usePhotos must be used within PhotosProvider")
  return ctx
}
