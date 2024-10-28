<script>
import axios from '../axios';
import Menu from '../components/Menu.vue';

export default {
  
    components: { Menu, },

    data() {
        return {
            user: {},
        };
    },
    async created() {
        try {
            const response = await axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            this.user = response.data;
            localStorage.setItem('userRole', this.user.role);
        } catch (error) {
            console.error(error);
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        async logout() {
            try {
                await axios.post('/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole')    
                this.$router.push({ name: 'login' });
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
<template>
    <div>
        <Menu />
        <div class="container">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                    <h3>Dashboard</h3>
                    <p>Welcome, {{ user.name }}!</p>
                    <button @click="logout" class="btn btn-info">Logout</button>
                </div>
                <div class="col-4"></div>
            </div> 
        </div>  
    </div>
</template>