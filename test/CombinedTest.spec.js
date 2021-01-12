import {createLocalVue, mount } from '@vue/test-utils'
import IndexPage from '~/pages/index.vue'
import Vuetify from 'vuetify'


  // Timer Button test

  describe('TimerApp.vue',() => {
    const localVue = createLocalVue()
    let vuetify
    beforeEach(() => {
      vuetify = new Vuetify()
    })
  
    const wrapper = mount(IndexPage, {
      localVue,
      vuetify,
    })
    
    it('Emit Log to resultLists button test', async () => {
      const doneButton = wrapper.find('.done-button')
      await doneButton.trigger('click')
        
      expect(wrapper.vm.resultLists).toEqual(
        [
          {name: 'Something2',time: 3600},
          {name: 'Something3',time: 3600},
          {name: 'Something1',time: 500},
          {name: 'newLog',time: expect.any(Number)},
        ]
      )
    })

    it('Emit Log to timeLogLists test', async () => {
      const doneButton = wrapper.find('.done-button')
      await doneButton.vm.$emit('click')     
      expect(wrapper.vm.timeLogLists).toEqual(
        [
          {
            finishHours: 1,
            finishMinutes: 40,
            time: 500,
            title: 'Something1'
          },
          {
            finishHours: 17,
            finishMinutes: 42,
            time: 3600,
            title: 'Something2'
          },
          {
            finishHours: 17,
            finishMinutes: 42,
            time: 3600,
            title: 'Something3'
          },
          {
            finishHours: expect.any(Number),
            finishMinutes: expect.any(Number),
            time: expect.any(Number),
            title: 'newLog'
          },
          {
            finishHours: expect.any(Number),
            finishMinutes: expect.any(Number),
            time: expect.any(Number),
            title: 'newLog'
          },
        ]
      )
    })
  })
  



// Delete  Button test

describe('LogList.vue', () => {
  const localVue = createLocalVue()
  let vuetify 

  const wrapper = mount(IndexPage, {
    localVue,
    vuetify,
  })

  it('Delete  One Selected Item', async() => {
    wrapper.setData({
      timeLogLists: 
        [
          {finishHours:0,finishMinutes:0,time:0,title:"1"},
          {finishHours:0,finishMinutes:0,time:0,title:"2"},
          {finishHours:0,finishMinutes:0,time:0,title:"3"},
          {finishHours:0,finishMinutes:0,time:0,title:"4"},
        ]
    })
    const selectedList = [2]
    wrapper.vm.deleteSelectedItem(selectedList)
    expect(wrapper.vm.timeLogLists).toEqual([
      {finishHours:0,finishMinutes:0,time:0,title:"1"},
      {finishHours:0,finishMinutes:0,time:0,title:"2"},
      {finishHours:0,finishMinutes:0,time:0,title:"4"},
    ])    
  })

  it('Delete  multi Selected Items', async() => {
    wrapper.setData({
      timeLogLists: 
        [
          {finishHours:0,finishMinutes:0,time:0,title:"1"},
          {finishHours:0,finishMinutes:0,time:0,title:"2"},
          {finishHours:0,finishMinutes:0,time:0,title:"3"},
          {finishHours:0,finishMinutes:0,time:0,title:"4"},
        ]
    })
    const selectedList = [0,2]
    wrapper.vm.deleteSelectedItem(selectedList)
    expect(wrapper.vm.timeLogLists).toEqual([
      {finishHours:0,finishMinutes:0,time:0,title:"2"},
      {finishHours:0,finishMinutes:0,time:0,title:"4"},
    ])    
  })

})