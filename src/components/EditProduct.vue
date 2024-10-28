<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-9">
                    <h4>Edit Product</h4>
                    <form @submit.prevent="updateProduct">

                        <div v-if="successMessage" class="alert alert-success">
                            {{ successMessage }}
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-2">
                                <label for="name" class="col-form-label">Name</label>
                            </div>
                            <div class="col-3">
                                <input type="text" class="form-control form-control-sm" v-model="product.name">
                                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                            </div>

                            <div class="col-2">
                                <label for="description" class="col-form-label">Description</label>
                            </div>
                            <div class="col-4">
                                <input type="text" class="form-control form-control-sm" v-model="product.description">
                                <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center">
                            <div class="col-2">
                                <label for="stkqty" class="col-form-label">Stock Qty</label>
                            </div>
                            <div class="col-3">
                                <input type="number" class="form-control form-control-sm" v-model="product.quantity_in_stock">
                                <small v-if="errors.quantity_in_stock" class="text-danger">{{ errors.quantity_in_stock }}</small>
                            </div>

                            <div class="col-2">
                                <label for="qty" class="col-form-label">Price</label>
                            </div>
                            <div class="col-3">
                                <input type="number" class="form-control form-control-sm"  v-model="product.price">
                                <small v-if="errors.price" class="text-danger">{{ errors.price }}</small>
                            </div>
                        </div>

                        <div class="row g-3 align-items-center mb-4">
                            <div class="col-2">
                                <label for="category" class="col-form-label">Category</label>
                            </div>
                            <div class="col-3">
                                <input type="text" class="form-control form-control-sm" v-model="product.category">
                                <small v-if="errors.category" class="text-danger">{{ errors.category }}</small>
                            </div>

                            <div class="col-2">
                                <input type="submit" value="Edit" class="btn btn-primary w-100">
                            </div>

                            <div class="col-2">
                                <input type="button" value="Close" class="btn btn-primary w-100"  @click="closeComponent">
                            </div>
                        </div>
                    </form>
                    
                </div>
                <div class="col-3"></div>
            </div>
        </div>

        <!-- 
            <form @submit.prevent="updateProduct">
                <input type="text" v-model="product.name" placeholder="Name" required />
                <input type="text" v-model="product.description" placeholder="Description" required />
                <input type="number" v-model="product.quantity_in_stock" placeholder="Quantity" required />
                <input type="number" v-model="product.price" placeholder="Price" required />
                <input type="text" v-model="product.category" placeholder="Category" required />
                <button type="submit">Update Product</button>
            </form>
         -->

    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['product'],
    data() {
        return {
            errors: {} ,
            successMessage: ''
        };
    },
    methods: {
        validateProduct() {
            // Frontend Validation Logic
            this.errors = {}; // Reset errors

            if (!this.product.name) this.errors.name = 'Name is required.';
            if (!this.product.description) this.errors.description = 'Description is required.';
            if (this.product.quantity_in_stock <= 0) this.errors.quantity_in_stock = 'Stock Quantity must be greater than zero.';
            if (this.product.price <= 0) this.errors.price = 'Price must be greater than zero.';
            if (!this.product.category) this.errors.category = 'Category is required.';

            return Object.keys(this.errors).length === 0;
        },
        updateProduct() {

            //Check Validations
            if (!this.validateProduct()) return;

            axios.put(`/products/${this.product.id}`, this.product)
                .then(() => {
                    this.successMessage = 'Product updated successfully!';
                    setTimeout(() => {
                        this.successMessage = ''; // Clear the success message after 5 seconds
                    }, 5000);
                    this.$emit('productUpdated');
                })
                .catch(error => {
                    // Check if the error is a validation error from Laravel
                    if (error.response && error.response.status === 422) {
                        // Assign backend validation errors to display in the template
                        this.errors = error.response.data.errors;
                    } else {
                        console.error(error);
                    }
                });
        },
        closeComponent() {
            this.$emit('close'); // Emit the close event to the parent component
        }
    }
};
</script>