<template>
  <div class="form">
    <md-card class="md-layout-item md-size-45 md-small-size-100">
      <md-card-content>

        <div class="md-layout">
          <div class="md-layout-item md-small-size-100">
            <md-field md-clearable :class="getValidationClass('name')">
              <label for="name">Name your Mask</label>
              <md-input name="name" id="name" v-model="form.name" />
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
              <md-input name="price" id="price" v-model="form.price" />
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
            <md-chips v-model="form.tags" :md-limit="9" md-placeholder="Add tags to make your mask easier to find!">
              <div class="md-helper-text">Up to 9 tags</div>
            </md-chips>
            <span>Recommended Tags: </span>
            <md-chip v-for="recTag in recTags" :key="recTag" class="md-primary" md-clickable v-model="recTags"
              @click="addTag(recTag)">{{recTag}}</md-chip>
          </div>
        </div>

        <div class="md-layout-item md-small-size-100">
          <md-field md-clearable :class="getValidationClass('image')">
            <label for="image">Image link</label>
            <md-input name="image" id="image" v-model="form.image" />
            <span class="md-error" v-if="!$v.form.image.required">The immage is required</span>
            <span class="md-error" v-else-if="!$v.form.image.minlength">Invalid url</span>
          </md-field>
          
        </div>
        <img v-if="form.image" class="preview" :src="form.image" alt="">
        <!-- <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <uploader v-model="form.image" :autoUpload="false" :title="'Upload Images'" :limit="10"></uploader>
              <input type="file" @change="onFileChanged">
            </md-field>
          </div>
        </div> -->

      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-secondary" @click="clearForm">Reset</md-button>
        <md-button class="md-raised md-primary" @click="validateForm">Upload Mask</md-button>
      </md-card-actions>

    </md-card>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { mapActions, mapGetters } from 'vuex';
  import VSwatches from 'vue-swatches'
  // import Uploader from "vux-uploader-component";
  import 'vue-swatches/dist/vue-swatches.css'
  import {required, minLength, decimal, url, minValue} from 'vuelidate/lib/validators'

  export default {
    name: 'AddMask',
    mixins: [validationMixin],
    components: {
      VSwatches,
      //  Uploader
    },
    data: () => ({
      editing: false,
      form: {
        name: null,
        price: null,
        vat: false,
        tags: [],
        image: null,
        color: null
      },
      recTags: ["Microfiber", "Light", "Polyester", "Double Layer", "Closed", "Triple Layer", "For Kids"],
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
        },
        image: {
          required,
          url
        }
      }
    },
    computed: mapGetters(['getMask']),
    methods: {
      ...mapActions(['addMask', 'updateMask']),
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      addTag(tag) {
        if (!this.form.tags.filter(t => t.toUpperCase() === tag.toUpperCase())[0]) {
          this.form.tags.push(tag.replace(/^\w/, (c) => c.toUpperCase()))
          let removeIndex = this.recTags.findIndex(x => x === tag)
          this.recTags.splice(removeIndex, 1)
        }
      },
      async validateForm() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          await this.uploadMask()
        }
      },
      async uploadMask() {
        // let images = []
        // for (let image of this.form.image) {
        //   images.push(image.blob)
        // }
        // let mask = {
        //   color: this.form.color,
        //   image: images,
        //   name: this.form.name,
        //   price: this.form.price,
        //   tags: this.form.tags,
        //   vat: this.form.vat
        // }

        await this.editing ? this.updateMask(this.form) : this.addMask(this.form)
        this.$router.push('/')
      },
      clearForm() {
        this.$v.$reset()
        this.form.name = null
        this.form.price = null
        this.form.color = null
        this.form.tags = []
        this.form.vat = false
        this.recTags = ["Microfiber", "Light", "Polyester", "Double Layer", "Closed", "Triple Layer", "For Kids"]
        this.form.image = null
      }
    },
    created() {
      const maskId = this.$route.params.id
      if (maskId) {
        let mask = this.getMask(maskId)
        this.editing = true
        this.form = mask;
      }
    }

  }
</script>
<style lang="scss" scoped>
#color-field {
  justify-content: center;
}

.form {
  display: flex;
  justify-content: center;
  margin-top: 4px;
  .preview{
    width: 302px;
    height: 302px;
    border: 1px solid grey;
    border-radius: 10px;
  }
  // .vux-uploader {
  //   width: 100%;
  //   padding: 0;
  // }
}
</style>