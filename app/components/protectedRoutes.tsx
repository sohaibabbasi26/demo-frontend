"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      router.replace('/login')
    }
  }, [router])

  return <>{children}</>
}
