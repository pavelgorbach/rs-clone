import { useQuery } from '@tanstack/react-query'

import { getUserPhoto } from '@/api/files'

export default function useUserPhoto(userId?: string) {
  return useQuery({
    queryKey: ['my-photo', userId],
    queryFn: () => getUserPhoto(userId),
    enabled: !!userId
  })
}
