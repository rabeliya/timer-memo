<template>
  <div class="total-log-wrapper">
    <h2 class="heading">Total Log</h2>
    <div class="log-contents card">
      <p class="log-total-time">{{ totalTime | toHourMin }}</p>
      <ul class="progress-bar">
        <li class="progress-color"
          v-for="(item,index) in resultLists" :key="item.id"
          :style="{background:iconColor(index),width: barWidth(item.time,totalTime)+'px'}">
        </li>
      </ul>
      <ul class="log-lists">
        <li
          class="log-list"
          v-for="(item,index) in resultLists"
          :key="item.id"
        >
          <span class="color-icon" :style="{background:iconColor(index)}"></span>
          <p class="log-title">{{ item.name }}</p>
          <p class="log-time">{{ item.time | toHourMin }}</p>
          <p class="time-ratio">
            {{ calcPercent(item.time,totalTime)+'%' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  props: {
    resultLists: Array,
  },
  data:() => ({
  }), 
  filters: {
    toHourMin: function(value:number) :string {
      const hours :number = Math.floor(value /3600)
      const min :string = ("0" + Math.floor(value % 3600 / 60)).slice(-2)
      return `${ hours }h${ min }min`
    }
  },
  methods: {
    calcPercent(time:number,total:number) :number {
      if(total !== 0)
      { return Math.floor(time / total * 100) }
      return 0 
    },
    barWidth(time :number,totalTime:number) :number{
      const wrapperWidth = 756;        
      return Math.floor(wrapperWidth * (time / totalTime));                            
    },  
  },
  computed: {
    totalTime() :number{
      if(this.resultLists.length !== 0) {
        const sum:any = this.resultLists.reduce(
          (prev, current :any) =>  prev + (current.time || 0),0
        )
        return sum;
      }
      return 0
    },
    iconColor() {
      return function(index:number) {
        if(index === 0 ) return '#E23046'
        if(index === 1 ) return '#F7B000'
        if(index === 2 ) return '#9BB51C'
        if(index === 3 ) return '#199C9B'
        if(index === 4 ) return '#287BAB'
        return '#9C4F89'          
      }
    },
  },
})
</script>

<style lang="scss" scoped>

.total-log-wrapper {
  .heading {
    margin-bottom: 50px;
    text-align: center;
  }
  .log-contents {
    padding: 30px 22px 50px;
    .log-total-time {
      text-align: center;
      font-size: 30px;
      margin-bottom: 30px;
    }
    .progress-bar {
      display: flex;
      height: 17px;
      margin-bottom: 15px;
      background: #5C5C5C;
      .progress-color {
        height: 100%;
      }
    }
  }
}

.log-list {
  display: grid;
  grid-template:
    "..... ..... ..... ..... ..... ..... ..... ..... ....." 16px
    ".....  icon ..... title ..... time .....  ratio ....."  1fr
    "..... ..... ..... ..... ..... ..... ..... ..... ....." 16px
     /0px  18px   15px 530px 20px  70px   1fr  45px   0px
  ;
  font-size: 16px;
  border-bottom: 1px #fff solid;
  .color-icon {
    grid-area: icon;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: red;
    margin: auto 0;
  }
  .log-title {
    grid-area: title;
  }
  .log-time {
    grid-area: time;
  }
  .time-ratio {
    grid-area: ratio;
  }
}

</style>
