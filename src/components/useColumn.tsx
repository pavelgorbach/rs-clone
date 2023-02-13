import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useAuthStore from '@/hooks/useAuthStore'

export function useColumn() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const { userId, isAuthenticated } = useAuthStore()
}
