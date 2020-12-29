<template>
 <div class="log-wrapper">
   <div class="log-header">
    <h2 class="lists-title heading">Log Lists</h2>
    <div class="delete-wrapper">
      <button
        class="delete-button"
        @click="deleteAll()" 
      >
        <v-icon dark>mdi-delete</v-icon>
      </button>
      <p class="delete-text">All Delete</p>
    </div>
   </div>
   <ul v-if="timeLogLists.length > 0">   
    <li 
      class="log-card card" 
      v-for="(item,index) in timeLogLists" 
      :key="item.id"
    >
      <div class="card-inner">
        <button class="close-icon"
          @click="deleteItem(index)"
        >
          <v-icon dark>mdi-close</v-icon>
        </button>
        <input 
          type="text"
          
          v-model="item.title"
          class="title-form"
        >
        <p class="log-time">{{ item.time | toHourMin }}</p>
        <p class="by-time">-{{ item.finishHours | toClockTime }}:{{ item.finishMinutes | toClockTime  }}</p>
      </div>
    </li>
  </ul>
  <ul v-else class="no-list-info">
    <li class="log-card card">Let's log your efforts!</li>
  </ul>
 </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend ({
  props: {
    timeLogLists: Array,
  },
  filters: {
    toHourMin: function(value:number):string {
      const hours :string = Math.floor(value /3600).toString()
      const min :string = ("0" + Math.floor(value % 3600 / 60).toString()).slice(-2)
      return `${ hours }h${ min }min`
    },
    toClockTime: function(value:number):string {
      return ("0" + value.toString()).slice(-2)
    }    
  }, 
  methods: {
    deleteItem(index :number) :void {
      this.$emit('deleteItem',index)
    },
    deleteAll() :void {
      if(confirm('All Delete Ok?')) {
        this.$emit('deleteAll')
      }
    }
  }
})
</script>

<style lang="scss" scoped>

.log-wrapper {
  margin-bottom: 80px;
}

.no-list-info {
  text-align:center;
  li {
    line-height: 90px;
  }
}
.log-card {
  height: 90px;
  margin-bottom: 10px;
  .card-inner {
    display: grid;
    grid-template:
      "..... ..... ..... ..... ..... ..... ..... .....  ....." 32px
      "..... close ..... title ..... time ..... by-time ....."
      "..... ..... ..... ..... ..... ..... ..... .....  ....." 32px
      / 24px  24px 20px  526px  20px 90px  1fr    70px    24px;
    .close-icon {
      grid-area: close;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-form {
      grid-area: title;
      color: #fff;
    }
    .log-time {
      grid-area: time;
    }
    .by-time {
      grid-area: by-time;
    }
  }
}


 .log-header {
   text-align: center;
   margin-bottom: 15px;
   .delete-wrapper {
     display: flex;
     align-self: flex-end;
     justify-content: space-between;
     width: 130px;
     color: #fff;
     .delete-text {
       font-size: 20px;
     }
   }
   .lists-title {
     font-size: 30px;
     margin-bottom: 15px;
   }
 }
</style>
