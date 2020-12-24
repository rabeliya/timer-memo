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
        <!-- buttonの修正から -->
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
        <p class="log-time">{{ resultTime(index) }}</p>
        <p class="by-time">{{ currentTime(index) }}</p>
      </div>
    </li>
  </ul>
  <ul v-else class="no-list-info">
    <li class="log-card card">Let's log your efforts!</li>
  </ul>
 </div>
</template>

<script lang="ts">
export default {
  props: {
    timeLogLists: Array,
    // logTitle: String
  },
  methods: {
    deleteItem(index :number) {
      this.$emit('deleteItem',index)
    },
    deleteAll() {
      if(confirm('All Delete Ok?')) {
        this.$emit('deleteAll')
      }
    }
  },
  computed: {
    resultTime() {
      const self = this
      return function(index :number) {
        const item :any = self.timeLogLists[index]
        const resultHours :number = Math.floor(item.time /3600)
        const resultMin :number = Math.floor(item.time % 3600 / 60)
        return `${ resultHours }h${ resultMin }min`
      }
    },
    currentTime() {
      const self = this
      return function(index :number) {
        const item :any = self.timeLogLists[index]
        const min = ("0" + item.finishMinutes).slice(-2)
        const hour = ("0" + item.finishHours).slice(-2)
        return `-${ hour }:${ min }`
      }
    },
  }
}
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
