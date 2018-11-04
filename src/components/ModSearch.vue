<template>
<div>
<div v-if="false" v-html="legacySystemHTML"></div>

<div class="container">
    <div class="row">
        <div class="col-lg-3">
             <div class="sidebar-fixed position-fixed" v-show="true">
      <br>
        <div>
    <b-form-input v-model="search"
                  type="text"
                  placeholder="Search Modules"></b-form-input>

  </div>

      <br>
      <h4>Categories</h4>
<div class='radioLeft'>
<b-form-group>
      <b-form-radio-group v-model="selected"
                          :options="options"
                          stacked
                          name="radiosStacked">
      </b-form-radio-group>
    </b-form-group>
    </div>
    </div>
        </div>
        <div class="col-lg-8">
<div class="module">
<h1>Select Module</h1>
  <div v-for="mod in this.filteredModule" :key="mod_summary[mod].code" class = "mod_info">
    <div>
    <router-link :to="{ path : '/moduleview/'+mod_summary[mod].code}"><h5>{{mod_summary[mod].code}}</h5></router-link>
    <p>{{mod_summary[mod].mod_name}}</p>
    </div>
    <div>
    <p>Latest Feedback from: {{mod_summary[mod].latest_Sem}}</p>
    <p :class="{red_rating:mod_summary[mod].avr_rating<3,green_rating:mod_summary[mod].avr_rating>=3}">Average Rating: {{mod_summary[mod].avr_rating}} / 5</p>
    </div>
</div>
</div>
        </div>
        </div>
    </div>


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
      search: '',
      selected: 'first',
      options: [
        { text: 'All Faculties', value: 'all' },
        { text: 'School of Business', value: 'Business' },
        { text: 'School of Computing', value: 'Computing' },
        { text: 'School of Design and Environment', value: 'design and environment' },
        { text: 'Arts & Social Sciences', value: 'Social Sciences' },
        { text: 'Science', value: 'Science'},
        { text: 'Engineering', value: 'Engineering'},
        { text: 'Law', value: 'Law'},
        { text: 'Others', value: 'Others'}
      ],
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
  computed:{
    filteredModule: function(){
      return Object.keys(this.mod_summary).filter((mod)=>{
        return mod.toLowerCase().includes(this.search.toLowerCase())
        })
    }
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
.mod_info{
  border: 1px solid black;
  display:grid;
  grid-template-columns: 1fr 1fr;
}
.red_rating{
  color:red;
}
.green_rating{
  color:green;
}
.radioLeft
{
    text-align:left;
}


</style>
