<template>
    <div>
        <Menu />
        <div class="container mb-5">
            <div class="row">
                <div class="col-12">
                    <h3 class="mb-3">Product List</h3>
                    <input type="button" v-if="userRole === 'admin'" @click="showAddProductForm = true" class="btn btn-primary mb-4" value="Add Product">

                    <AddProduct v-if="showAddProductForm" @productAdded="fetchProducts" @close="showAddProductForm = false" />
                    <EditProduct v-if="selectedProduct" :product="selectedProduct" @productUpdated="fetchProducts" @close="selectedProduct = false" />

                    <div class="mt-2 mb-4">
                        <input type="text" v-model="searchQuery" @input="fetchProducts" placeholder="Search by Name or Category" class="form-control form-control-sm">
                    </div>

                    <table class="table-striped  table-sm table-bordered">
                        <tr class="table-info">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.quantity_in_stock }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.category }}</td>
                            <td v-if="userRole === 'admin'">
                                <input type="button" value="Edit" class="btn btn-success" style="width: 40%;" @click="editProduct(product)" >
                                &nbsp;
                                <input type="button" value="Delete" class="btn btn-danger" style="width: 40%;" @click="deleteProduct(product.id)" >
                            </td>
                            <td v-else=""></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>     
    </div>
</template>

<style scoped>
    table {
        border-collapse: collapse;                /* Ensures borders are merged */
        width: 100%;                             /* Optional: makes the table take full width */
    }
    th, td {
        border: 1px solid black;                /* Adds a border to table headers and cells */
        text-align: left;                         /* Aligns text to the left */
    }
</style>

<script>
import axios from 'axios';
import AddProduct from './AddProduct.vue';
import EditProduct from './EditProduct.vue';
import Menu from '../components/Menu.vue';

export default {
    components: { AddProduct, EditProduct, Menu },
    data() {
        return {
            products: [],
            showAddProductForm: false,
            selectedProduct: null,
            userRole: localStorage.getItem('userRole') 
        };
    },
    methods: {
        // fetchProducts() {
        //     axios.get('/products')
        //         .then(response => {
        //             this.products = response.data;
        //         })
        //         .catch(error => console.error(error));
        // },
        fetchProducts() {
            axios.get('/products', { params: { search: this.searchQuery } })
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => console.error(error));
        },
        deleteProduct(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                axios.delete(`/products/${id}`)
                    .then(() => this.fetchProducts())
                    .catch(error => console.error(error));
            }
        },
        editProduct(product) {
            this.selectedProduct = product;
        }
    },
    mounted() {
        this.fetchProducts();
    }
};
</script>