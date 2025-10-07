
import { useRouter } from 'vue-router'

export function useAdminGuard() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'tdt' || user.role !== "std") {
    router.push('/');
  }
}
