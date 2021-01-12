<template>
    <div class="mask">
        <md-card>
            <md-card-media>
                <img :src="mask.image">
            </md-card-media>
            <div>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title primary">{{ mask.name }}</div>
                        <div class="md-subhead primary">{{ formatDate(mask.date) }}</div>
                    </md-card-header-text>

                    <md-menu md-size="big" md-direction="bottom-end">
                        <md-button class="md-icon-button" md-menu-trigger>
                            <md-icon class="primary">more_vert</md-icon>
                        </md-button>

                        <md-menu-content>
                            <md-menu-item :to="`/product-edit/${mask._id}`">
                                <span>Edit</span>
                                <md-icon class="md-primary">edit</md-icon>
                            </md-menu-item>

                            <md-menu-item @click="deleteMask(mask)">
                                <span>Delete</span>
                                <md-icon class="md-primary">delete</md-icon>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </md-card-header>
                <md-card-content>
                    <div class="md-title price">{{ mask.price }} €</div>
                </md-card-content>

                <md-card-expand>

                    <md-card-actions md-alignment="space-between">
                        <div></div>
                        <md-card-expand-trigger>
                            <md-button class="md-primary">More Info
                                <md-icon class="md-primary">keyboard_arrow_down</md-icon>
                            </md-button>
                        </md-card-expand-trigger>
                    </md-card-actions>

                    <md-card-expand-content>
                        <md-card-content>
                            <div class="container">
                                <span>Tags:</span><br>
                                <div class="chips">
                                    <md-chip v-for="tag in mask.tags" :key="tag" class="md-primary">{{tag}}</md-chip>
                                </div>

                            </div>
                            <div class="container">
                                <span>Color:</span>
                                <md-icon class="color-icon" :style="{ color: mask.color }">format_color_fill</md-icon>
                            </div>
                        </md-card-content>
                    </md-card-expand-content>

                </md-card-expand>
            </div>
        </md-card>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment';
export default {
    name: 'MaskItem',
    props: {
        mask: {
            type: Object,
            required: true
        },
    },
    methods: {
        ...mapActions(['deleteMask']),
        formatDate(date) {
            return moment(date).format("hh:mm Do MMM, YYYY")
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "./../styles/_variables.scss";

  .mask {


      .primary {
          color: $hp-blue !important
      }

      .md-chip {
          margin-bottom: 4px;
      }

      .md-card {
          
          width: 302px;
          margin: 4px;
      }

      .md-card-expand {
          width: 100%;

          .md-card-expand-content {
              border-top: 1px solid $hp-blue;

              .md-card-content:last-of-type {
                  padding-bottom: 10px;

                  .container {
                      margin-bottom: 10px;

                      .chips {
                          margin-top: 5px;
                      }

                      span {
                          color: $hp-blue;
                      }
                      .color-icon{
                        -webkit-text-stroke-width: 1px;
                        -webkit-text-stroke-color: #000;
                        font-size: 30px !important;
                        margin-left: 5px;
                      }
                  }
              }

          }

      }

      .md-button-group {
          display: flex;
      }

      .md-button {
          min-width: 60px;
          border-radius: 2px;
      }

      .price {
          color: $hp-green;
          float: left
      }
  }
</style>

