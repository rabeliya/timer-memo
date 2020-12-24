<template>
  <div>
    <TimerApp
      @emitLogItem="receiveLogItem"
    />
    <LogLists 
      :timeLogLists = "timeLogLists"
      @deleteItem = "deleteItem"
      @deleteAll="deleteAll()"

    />
    <TotalLog
      :resultLists="resultLists"
    />
  </div>
</template>
<script lang="ts">
// this is pages

import Vue from 'vue'
import TimerApp from "~/components/TimerApp.vue"
import LogLists from "~/components/LogLists.vue"
import TotalLog from "~/components/TotalLog.vue"

export default Vue.extend({
  components: {
    TimerApp,
    LogLists,
    TotalLog,
  },
  data: () => ({
    timeLogLists: [
      {
        time: 500,
        finishHours: 1,
        finishMinutes: 40,
        title: "Something1"
      },
      {
        time: 3600,
        finishHours: 17,
        finishMinutes: 42,
        title: "Something2"
      },
      {
        time: 3600,
        finishHours: 17,
        finishMinutes: 42,
        title: "Something3"
      },
    ],
    resultLists: [],
  }),
  created() {
    this.processLists();
  },
  methods: {
    changeActive(value : Boolean) {
      value = ! value
    },
    receiveLogItem(logItem :any) {
      logItem.title = "newLog"
      this.timeLogLists.push(logItem)
    },
    deleteItem(index :number) {
      if(confirm('delete OK?')) {
        this.timeLogLists.splice(index,1)
      }
    },
    processLists() {
      const object:any = [...this.timeLogLists].reduce(
        (object:any, current:any) => {
        const name = current.title
        if(object.hasOwnProperty(name)) {
          object[name] += current.time
        } else {
          object[name] = current.time
        }
        return object
      },{})
      const filterdLog :any = Object.keys(object).map(function (key) {
        return { name: key, time: object[key] };
      })
      //sort
      this.resultLists = filterdLog.slice().sort((a:any, b:any) => {
      if (a.time < b.time) return 1
      if (a.time > b.time) return -1
      return 0
      })
    },
    deleteAll() {
      this.timeLogLists.splice( - this.timeLogLists.length)
    }        
  },
   watch: {
    timeLogLists: {
      handler :function() {
        this.processLists();
      },
      deep: true,
    }   
  },
  computed: {
    makeResultLists: {
      get: function() {
        return this.resultLists
      },
      set: function(value:any) {
        const object:any = value.reduce(
          (object:any, current:any) => {
          const name = current.title
          if(object.hasOwnProperty(name)) {
            object[name] += current.time
          } else {
            object[name] = current.time
          }
          return object
        },{})
        const filterdLog :any = Object.keys(object).map(function (key) {
          return { name: key, time: object[key] };
        })
        //sort
        this.resultLists = filterdLog.slice().sort((a:any, b:any) => {
        if (a.time < b.time) return 1
        if (a.time > b.time) return -1
        return 0
        })
      }
    }
  }
  // mounted: function () {
    
  //   const gotItem :String = JSON.parse(localStorage.getItem("timeLogLists"))
  //   this.timeLogLists = gotItem
  // },
})
</script>

<style lang="scss" scoped>
  


</style>
