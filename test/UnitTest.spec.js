import {createLocalVue, shallowMount } from '@vue/test-utils'
import Timer from '~/components/TimerApp.vue'
import LogLists from '~/components/LogLists.vue'
import TotalLog from '~/components/TotalLog.vue'
import IndexPage from '~/pages/index.vue'
import Vuetify from 'vuetify'



  // Timer Button test
describe('TimerApp.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = shallowMount(Timer, {
    localVue,
    vuetify,
  })

  it('Play and Stop timer button test', async () => {
    // Play Test
    const playButton = wrapper.find('.play-button')
    await playButton.vm.$emit('click')
    expect(wrapper.vm.isActive).toBe(true)
    // Stop test and Interval
    const stopButton = wrapper.find('.stop-button')
    await stopButton.vm.$emit('click')
    expect(wrapper.vm.isActive).toBe(false)
    expect(wrapper.vm.playInterval).toBe(true)
  })

  it('Reset time button test', async () => {
    const resetButton = wrapper.find('.reset-button')
    await resetButton.vm.$emit('click')
    expect(wrapper.vm.sec).toBe(0)
  })
  it('Log time button test', async () => {
    const doneButton = wrapper.find('.done-button')
    await doneButton.vm.$emit('click')
    
    // 0 <= hours < 24
    expect(wrapper.vm.finishHours).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.finishHours).toBeLessThan(24)
    
    // 0 <= minutes < 60
    expect(wrapper.vm.finishMinutes).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.finishMinutes).toBeLessThan(60)

    // about emitted loItem
    expect(wrapper.vm.sec).toBe(0)
    expect(wrapper.emitted()).toEqual({'emitLogItem': [[{finishHours:expect.any(Number),finishMinutes:expect.any(Number),time:0}]]})
  })

  it('Output Time', async () => {
    await wrapper.setData({sec: 3800}) 
    expect((wrapper.vm).countTime).toBe('1:03:20')
  })

  it('Timer Count test',async () => {
    await wrapper.setData({sec: 0})
    wrapper.vm.count()
    expect(wrapper.vm.sec).toBe(1)
  })

})




  // Timer Lists Button test

describe('LogLists.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = shallowMount(LogLists, {
    localVue,
    vuetify,
    propsData: {
      timeLogLists: 
      [
        {finishHours:0,finishMinutes:0,time:0,title:""},
        {finishHours:0,finishMinutes:0,time:0,title:""},
        {finishHours:0,finishMinutes:0,time:0,title:""},
        {finishHours:0,finishMinutes:0,time:0,title:""},
      ]
    }
  })
 // delete Select Items Test
  it('Empty Array alert test', async () => {
    window.alert = jest.fn()
    wrapper.setData({selectedList:[]})
    const deleteButton = wrapper.find('.delete-button')
    await deleteButton.trigger('click')
    expect(window.alert).toHaveBeenCalledWith('Select Any Item !')
  })

  it('confirm passed deleting selected items test', async () => {
    wrapper.setData({selectedList:[0,1,3],isSelect:true})
    const deleteButton = wrapper.find('.delete-button')
    await deleteButton.trigger('click')
    // check emit data
    expect(wrapper.emitted()).toEqual({
      'deleteSelectedItem': [[[0,1,3]]]
    })

    // check result selectedList
    expect(wrapper.vm.selectedList).toEqual([])
    // check isSelect is reversed
    expect(wrapper.vm.isSelect).toBe(false)
  })

  it('toggle button test', async() => {
    const toggleSelectButton = wrapper.find('.toggle-select')
    await toggleSelectButton.trigger('click')
    expect(wrapper.vm.isSelect).toBe(true)
  })
  
  it('toggle hide button test', async() => {
    wrapper.setData({isSelect: true})
    const toggleSelectButton = wrapper.find('.toggle-select')
    await toggleSelectButton.trigger('click')
    expect(wrapper.vm.isSelect).toBe(false)
  })

  it('is checkbox test', async() => {
    await wrapper.setData({isSelect: true})
    const checkbox = wrapper.find('.delete-check-box')
    expect(checkbox.exists()).toBe(true)  
  })
  
  it('is not checkbox test', async() => {
    await wrapper.setData({isSelect: false})
    const checkbox = wrapper.find('.delete-check-box')
    expect(checkbox.exists()).toBe(false)  
  })
})





