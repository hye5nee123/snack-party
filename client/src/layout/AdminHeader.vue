<template>
    <header class="p-3 mb-3 border-bottom">
        <div>
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link to="/admin" class="nav-link">
                            <i class="menu-icon tf-icons bx bx-home-circle"></i>
                            <span>관리자 페이지</span>
                        </router-link></li>
                    <li><router-link to="/main" class="nav-link">
                            <i class="menu-icon tf-icons bx bx-layout"></i>
                            <span>쇼핑몰 페이지</span>
                        </router-link></li>
                </ul>

                <div class="dropdown text-end">
                    <a href="#" class="d-block link-dark text-decoration-none" id="dropdownUser1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="true" aria-label="Toggle navigation">
                            <span class="fa fa-bars text-primary"></span>
                        </button>
                    </a>
                    <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "AdminHeader",
}
</script>

<style>
header {
    background-color: #333333 !important;
}
</style>