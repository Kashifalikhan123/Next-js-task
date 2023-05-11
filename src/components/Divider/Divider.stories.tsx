import Divider, { DividerProps } from './Divider'

export default {
  title: 'Divider',
  component: Divider
}

export const Basic = (args: DividerProps) => <Divider {...args} />

Basic.args = {children: 'Divider', footer: 'VirtuPro x Just got real' }
