<template>
  <div class="timer">
    <!-- <p class="time">00:00:00</p> -->
    <p class="time">{{ countTime }}</p>
    <div class="timer-buttons">
      <v-btn
        :class="{ disabled: isActive }"
        @click="resetTime"
        elevation="2"
        fab
        icon
        class="button"         
      >
        <v-icon>mdi-replay</v-icon>
      </v-btn>
      <!-- あとでv-ifの条件でisActiveによってボタンごと切り替える -->
      <v-btn
        v-if="!isActive"
        elevation="2"
        fab
        icon
        class="button"
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
        class="button"
        @click="playAndStop();toggleDisable();setDate()"         
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        elevation="2"
        fab
        icon
        class="button"         
        :class="{ disabled: isActive }"
        @click="addLog()"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { NULL } from 'node-sass'
export default {
  data: ()=> ({
    isActive: false,
    sec: 0,
    playInterval: false,
    finishHours: 0,
    finishMinutes: 0
  }), 
  methods: {
    changeIsActive() {
      this.isActive = ! this.isActive
    },
    count() {
      this.sec ++
    },
    playAndStop() {
      let timerId:any
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
    toggleDisable() {
      this.playInterval = true
      setTimeout(() => {
        this.playInterval = false
      }, 700);
    },
    setDate() {
      const date = new Date()
      this.finishHours = date.getHours()
      this.finishMinutes = date.getMinutes()
    },
    addLog() {
      const self = this
      const logItem = {
        time: self.sec,
        finishHours: self.finishHours,
        finishMinutes: self.finishMinutes
      }
      this.$emit('emitLogItem',logItem)
      this.sec = 0
    },
    resetTime() {
      this.sec = 0
    },    
  },
  computed: {
    countTime() {
        const hours :number = Math.floor(this.sec /3600)
        const min : string =
         ("0" + Math.floor(this.sec % 3600 / 60).toString()).slice(-2)
        const seconds :string =
         ("0" + Math.floor(this.sec % 60).toString()).slice(-2)
        return `${ hours }:${ min }:${ seconds }`
    },
  },
}
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
