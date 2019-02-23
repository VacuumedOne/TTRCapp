<template>
  <div class="top">
    <v-container class="container" fluid grid-list-md>
      <v-layout class="row" row wrap align-content-start>
        <v-flex d-flex xs12 md6>
          <v-layout column wrap>
            <v-flex grow d-flex md4>
              <v-card class="card yet" v-ripple color="orange">
                <v-card-title primary class="title">エルゴを記録する</v-card-title>
                <v-card-text>エルゴの高みを目指す。</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow d-flex md4>
              <v-card class="card" v-ripple color="orange" @click="sendToParent('WeightRegister')">
                <v-card-title primary class="title">ウェイトを記録する</v-card-title>
                <v-card-text>強靭な肉体を求める。</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow d-flex md4>
              <v-card class="card yet" v-ripple color="orange">
                <v-card-title primary class="title">その他の種目を記録する</v-card-title>
                <v-card-text>自由になんでも管理する。</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6>
          <v-layout column wrap justify-space-around class="column">
            <v-flex grow d-flex md6>
              <v-card class="card" v-ripple color="green" @click="sendToParent('PersonalView')">
                <v-card-title primary class="title">自分の記録を見る</v-card-title>
                <v-card-text>自分の成長を見る。</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow d-flex md6>
              <v-card class="card yet" v-ripple color="green">
                <v-card-title primary class="title">チームの記録を見る</v-card-title>
                <v-card-text>部の状況を把握する。</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>  
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Top',
  methods: {
    sendToParent: function (data) {
      //親に遷移したいstateを送る
      this.$emit('send', data)
    }
  }
}
</script>

<style lang="sass" scoped>
.top
  text-align: left
  display: table
  margin: 0px
.sidebar
  display: table-cell
  width: 300px
  height: 100%
  vertical-align: top
.main
  display: table-cell
  height: 100%
  text-align: center
  vertical-align: middle
.card
  margin: 0.5%
.yet
  opacity: 0.4
</style>
