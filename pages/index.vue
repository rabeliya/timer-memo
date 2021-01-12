<template>
  <div>
    <TimerApp
      @emitLogItem="receiveLogItem"
    />
    <LogLists 
      :timeLogLists = "timeLogLists"
      @deleteSelectedItem="deleteSelectedItem"
    />
    <TotalLog
      :resultLists="resultLists"
    />
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import TimerApp from "~/components/TimerApp.vue"
import LogLists from "~/components/LogLists.vue"
import TotalLog from "~/components/TotalLog.vue"

interface LogLists {
  time: number;
  finishHours: number;
  finishMinutes: number;
  title:string;
}

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
    receiveLogItem(logItem : LogLists ) {
      logItem.title = "newLog"
      this.timeLogLists.push(logItem)
    },
    deleteSelectedItem(arr :number[]) {
      const self = this;
      [...arr].sort((a,b) => (a < b ? 1 : -1)).forEach(elem => {
        self.timeLogLists.splice(elem,1)
      })
    },
    processLists() {
      // Sum proccess
      const object:any = [...this.timeLogLists].reduce(
        (object:any, current:any) => {
        const name :string = current.title
        if(object.hasOwnProperty(name)) {
          object[name] += current.time
        } else {
          object[name] = current.time
        }
        return object
      },{})
      // Form object
      const filterdLog :any = Object.keys(object).map((key) => {
        return { name: key, time: object[key] };
      })
      // Arrange in descending order
      this.resultLists = filterdLog.slice().sort((a:any, b:any) => {
      if (a.time < b.time) return 1
      if (a.time > b.time) return -1
      return 0
      })
    },  
  },
   watch: {
    timeLogLists: {
      handler :function() :void {
        this.processLists();
        const parsed = JSON.stringify(this.timeLogLists)
        localStorage.setItem('timeLogLists', parsed)        
      },
      deep: true,
    },      
  }, 
  mounted: function () :void {
    if(localStorage.getItem('timeLogLists')) {
      const storedLogs = localStorage.getItem('timeLogLists')
      try {
        if(typeof storedLogs === 'string') {
          this.timeLogLists = JSON.parse(storedLogs)
        }
      } catch(e) {
        localStorage.removeItem('timeLogLists')
      }
    }    
  } 
})
</script>

<style lang="scss" scoped>
</style>
