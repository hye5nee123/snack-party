<template>

    <div class="container">
        <div class="container-xxl flex-grow-1 container-p-y">
            <div class="card">
                <h3>주문조회</h3>
            </div>
        </div>
        <AdminOrderDetailComp :order_code="order_code" :member_code="member_code"/>
    </div>
</template>
<script>
import AdminOrderDetailComp from '../../components/admin/AdminOrderDetailComp.vue';

export default {
    name: 'AdminOrderDetail',
    components: {
        AdminOrderDetailComp
    },
    data() {
        return {
            order_code : this.$route.query.order_code,
            member_code : this.$route.query.member_code,
        };
    },
    setup() { },
    created() {
        this.print();
    },
    mounted() { },
    unmounted() { },
    methods: {
        print () {
            console.log(this.order_code, this.member_code )
        }
    }
}
</script>