<template>
  <div>
    <br />
    <div v-if="false" v-html="legacySystemHTML"></div>

    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="sidebar-fixed position-fixed" v-show="true">
            <br />
            <div>
              <b-form-input
                v-model="search"
                type="text"
                placeholder="Search Modules"
              ></b-form-input>
            </div>

            <br />
            <h4>Categories</h4>
            <div class="radioLeft">
              <b-form-group>
                <b-form-radio-group
                  v-model="selected"
                  :options="options"
                  stacked
                  name="radiosStacked"
                >
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="module">
            <h1>Select Module</h1>
            <div
              v-for="mod in mod_summary"
              :key="mod.code"
              class="mod_info"
              v-if="modFiltering(mod)"
            >
              <br />
              <card style="width: 50rem;">
                <router-link :to="{ path: '/moduleview/' + mod.code }"
                  ><card-header color="default-color" style="font-size:1.5em"
                    >{{ mod.code }}: {{ mod.mod_name }}</card-header
                  ></router-link
                >
                <card-body
                  style="display:grid; grid-template-columns: 3fr 2fr ; margin: 5px; padding: 0px;"
                >
                  <div style="text-align:left;text-indent: 120px">
                    <card-text
                      ><h5>
                        Latest Feedback from: {{ mod.latest_Sem }}
                      </h5></card-text
                    >
                    <card-text
                      ><h5>Prof In-charge: {{ mod.prof.name }}</h5></card-text
                    >
                  </div>
                  <div>
                    <card-text
                      ><h5>Average Rating:</h5>
                      <h1
                        :class="{
                          red_rating: mod.avr_rating < 3,
                          green_rating: mod.avr_rating >= 3
                        }"
                      >
                        {{ mod.avr_rating }} / 5
                      </h1></card-text
                    >
                  </div>
                </card-body>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import {
  Btn,
  Container,
  Fa,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Badge
} from "mdbvue";
import "@fortawesome/fontawesome-free/css/all.css";

//db ref mods and extract module name and summaries
export default {
  name: "modSearch",
  components: {
    Btn,
    Container,
    ListGroup,
    ListGroupItem,
    Fa,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Badge
  },
  data() {
    return {
      search: "",
      selected: "all",
      options: [
        { text: "All Faculties", value: "all" },
        { text: "School of Business", value: "Business" },
        { text: "School of Computing", value: "Computing" },
        {
          text: "School of Design and Environment",
          value: "design and environment"
        },
        { text: "Arts & Social Sciences", value: "Social Sciences" },
        { text: "Science", value: "Science" },
        { text: "Engineering", value: "Engineering" },
        { text: "Law", value: "Law" },
        { text: "Others", value: "Others" }
      ],
      activeItem: 1,
      mod_summary: {},
      legacySystemHTML: `
        <FONT color="#faddad" size="-2">
          <MARQUEE>If you are looking at this, Good job. Fuck you understand? :)).</MARQUEE>
          ...
        </FONT>
      `
    };
  },
  mounted() {
    db.ref("/mod_summary")
      .once("value") //need smaller dataset to quicken loading
      .then(snapshot => {
        this.mod_summary = snapshot.val();
      });
  },
  computed: {
    category() {
      if (this.selected === "Business") {
        return "acc";
      } else if (this.selected === "Computing") {
        return "cs";
      } else if (this.selected === "design and environment") {
        return "ar";
      } else if (this.selected === "Social Sciences") {
        return "ec";
      } else if (this.selected === "Science") {
        return "pc";
      } else if (this.selected === "Engineering") {
        return "ce";
      } else if (this.selected === "Law") {
        return "lc";
      } else {
        return "";
      }
    }
  },
  firebase: {},
  methods: {
    modFiltering(mod) {
      let catMatch = mod.code
        .toLowerCase()
        .includes(this.category.toLowerCase());

      let codeMatch = mod.code
        .toLowerCase()
        .includes(this.search.toLowerCase());
      let nameMatch = mod.mod_name
        .toLowerCase()
        .includes(this.search.toLowerCase());
      if (this.search.length < 3) {
        nameMatch = false;
      }
      return nameMatch | codeMatch && catMatch;
    }
  }
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
.mod_info {
  //border: 1px solid black;
  //display:grid;
  //grid-template-columns: 1fr 1fr;
}
.red_rating {
  color: red;
}
.green_rating {
  color: green;
}
.radioLeft {
  text-align: left;
}
</style>
