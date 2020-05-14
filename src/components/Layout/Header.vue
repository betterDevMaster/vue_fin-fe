<template>
    <header class="topnavbar-wrapper">
        <!-- START Top Navbar-->
        <nav class="navbar topnavbar">
            <!-- START Left navbar-->
            <ul class="navbar-nav mr-auto flex-row">
                <li class="nav-item">
                    <!-- Button used to collapse the left sidebar. Only visible on tablet and desktops-->
                     <a href="" class="nav-link d-none d-md-block d-lg-block d-xl-block" @click.prevent="toggleAsideCollapsed">
                        <em class="fas fa-bars"></em>
                    </a>
                    <!-- Button to show/hide the sidebar on mobile. Visible on mobile only.-->
                    <a href="" class="nav-link sidebar-toggle d-md-none" @click.prevent="toggleOffcanvas">
                        <em class="fa fa-bars"></em>
                    </a>
                </li>
            </ul>
            <!-- END Left navbar-->
            <!-- START Right Navbar-->
            <ul class="navbar-nav flex-row">
                <!-- Fullscreen (only desktops)-->
                <li class="nav-item d-none d-md-block">
                  <a class="nav-link" href="#" @click.prevent="logout" title="Logout">
                    <i class="icon-logout"></i>
                  </a>
                </li>
                <li class="nav-item d-none d-md-block">
                  <a class="nav-link" href="#" @click.prevent="goToProfile" title="User profile">
                    <i class="icon-user"></i>
                  </a>
                </li>
                <li class="nav-item d-none d-md-block">
                  <ToggleFullscreen tag="A" class="nav-link" href="#" />
                </li>
            </ul>
            <!-- END Right Navbar-->
        </nav>
        <!-- END Top Navbar-->
    </header>
</template>

<script>
    import { mapMutations } from 'vuex'
    import ToggleFullscreen from '@/components/Common/ToggleFullscreen'
    import authTypes from "@/store/auth/types";

    export default {
        name: 'Header',
        components: {
            ToggleFullscreen
        },
        methods: {
            /**
             * Triggers a window resize event when clicked
             * for plugins that needs to be redrawed
             */
            resize: e => {
                // all IE friendly dispatchEvent
                var evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
                // modern dispatchEvent way
                // window.dispatchEvent(new Event('resize'));
            },
            ...mapMutations([
                'toggleSetting'
            ]),
            toggleOffcanvas() {
                this.toggleSetting('asideToggled')
            },
            toggleAsideCollapsed() {
                this.toggleSetting('isCollapsed')
                this.resize();
            },
            logout() {
              this.$store
                .dispatch(authTypes.namespacedActions.logout)
                .then(() => this.$router.push({ name: "Login" }));
            },
            goToProfile() {
              this.$router.push({ path: 'settings' });
            }
        }
    }
</script>