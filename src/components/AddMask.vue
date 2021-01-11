<template>
  <div class="form">
    <md-card class="md-layout-item md-size-45 md-small-size-100">
      <md-card-content>

        <div class="md-layout">
          <div class="md-layout-item md-small-size-100">
            <md-field md-clearable :class="getValidationClass('name')">
              <label for="name">Name your Mask</label>
              <md-input name="name" id="name" v-model="form.name"/>
              <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
              <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field md-clearable :class="getValidationClass('price')">
              <label for="price">Price</label>
              <span class="md-prefix">€</span>
              <md-input name="price" id="price" v-model="form.price"/>
              <span class="md-error" v-if="!$v.form.price.required">The price is required</span>
              <span class="md-error" v-else-if="!$v.form.price.minlength">Invalid price</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-switch v-model="form.vat">Includes VAT?</md-switch>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <label for="color">Color</label>
            <md-field id="color-field" :class="getValidationClass('color')">
              <v-swatches v-model="form.color" inline></v-swatches>
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-chips v-model="form.tags" :md-limit="10" md-placeholder="Add tags to make your mask easier to find!">
              <div class="md-helper-text">Up to 10 tags</div>
            </md-chips>
            <span>Recommended Tags: </span>
            <md-chip v-for="recTag in recTags" :key="recTag" class="md-primary" md-clickable v-model="recTags"
              @click="addTag(recTag)">{{recTag}}</md-chip>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <uploader v-model="form.image" :autoUpload="false" :title="'Upload Images'" :limit="10"></uploader>
            </md-field>
          </div>
        </div>

      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-secondary" @click="clearForm">Reset</md-button>
        <md-button class="md-raised md-primary">Upload Mask</md-button>
      </md-card-actions>

    </md-card>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { mapActions } from 'vuex';
import VSwatches from 'vue-swatches'
  import Uploader from "vux-uploader-component";
import 'vue-swatches/dist/vue-swatches.css'
  import {
    required,
    minLength,
    decimal,
    minValue
  } from 'vuelidate/lib/validators'

  export default {
    name: 'AddMask',
    mixins: [validationMixin],
     components: { VSwatches, Uploader},
    data: () => ({
      form: {
        name: null,
        price: null,
        vat: false,
        tags: [],
        image: [],
        color: null
      },
      recTags: ["Biodegradable", "N95 Filter", "Elastic Ear Bands", "Nose piece"],
      userSaved: false,
      lastUser: null
    }),
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        price: {
          required,
          decimal,
          minValue: minValue(0.1),
        },
        tags: {
          required: false
        },
        color: {
          required,
        }
      }
    },
    methods: {
      ...mapActions(['addMask']),
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      addTag(tag){
        if(!this.form.tags.filter(t => t === tag)[0]){
          this.form.tags.push(tag)
          let removeIndex = this.recTags.findIndex(x => x === tag)
          this.recTags.splice(removeIndex, 1)
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.name = null
        this.form.price = null
        this.form.color = null
        this.form.tags = []
        this.form.vat = false
        this.recTags= ["Biodegradable", "N95 Filter", "Elastic Ear Bands", "Nose piece"]
        this.form.image = []
      },
    },

  }
</script>
<style lang="scss" scoped>
#color-field{
    justify-content: center;
}
.form{
  display: flex;
  justify-content: center;
  margin-top:4px;

  .vux-uploader{
    width: 100%;
    padding: 0;
  }
}


</style>