import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import ProductList from './components/ProductList.vue';

const routes = [
    { path: '/', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/product-list', component: ProductList },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation Guard for protected routes
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
