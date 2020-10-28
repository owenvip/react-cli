import { RouteConfig } from '@/interfaces/route'

const flattenRoutes = (
  routes: RouteConfig[],
  flattenedRoutes: RouteConfig[] = []
): RouteConfig[] => {
  routes.forEach((route) => {
    flattenedRoutes.push(route)
    if (Array.isArray(route.routes)) {
      flattenRoutes(route.routes, flattenedRoutes)
    }
  })
  return flattenedRoutes
}

export default flattenRoutes