// Total Log Results

describe('TotalLog.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = shallowMount(TotalLog, {
    localVue,
    vuetify,
    propsData: {
      resultLists: 
      [
        {name:'a',time:1000},
        {name:'b',time:2000},
      ]
    }
  })

  it('Calc Time Ratio', async () => {
    // calcPercent(eachTime,totalTime)
    const timeRatio = wrapper.vm.calcPercent(10,100)
    expect(timeRatio).toBe(10)
  })

  it('Calc Result Bar Width', async () => {
    // barWidth(eachTime,totalTime)
    const barWidth = wrapper.vm.barWidth(10,100)
    expect(barWidth).toBe(75)
  })

  it('calc totalTime', async() => { 
    expect((wrapper.vm).totalTime).toBe(3000)
  })

  it('Icon Color test', async () => {
    const iconColor = wrapper.vm.iconColor(3)
    expect(iconColor).toEqual('#199C9B')
  })

})






// index.vue
describe('index.vue',() => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = shallowMount(IndexPage, {
    localVue,
    vuetify,
  })

  it('Push Log item test', async () => {
    await wrapper.setData({timeLogLists:[]})
    const logItem = 
    {
      time: 500,
      finishHours: 1,
      finishMinutes: 40,
      title: "Something1"
    }
    wrapper.vm.receiveLogItem(logItem)
    expect(wrapper.vm.timeLogLists).toEqual(
      [{
        time: 500,
        finishHours: 1,
        finishMinutes: 40,
        title: "newLog"        
      }]
    )
  })

  it('Delete Log item test', async () => {
    await wrapper.setData({
      timeLogLists:[
        {
          time: 100,
          finishHours: 1,
          finishMinutes: 40,
          title: "newLog1"        
        },
        {
          time: 200,
          finishHours: 1,
          finishMinutes: 40,
          title: "newLog2"        
        },
        {
          time: 300,
          finishHours: 1,
          finishMinutes: 40,
          title: "newLog3"        
        },
      ]
    })
    const deleteArrIndex = [0,2]
    wrapper.vm.deleteSelectedItem(deleteArrIndex)
    expect(wrapper.vm.timeLogLists).toEqual
    (
      [
        {
          time: 200,
          finishHours: 1,
          finishMinutes: 40,
          title: "newLog2"        
        }      ]
    )
  })

  it('Covert Lists to Results test', async () => {
    await wrapper.setData({
      timeLogLists:[
        {
          time: 500,
          finishHours: 1,
          finishMinutes: 40,
          title: "any1"        
        },
        {
          time: 500,
          finishHours: 1,
          finishMinutes: 40,
          title: "any1"        
        },
        {
          time: 500,
          finishHours: 1,
          finishMinutes: 40,
          title: "any2"        
        },
      ]
    })
    wrapper.vm.processLists()
    expect(wrapper.vm.resultLists).toEqual(
      [
        {
          name: "any1",          
          time: 1000
        },
        {
          name: "any2",          
          time: 500
        },
      ]
    )
  })

  it('Watch local storage test', async() => {
 
    const storedItem = 
      {
        time: 500,
        finishHours: 1,
        finishMinutes: 40,
        title: "Something1"
      }
    
    const diffStoredItem = 
    [
      {
        time: 50,
        finishHours: 12,
        finishMinutes: 44,
        title: "DifferentSomething1"
      }
    ]
    global.localStorage.setItem('timeLogList',JSON.stringify(storedItem))

    expect(global.localStorage.getItem('timeLogList')).not.toEqual(JSON.stringify(diffStoredItem))
    
    expect(global.localStorage.getItem('timeLogList')).toEqual(JSON.stringify(storedItem))
  })
})