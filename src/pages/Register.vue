<template>
    <div>
        <Menu />
        <div class="container">
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <h3 class="mb-3">Register</h3>
                    <form @submit.prevent="register">

                        <!-- Success Message -->
                        <div v-if="successMessage" class="alert alert-success">
                            {{ successMessage }}
                        </div>

                        <!-- Error Message -->
                        <div v-if="errorMessage" class="alert alert-danger">
                            {{ errorMessage }}
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-2">
                                <label for="name" class="col-form-label">Name</label>
                            </div>
                            <div class="col-6">
                                <input type="text" class="form-control form-control-sm" v-model="name">
                                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-2">
                                <label for="email" class="col-form-label">Email</label>
                            </div>
                            <div class="col-6">
                                <input type="text" class="form-control form-control-sm" v-model="email">
                                <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-2">
                                <label for="password" class="col-form-label">Password</label>
                            </div>
                            <div class="col-6">
                                <input type="password" class="form-control form-control-sm" v-model="password">
                                <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mb-4">
                            <div class="col-2">
                                <label for="password" class="col-form-label">User Role</label>
                            </div>
                            <div class="col-6">
                                <select class="form-select form-select-sm" v-model="role">
                                    <option value="user" selected>User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-3"></div>
                            <div class="col-2">
                                <input type="submit" value="Register" class="btn btn-primary">
                            </div>
                            <div class="col-5"></div>
                        </div>

                        <!-- 
                            <input v-model="name" type="text" placeholder="Name" required />
                            <input v-model="email" type="email" placeholder="Email" required />
                            <input v-model="password" type="password" placeholder="Password" required />
                            <button type="submit">Register</button> 
                        -->
                    </form>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';
import Menu from '../components/Menu.vue';

export default {
    components: { Menu, },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            role: 'user',
            successMessage: '',
            errorMessage: '',
            errors: {}
        };
    },
    methods: {
        validateForm() {
            this.errors = {}; // Reset errors

            if (!this.name) this.errors.name = 'Name is required.';
            if (!this.email) {
                this.errors.email = 'Email is required.';
            } else if (!this.validEmail(this.email)) {
                this.errors.email = 'Email must be valid.';
            }
            if (!this.password) this.errors.password = 'Password is required.';

            return Object.keys(this.errors).length === 0; // Return true if no errors
        },
        validEmail(email) {
            // Simple email validation regex
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        async register() {
            // Validate the form before sending request
            if (!this.validateForm()) {
                this.errorMessage = 'Please fix the errors above.';
                return;
            }
            try {

                const response = await axios.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                });

                // Clear input fields
                this.name = '';
                this.email = '';
                this.password = '';
                this.role = 'user';
                
                this.successMessage = 'Registration successful!';           // Set success message
                this.errorMessage = '';                                     // Reset error message

                localStorage.setItem('authToken', response.data.token);
                this.$router.push({ name: 'dashboard' });

            } catch (error) {
                // Capture backend validation errors
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors;
                    this.errorMessage = 'Please fix the validation errors.';
                } else {
                    console.error(error);
                    this.errorMessage = 'An error occurred during registration. Please try again.';
                }
                this.successMessage = ''; // Reset success message
            }
        },
    },
};
</script>
