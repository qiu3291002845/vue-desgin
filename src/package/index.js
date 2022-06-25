import Former from './former'

const components = [Former]

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default install
