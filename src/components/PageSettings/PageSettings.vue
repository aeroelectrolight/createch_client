<style>
</style>

<template>
    <div>
      <h2 class="ui block header">
        <i class="icon settings"></i>
        <div class="content">Settings</div>
      </h2>
      <div class="ui grid">
        <div class="six wide column">
          <form class="ui form">
            <h4 class="ui dividing header">Couleurs</h4>
              <div class="field">
                <label>Couleurs :</label>
                <select v-model="colorselect">
                  <option v-for="color in couleurs" :value="color.id">{{color.title}}</option>
                </select>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addcolor" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editcolor" class="ui orange button" v-if="colorselect != 0">Edit</button>
                  <button type="button" @click="Deletecolor" class="ui red button" v-if="colorselect != 0">Delete</button>
                </div>
              </div>
              <div class="field">
                <label>Fonction :</label>
                <select v-model="functionselect">
                  <option v-for="fonction in fonctions" :value="fonction.id">{{fonction.title}}</option>
                </select>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addfunction" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editfunction" class="ui orange button" v-if="functionselect != 0">Edit</button>
                  <button type="button" @click="Deletefunction" class="ui red button" v-if="functionselect != 0">Delete</button>
                </div>
              </div>
              <div class="field">
                <label>Groupe :
                  <select v-model="groupselect">
                    <option v-for="groupe in groupes" :value="groupe.id">{{groupe.title}}</option>
                  </select>
                </label>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addgroup" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editgroup" class="ui orange button" v-if="groupselect != 0">Edit</button>
                  <button type="button" @click="Deletegroup" class="ui red button" v-if="groupselect != 0">Delete</button>
                </div>
              </div>
              <div class="field">
                <label>Convention :
                  <select v-model="conventionselect">
                    <option v-for="convention in conventions" :value="convention.id">{{ convention.title }}</option>
                  </select>
                </label>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addconvention" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editconvention" class="ui orange button" v-if="conventionselect != 0">Edit</button>
                  <button type="button" @click="Deleteconvention" class="ui red button" v-if="conventionselect != 0">Delete</button>
                </div>
              </div>
              <div class="field">
                <label>Lieu :
                  <select v-model="placeselect">
                    <option v-for="lieu in lieux" :value="lieu.id">{{ lieu.title }}</option>
                  </select>
                </label>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addplace" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editplace" class="ui orange button" v-if="placeselect != 0">Edit</button>
                  <button type="button" @click="Deleteplace" class="ui red button" v-if="placeselect != 0">Delete</button>
                </div>
              </div>
              <div class="field">
                <label>Personnel :
                  <select v-model="personnelselect">
                    <option v-for="personnel in personnels" :value="personnel.id">{{ personnel.user }}</option>
                  </select>
                </label>
              </div>
              <div class="field">
                <div class="ui mini buttons">
                  <button type="button" @click="Addpersonnel" class="ui blue button">
                    <i class="icon add square"></i>Add</button>
                  <button type="button" @click="Editpersonnel" class="ui orange button" v-if="personnelselect != 0">Edit</button>
                  <button type="button" @click="Deletepersonnel" class="ui red button" v-if="personnelselect != 0">Delete</button>
                </div>
              </div>
          </form>
        </div>
        <div class="ten wide column">
          <couleur-form :colorvisible="colorshow" :colorid="colorid" @closed="Hidecolorform"></couleur-form>
          <fonction-form :functionvisible="functionshow" :functionid="functionid" @closed="Hidefunctionform"></fonction-form>
          <groupe-form :groupvisible="groupeshow" :groupid="groupid" @closed='Hidegroupeform'></groupe-form>
          <convention-form :conventionvisible="conventionshow" :conventionid="conventionid" @closed="Hideconventionform"></convention-form>
          <lieu-form :placevisible="placeshow" :placeid="placeid" @closed="Hideplaceform"></lieu-form>
          <personnel-form :personnelvisible="personnelshow" :personnelid="personnelid" @closed="Hidepersonnelform"></personnel-form>
        </div>
      </div>
    </div>
</template>


