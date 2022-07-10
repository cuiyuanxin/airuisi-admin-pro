import {
    createRouter,
    RouteRecordRaw,
    createWebHistory,
    // createWebHashHistory
} from 'vue-router'

// const HelloWorld = () => import('@/views/HelloWorld.vue')
// const ErrorPage = () => import('@/views/ErrorPage.vue')

const routes: RouteRecordRaw[] = [
    // {
    //     path: '/',
    //     name: 'HelloWorld',
    //     component: HelloWorld,
    // },
    // {
    //     path: '/:pathMatch(.*)*', // 注意此处 404页面匹配规则和以前不相同，得采用这种配置方式才行
    //     name: '404',
    //     component: ErrorPage,
    // },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 路由守卫和之前的实现方式一致 此处只是做了一个demo仅供演示
// router.beforeEach(
//     (
//         to: RouteLocationNormalized,
//         from: RouteLocationNormalized,
//         next: NavigationGuardNext
//     ) => {
//         // 获取userToken，根据业务场景可由localStorage也可由cookie中获取
//         const user = localStorage.getItem("user");
//         // 路由守卫判断
//         if (to.meta.type === "login" && user) {
//             next({ name: "home" });
//             return;
//         }
//
//         if (to.meta.type === "home" && !user) {
//             next({ name: "login" });
//             return;
//         }
//
//         next();
//     });


export default router