import {createLocalVue, mount } from '@vue/test-utils'
import Timer from '~/components/TimerApp.vue'
import LogLists from '~/components/LogLists.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
global.confirm = () => true

  // Timer Button test

describe('TimerApp.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = mount(Timer, {
    localVue,
    vuetify,
  })

  it('Play and Stop timer button test', async () => {
    // Play Test
    const playButton = wrapper.find('.play-button')
    await playButton.trigger('click')
    expect(wrapper.vm.isActive).toBe(true)

    // Stop test and Interval
    const stopButton = wrapper.find('.stop-button')
    await stopButton.trigger('click')
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.playInterval).toBe(true)
  })

  it('Reset time button test', async () => {
    const resetButton = wrapper.find('.reset-button')
    await resetButton.trigger('click')
    expect(wrapper.vm.sec).toBe(0)
  })
  it('Log time button test', async () => {
    const doneButton = wrapper.find('.done-button')
    await doneButton.trigger('click')
    
    // 0 <= hours < 24
    expect(wrapper.vm.finishHours).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.finishHours).toBeLessThan(24)
    
    // 0 <= minutes < 60
    expect(wrapper.vm.finishMinutes).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.finishMinutes).toBeLessThan(60)

    // about emitted loItem
    expect(wrapper.vm.sec).toBe(0)
    expect(wrapper.emitted()).toEqual({'emitLogItem':[[{time:expect.any(Number),finishHours:expect.any(Number),finishMinutes:expect.any(Number),}]]})
  })
})


  // Timer Lists Button test

describe('LogLists.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = mount(LogLists, {
    localVue,
    vuetify,
    propsData: {
      timeLogLists: 
      [
        {finishHours:0,finishMinutes:0,time:0,title:""},
        {finishHours:0,finishMinutes:0,time:0,title:""},
      ]
    }
  })

  it('Delete All button test', async () => {
    const deleteAllButton = wrapper.find('.delete-all-button')
    await deleteAllButton.trigger('click')
    expect(wrapper.emitted()).toEqual({'deleteAll': [[]]});
  })

  it('Delete Selected Element button test', async () => {
    const deleteButton = wrapper.find('.delete-button')
    await deleteButton.trigger('click')
    expect(wrapper.emitted()).toEqual({'deleteAll': [[]],'deleteItem': [[0]]});
  })
})

