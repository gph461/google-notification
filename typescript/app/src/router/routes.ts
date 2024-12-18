import { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    guards?: ((to: RouteLocationNormalized) => true | string)[];
  }
}

export enum AppRoute {
  Login = 'Login',
  Index = 'Index',
  webpush = 'webpush',
  sendwebpush = 'sendwebpush',
}

function authGuard(): true | string {
  // if not loged in, return AppRoute.Login
  return true;
}

function loginGuard(): true | string {
  return true;
}

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: {
      name: AppRoute.Index,
    },
  },
  {
    path: '/auth',
    component: () => import('src/layouts/AuthLayout.vue'),
    meta: {
      guards: [loginGuard],
    },
    children: [
      {
        path: 'login',
        name: AppRoute.Login,
        component: () => import('src/pages/auth/Login.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        name: AppRoute.Index,
        component: () => import('src/pages/IndexPage.vue'),
      },
      {
        path: '/webpush',
        name: AppRoute.webpush,
        component: () => import('src/pages/webpush/WebPush.vue'),
      },
      {
        path: '/sendwebpush',
        name: AppRoute.sendwebpush,
        component: () => import('src/pages/webpush/SendWebPush.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

function validateRoutes(routes: RouteRecordRaw[]): void {
  for (const route of routes) {
    if (route.component instanceof Promise) {
      throw new Error(
        `Route component must be a Component or a function that returns a Component. Route: ${route.path}`
      );
    }
    if (route.children?.length) validateRoutes(route.children);
  }
}
validateRoutes(routes);

export default routes;
