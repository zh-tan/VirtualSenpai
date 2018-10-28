<template>
<div>
<div v-html="legacySystemHTML"></div>
<h1>Select Module</h1>

    <div class="sidebar-fixed position-fixed" v-show="false">
      <a class="logo-wrapper">VirtualSenpai</a>
      <list-group class="side-bar-group">
        <list-group-item :action="true" :class="activeItem === 3 && 'active'">
        <fa icon="camera-retro"></fa> camera-retro TEST </list-group-item>
      </list-group>
    </div>

<div class="modules">
  <div v-for="mod in mod_summary" :key="mod.code" style="{border: 1px solid #ff3366;}">
    <router-link :to="{ path : '/moduleview/'+mod.code}"><h5>{{mod.code}}</h5></router-link>
    <p>{{mod.mod_name}}</p>
    <p>Latest Feedback from: {{mod.latest_Sem}}</p>
    <p>Average Rating: {{mod.avr_rating}}</p>
    <br>
  </div>
</div>
    <!-- Sidebar -->

</div>
</template>

<script>
import { db } from "../firebase";
import { SideNav, Btn, Container, Fa, SubMenu , ListGroup, ListGroupItem} from 'mdbvue';
import '@fortawesome/fontawesome-free/css/all.css';

//db ref mods and extract module name and summaries
export default {
  name: "modSearch",
  components: {
    SideNav,
    Btn,
    Container,
    ListGroup,
    ListGroupItem,
    Fa,
    SubMenu,
  },
  data() {
    return {
      activeItem : 1,
      mod_summary:{},
      legacySystemHTML: `
        <FONT color="#faddad" size="-2">
          <MARQUEE>If you are looking at this, Good job. Fuck you understand? :)).</MARQUEE>
          ...
        </FONT>
      `
    };
  },
  mounted(){
    db.ref("/mod_summary").once("value")//need smaller dataset to quicken loading
      .then(snapshot => {
        this.mod_summary = snapshot.val();
      })
  },
  firebase: {},
  methods: {}
};
</script>


<style>


.sidebar-fixed {
  left: 0;
  top: 68px;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

</style>
