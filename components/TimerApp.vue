<template>
  <div class="timer">
    <p class="time">{{ countTime }}</p>
    <div class="timer-buttons">
      <v-btn
        elevation="2"
        fab
        icon
        class="button reset-button"         
        :class="{ disabled: isActive }"
        @click="resetTime"
      >
        <v-icon>mdi-replay</v-icon>
      </v-btn>
      <v-btn
        v-if="!isActive"
        elevation="2"
        fab
        icon
        class="button play-button"
        @click="playAndStop()"
        :class="{ disabled : playInterval }"         
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        v-if="isActive"
        elevation="2"
        fab
        icon
        class="button stop-button"
        @click="playAndStop();toggleDisable();setDate()"         
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        elevation="2"
        fab
        icon
        class="button done-button"         
        :class="{ disabled: isActive || sec === 0 }"
        @click="addLog()"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { NULL } from 'node-sass'

export default Vue.extend ({
  data: ()=> ({
    isActive: false as boolean,
    sec: 0 as number,
    playInterval: false as boolean,
    finishHours: 0 as number,
    finishMinutes: 0 as number
  }), 
  methods: {
    changeIsActive() :void {
      this.isActive = ! this.isActive
    },
    count() :void {
      this.sec ++
    },
    playAndStop():void {
      let timerId:number = 0
      const self = this    
      this.changeIsActive();
      timerId = window.setInterval(()=> {
        if(self.isActive) {
          self.count();
        } else {
          window.clearInterval(timerId);
        }
      }, 1000)
    },
    toggleDisable():void {
      this.playInterval = true
      setTimeout(() => {
        this.playInterval = false
      }, 700);
    },
    setDate():void {
      const date = new Date()
      this.finishHours = date.getHours()
      this.finishMinutes = date.getMinutes()
    },
    addLog():void {
      const logItem = {
        time: this.sec,
        finishHours: this.finishHours,
        finishMinutes: this.finishMinutes
      }
      this.$emit('emitLogItem',logItem)
      this.resetTime();
    },
    resetTime():void {
      this.sec = 0
    },    
  },
  computed: {
    countTime():string {
        const hours = this.calcToHour
        const min = this.calcToMin
        const seconds = this.calcToSec
        return `${ hours }:${ min }:${ seconds }`
    },
    calcToHour() :string {
      return Math.floor(this.sec /3600).toString()
    },
    calcToMin() :string {
      return ("0" + Math.floor(this.sec % 3600 / 60).toString()).slice(-2)
    },
    calcToSec() :string {
      return ("0" + Math.floor(this.sec % 60).toString()).slice(-2)
    },
  },
})
</script>
<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  .time {
    font-size: 76px;
    margin-bottom: 20px;
  }
  .timer-buttons {
    display: flex;
    justify-content: space-between;
    width: 232px;
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background-color:#fff;
    }
    .disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
}

</style>
