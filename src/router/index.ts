import NestedRoute from "./NestedRoute";
import StatusRoute from "./StatusRoute";
import { fatchTopList, fetchTopDetail } from "../redux/actions";

import loadable from "@loadable/component";

const router = [
  {
    path: "/bar",
    component: loadable(() => import("../views/Bar"))
  },
  {
    path: "/baz",
    component: loadable( () => import("../views/Baz"))
  },
  {
    path: "/foo",
    component: loadable(() => import("../views/Foo"))
  },
  {
    path: "/top-list",
    component: loadable(() => import("../containers/TopList")),
    exact: true,
    asyncData(store) {
      return store.dispatch(fatchTopList());
    }
  },
  {
    path: "/top-list/:id",
    component: loadable(() => import("../containers/TopDetail")),
    asyncData(store, params) {
      return store.dispatch(fetchTopDetail(params.id));
    }
  }
];

export default router;

export {
  router,
  NestedRoute,
  StatusRoute
}
