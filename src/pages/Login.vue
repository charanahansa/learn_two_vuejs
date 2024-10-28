<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                    <h3 class="mt-5 mb-4">Login</h3>
                    <form @submit.prevent="login">
                        <input v-model="email" type="email" class="form-control form-control-sm mb-2" placeholder="Email" />
                        <input v-model="password" type="password" class="form-control form-control-sm mb-3" placeholder="Password" />
                        <button type="submit" class="btn btn-primary w-50">Login</button>
                    </form>
                </div>
                <div class="col-4"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('authToken', response.data.token);
                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
