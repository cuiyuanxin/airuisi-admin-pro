type IconComponent = typeof import('@vicons/ionicons5') &
  typeof import('@vicons/antd') &
  typeof import('@vicons/fluent')

const icons = <IconComponent>{}

import('@vicons/ionicons5').then((module) => {
  Object.assign(icons, module)
})
import('@vicons/antd').then((module) => {
  Object.assign(icons, module)
})
import('@vicons/fluent').then((module) => {
  Object.assign(icons, module)
})

export default icons
