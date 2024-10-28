<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <div class="text-center mb-5">
                        <!-- Navigation Links -->
                        <router-link to="/dashboard">Dashboard</router-link> |
                        <router-link to="/product-list">Product List</router-link> |
                        <router-link v-if="userRole === 'admin'" to="/register">Register</router-link> |
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Menu',
        data() {
            return {
                userRole: localStorage.getItem('userRole')        
            };
        }
    };
</script>