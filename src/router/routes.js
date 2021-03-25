import { lazy } from 'vue-async-manager'

const Main = lazy(() => import('@/pages/Main'))

export const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
]
