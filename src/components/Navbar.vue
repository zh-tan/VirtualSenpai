<template>
  <div class="flexible-content">
    <!-- Navbar -->
    <navbar expand="large" dark class="stylish-color" position="top" scrolling>
      <mdb-navbar-brand href="#">
        <img
          src="https://uploads.codesandbox.io/uploads/user/3a08ee57-9e2b-4499-ab22-63c72bf3362e/WSWu-logonav.png"
          height="37"
        />
      </mdb-navbar-brand>

      <navbar-collapse>
        <navbar-nav left>
          <router-link to="/module" @click.native="activeItem = 1;" active>
            <button
              type="button"
              class="btn btn-default"
              @click.native="toggleActiveState"
              :active="active"
            >
              <i class="fas fa-book mr-2"></i>Module
            </button></router-link
          >
          <router-link to="/careerview" @click.native="activeItem = 2;">
            <button
              type="button"
              class="btn btn-default"
              @click.native="toggleActiveState"
            >
              <i class="fas fa-graduation-cap mr-2"></i>Career
            </button></router-link
          >
        </navbar-nav>
        <navbar-nav right>
          <navbar-item
            href="https://github.com/zh-tan/VirtualSenpai"
            waves-fixed
            class="border border-light rounded mr-1"
            target="_blank"
            ><i class="fas fa-github"></i> GitHub
          </navbar-item>
        </navbar-nav>
      </navbar-collapse>
    </navbar>
  </div>
</template>

<script>
import {
  Container,
  Navbar,
  NavbarItem,
  NavbarNav,
  NavbarCollapse,
  Btn,
  Fa,
  ListGroup,
  ListGroupItem,
  CardBody,
  Footer,
  waves
} from "mdbvue";
import logo from "../assets/statistics.png";
export default {
  name: "AdminTemplace",
  components: {
    Container,
    Navbar,
    NavbarItem,
    NavbarNav,
    NavbarCollapse,
    Btn,
    ListGroup,
    ListGroupItem,
    Fa,
    CardBody,
    ftr: Footer
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggleActiveState() {
      this.active = !this.active;
    }
  }
};
</script>
<style scoped>
.module {
  margin-left: 20px;
}

.navbar.scrolling-navbar {
  padding-top: 5px;
  padding-bottom: 5px;
}

.button:not(:disabled):not(.disabled).active,
.button:not(:disabled):not(.disabled):active {
  background-image: none;
}
.button-default.dropdown-toggle {
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  background-color: #186860 !important;
}
</style>