<script type="text/babel">
import CouleurFormComponent from 'src/components/PageSettings/Forms/CouleurForm.vue'
import FonctionFormComponent from 'src/components/PageSettings/Forms/FonctionForm.vue'
import GroupeFormComponent from 'src/components/PageSettings/Forms/GroupeForm.vue'
import ConventionFormComponent from 'src/components/PageSettings/Forms/ConventionForm.vue'
import LieuFormComponent from 'src/components/PageSettings/Forms/LieuForm.vue'
import PersonnelFormComponent from 'src/components/PageSettings/Forms/PersonnelForm.vue'
import { mapActions } from 'vuex'

/* eslint-disable no-new */
export default {
  components: {
    couleurForm: CouleurFormComponent,
    fonctionForm: FonctionFormComponent,
    groupeForm: GroupeFormComponent,
    ConventionForm: ConventionFormComponent,
    LieuForm: LieuFormComponent,
    PersonnelForm: PersonnelFormComponent
  },
  data () {
    return {
      colorshow: false,
      colorselect: '',
      colorid: 0,
      functionshow: false,
      functionselect: '',
      functionid: 0,
      groupeshow: false,
      groupselect: '',
      groupid: 0,
      conventionshow: false,
      conventionselect: '',
      conventionid: 0,
      placeshow: false,
      placeselect: '',
      placeid: 0,
      personnelshow: false,
      personnelselect: '',
      personnelid: 0
    }
  },
  computed: {
    couleurs () {
      return this.$store.getters.couleurs
    },
    fonctions () {
      return this.$store.getters.fonctions
    },
    groupes () {
      return this.$store.getters.groupes
    },
    conventions () {
      return this.$store.getters.conventions
    },
    lieux () {
      return this.$store.getters.lieux
    },
    personnels () {
      return this.$store.getters.personnels
    }
  },
  methods: {
    ...mapActions([
      'deleteCouleur',
      'deleteFonction',
      'deleteGroupe',
      'deleteConvention',
      'deleteLieu',
      'deletePersonnel'
    ]),
    Hidecolorform: function () {
      this.colorid = 0
      this.colorshow = false
    },
    Addcolor: function () {
      this.colorid = 0
      this.colorshow = true
    },
    Editcolor: function () {
      this.colorid = this.colorselect
      this.colorshow = true
    },
    Deletecolor: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer cette couleur ?')) {
        this.deleteCouleur(this.colorselect)
      }
    },
    Hidefunctionform: function () {
      this.functionid = 0
      this.functionshow = false
    },
    Addfunction: function () {
      this.functionshow = true
      this.functionid = 0
    },
    Editfunction: function () {
      this.functionshow = true
      this.functionid = this.functionselect
    },
    Deletefunction: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer cette fonction ?')) {
        this.deleteFonction(this.functionselect)
      }
    },
    Hidegroupeform: function () {
      this.groupid = 0
      this.groupeshow = false
    },
    Addgroup: function () {
      this.groupid = 0
      this.groupeshow = true
    },
    Editgroup: function () {
      this.groupid = this.groupselect
      this.groupeshow = true
    },
    Deletegroup: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer ce groupe ?')) {
        this.deleteGroupe(this.groupselect)
      }
    },
    Hideconventionform: function () {
      this.conventionid = 0
      this.conventionshow = false
    },
    Addconvention: function () {
      this.conventionshow = true
    },
    Editconvention: function () {
      this.conventionid = this.conventionselect
      this.conventionshow = true
    },
    Deleteconvention: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer cette convention ?')) {
        this.deleteConvention(this.conventionselect)
      }
    },
    Hideplaceform: function () {
      this.placeid = 0
      this.placeshow = false
    },
    Addplace: function () {
      this.placeshow = true
    },
    Editplace: function () {
      this.placeshow = true
      this.placeid = this.placeselect
    },
    Deleteplace: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer ce lieu ?')) {
        this.deleteLieu(this.placeselect)
      }
    },
    Hidepersonnelform: function () {
      this.personnelid = 0
      this.personnelshow = false
    },
    Addpersonnel: function () {
      this.personnelshow = true
    },
    Editpersonnel: function () {
      this.personnelshow = true
      this.personnelid = this.personnelselect
    },
    Deletepersonnel: function () {
      if (window.confirm('Etes-vous certain de vouloir supprimer cette personne ?')) {
        this.deletePersonnel(this.personnelselect)
      }
    }
  } // end of methods
} // end of export default

</script>
