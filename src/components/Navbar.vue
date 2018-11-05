<template>
  <div class="flexible-content">
    <!--Navbar-->
    <navbar expand = "large" dark class = "red" position="top" scrolling>
      
      <mdb-navbar-brand href="#">
    <h4>VirtualSenpai! </h4>
  </mdb-navbar-brand>

      <navbar-collapse>
        <navbar-nav left>
          <router-link to="/module" @click.native="activeItem = 1" active><navbar-item href="" waves-fixed active>Module</navbar-item></router-link>
          <router-link to="/careerview" @click.native="activeItem = 2"><navbar-item href="" waves-fixed active>Career</navbar-item></router-link>
        </navbar-nav>
        <navbar-nav right>
          <navbar-item href="https://github.com/zh-tan/VirtualSenpai" waves-fixed class="border border-light rounded mr-1" target="_blank"><fa icon="github" class="mr-2"/> GitHub </navbar-item>
        </navbar-nav>
      </navbar-collapse>
    </navbar>
    </div>
</template>

<script>
import { Container, Navbar, NavbarItem, NavbarNav, NavbarCollapse, Btn, Fa, ListGroup, ListGroupItem, CardBody, Footer, waves } from 'mdbvue'
export default {
  name: 'AdminTemplace',
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
    'ftr': Footer
  },
  data() {
    return {};
  }
};
</script>
