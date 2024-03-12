<template>
    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="card">
            <h3>회원조회</h3>
        </div>
    </div>
    <AdminMemberInfoComp :member_code="member_code"/>
</template>
<script>
import AdminMemberInfoComp from '../../components/admin/AdminMemberInfoComp.vue';

export default {
    components: {
        AdminMemberInfoComp
    },
    data() {
        return {
            member_code : this.$route.query.member_code
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
            console.log(this.member_code )
        }
    }
}
</script>